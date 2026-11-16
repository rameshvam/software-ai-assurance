import express from 'express';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const DIST = path.join(ROOT, 'dist');
const PORT = process.env.PORT || 8787;

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

// Basic security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// Tiny in-memory rate limiter: 5 submissions / 10 min per IP
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const OFFERINGS = ['Platform Assurance', 'Assurance CoE', 'P&C AI & Agentic Systems Assurance', 'Not sure yet'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => String(v ?? '').trim().slice(0, max);

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'software-ai-assurance', time: new Date().toISOString() }));

app.post('/api/contact', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'Too many requests. Please try again in a few minutes.' });

  const body = req.body || {};
  // Honeypot field: bots fill it, humans never see it
  if (body.website) return res.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    company: clean(body.company, 160),
    interest: clean(body.interest, 80),
    message: clean(body.message, 2000),
  };

  const errors = {};
  if (lead.name.length < 2) errors.name = 'Please tell us your name.';
  if (!EMAIL_RE.test(lead.email)) errors.email = 'Please use a valid work email.';
  if (lead.company.length < 2) errors.company = 'Please add your company.';
  if (!OFFERINGS.includes(lead.interest)) errors.interest = 'Please choose an area of interest.';
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let leads = [];
    try { leads = JSON.parse(await fs.readFile(LEADS_FILE, 'utf8')); } catch { /* first lead */ }
    const record = { id: `lead_${Date.now().toString(36)}`, receivedAt: new Date().toISOString(), ...lead };
    leads.push(record);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log(`[contact] new lead ${record.id} (${lead.interest})`);
    res.json({ ok: true, id: record.id });
  } catch (err) {
    console.error('[contact] failed to save lead', err);
    res.status(500).json({ ok: false, error: 'Something went wrong on our side. Please try again.' });
  }
});

app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// Serve the built React app in production
if (existsSync(DIST)) {
  app.use(express.static(DIST, { maxAge: '1h', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}${existsSync(DIST) ? ' (serving dist/)' : ''}`);
});
