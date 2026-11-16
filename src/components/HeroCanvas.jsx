import { useEffect, useRef } from 'react';

/**
 * "Assurance field": a living dot grid. Amber defects appear across the field,
 * a scan beam sweeps through, and every defect it touches is caught, pulses and turns green.
 * The cursor lights up the grid around it. Pauses offscreen; static under reduced motion.
 */
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GAP = 26;
    let w = 0, h = 0, dots = [], pulses = [], raf = 0, running = true, last = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const start = performance.now();
    let caught = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const ox = (w % GAP) / 2 + GAP / 2, oy = (h % GAP) / 2 + GAP / 2;
      for (let y = oy; y < h; y += GAP) for (let x = ox; x < w; x += GAP) dots.push({ x, y, s: 0, at: 0 });
      if (reduce) draw(0);
    }

    function spawn(scanX, t) {
      const live = dots.reduce((n, d) => n + (d.s === 1 ? 1 : 0), 0);
      const target = Math.max(6, Math.round(dots.length / 140));
      if (live >= target || Math.random() > 0.08) return;
      for (let tries = 0; tries < 12; tries++) {
        const d = dots[(Math.random() * dots.length) | 0];
        const ahead = d.x > scanX + 120 || scanX > w + 100;
        if (d.s === 0 && ahead) { d.s = 1; d.at = t; return; }
      }
    }

    function draw(now) {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      const period = 9; // seconds per sweep
      const phase = (t % period) / period;
      const scanX = -160 + phase * (w + 320);

      // scan beam
      if (!reduce) {
        const g = ctx.createLinearGradient(scanX - 220, 0, scanX + 6, 0);
        g.addColorStop(0, 'rgba(8,106,252,0)');
        g.addColorStop(0.85, 'rgba(8,106,252,0.10)');
        g.addColorStop(1, 'rgba(108,167,254,0.28)');
        ctx.fillStyle = g;
        ctx.fillRect(scanX - 220, 0, 226, h);
        ctx.fillStyle = 'rgba(160,200,255,0.55)';
        ctx.fillRect(scanX, 0, 1.2, h);
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        const wave = Math.sin(d.x * 0.011 + t * 1.1) * Math.cos(d.y * 0.015 - t * 0.8);
        let a = 0.13 + 0.07 * wave;
        let r = 1.05;
        let ox = 0, oy = 0;
        if (md < 170) {
          const k = 1 - md / 170;
          a += 0.55 * k * k;
          r += 1.3 * k;
          ox = (dx / (md || 1)) * k * 6; oy = (dy / (md || 1)) * k * 6;
        }
        const sd = scanX - d.x;
        if (sd > 0 && sd < 90) a += 0.4 * (1 - sd / 90);

        if (d.s === 1) {
          if (sd > 0 && sd < 40 && !reduce) {
            d.s = 2; d.at = t; caught++;
            pulses.push({ x: d.x, y: d.y, t });
          } else {
            const p = 0.5 + 0.5 * Math.sin(t * 5 + i);
            ctx.fillStyle = `rgba(254,188,16,${0.18 + 0.15 * p})`;
            ctx.beginPath(); ctx.arc(d.x, d.y, 7 + 2 * p, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#febc10';
            ctx.beginPath(); ctx.arc(d.x, d.y, 2.6, 0, Math.PI * 2); ctx.fill();
            continue;
          }
        }
        if (d.s === 2) {
          const age = t - d.at;
          if (age > 3.2) { d.s = 0; }
          else {
            const k = 1 - age / 3.2;
            ctx.fillStyle = `rgba(94,186,70,${0.2 * k})`;
            ctx.beginPath(); ctx.arc(d.x, d.y, 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `rgba(154,207,132,${0.5 + 0.5 * k})`;
            ctx.beginPath(); ctx.arc(d.x, d.y, 2.6, 0, Math.PI * 2); ctx.fill();
            continue;
          }
        }
        ctx.fillStyle = `rgba(140,180,255,${Math.min(a, 0.95)})`;
        ctx.beginPath(); ctx.arc(d.x + ox, d.y + oy, r, 0, Math.PI * 2); ctx.fill();
      }

      // pulses + check ticks
      pulses = pulses.filter((p) => t - p.t < 1.3);
      for (const p of pulses) {
        const k = (t - p.t) / 1.3;
        ctx.strokeStyle = `rgba(94,186,70,${0.9 * (1 - k)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, 6 + k * 42, 0, Math.PI * 2); ctx.stroke();
        if (k < 0.7) {
          ctx.strokeStyle = `rgba(200,240,190,${1 - k / 0.7})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x - 5, p.y - 12); ctx.lineTo(p.x - 1.5, p.y - 8.5); ctx.lineTo(p.x + 5, p.y - 16);
          ctx.stroke();
        }
      }

      if (!reduce) spawn(scanX, t);
    }

    function loop(now) {
      if (!running) return;
      if (now - last > 14) { draw(now); last = now; }
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
      if (mouse.x < -1000) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };

    resize();
    // Seed a few defects so the first frame already tells the story
    if (!reduce) for (let i = 0; i < 10; i++) { const d = dots[(Math.random() * dots.length) | 0]; if (d && d.x > w * 0.25) d.s = 1; }
    else for (let i = 0; i < 8; i++) { const d = dots[(Math.random() * dots.length) | 0]; if (d) d.s = 2, d.at = 0; }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting && !reduce;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
}
