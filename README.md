# Software & AI Assurance — ValueMomentum

React (Vite) front end with an Express back end, built from the *Software & AI Assurance website content draft*.

## Run it

```bash
npm install
npm run dev        # web on http://localhost:5173, API on http://localhost:8787 (proxied at /api)
```

Production:

```bash
npm run build
npm start          # Express serves dist/ and the API on http://localhost:8787
```

## Routes

| Path | Page |
| --- | --- |
| `/capabilities/software-and-ai-assurance/` | Main page (sections 1–7 of the draft) |
| `/capabilities/software-and-ai-assurance/platform-assurance` | Offering 01 sub-page |
| `/capabilities/software-and-ai-assurance/assurance-coe` | Offering 02 sub-page |
| `/capabilities/software-and-ai-assurance/ai-agentic-systems-assurance` | Offering 03 sub-page |

## Two design versions

A **Version A / Version B** switch in the top nav keeps the visitor on the same page.

- **Version A** (`/capabilities/software-and-ai-assurance/…`): dark, motion-led (canvas hero, AI lab).
- **Version B** (`/v2/capabilities/software-and-ai-assurance/…`): "The Assurance Atlas". It's built on the
  fire-insurance-map tradition: an interactive estate plan with a survey route, offerings as colour bands,
  documentary photography, tables for data and an inline contact form. It's made with
  [Impeccable](https://github.com/pbakaus/impeccable)'s guidance. Its detector finds 2 advisory items across all
  Version B pages, against 34 on Version A's main page.
  Code lives in `src/v2/`, images in `public/v2/` (FEMA, NOAA and Sanborn/Library of Congress: public domain;
  NERSC photo: CC0). Credits are listed in the Version B footer.

## API

- `GET /api/health` — health check
- `POST /api/contact` — `{ name, email, company, interest, message }`; validated, rate limited (5 per 10 min per IP), honeypot-protected, saved to `server/data/leads.json`

## Where things live

- **All copy:** `src/data/content.js` (edit text here; components read from it)
- **Hero "assurance field":** `src/components/HeroCanvas.jsx`
- **Interactive AI assurance demo:** `src/components/AILab.jsx`
- **Per-offering diagrams:** `src/components/Feature.jsx`
- **Styles / brand tokens:** `src/styles.css`

## Before publishing

- Proof-point numbers come from the deck and are marked "validate before publishing" in the draft.
- Partner names are shown as text tiles; swap in approved logo files once Marketing confirms usage.
- The intro video slot is a placeholder until leadership approves the video.
- Console and AI-lab figures are illustrative demo values, labeled as such on the page.
