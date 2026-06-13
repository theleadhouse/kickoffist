# kickoffIST.com — Deployment Guide

## What's in this package

```
kickoffist/
  site/
    index.html          ← The full website (deploy to Cloudflare Pages)
  worker/
    worker.js           ← Cloudflare Worker (live scores proxy + fan wall KV)
    wrangler.toml       ← Worker config
  appscript/
    Code.gs             ← Google Apps Script (AI stories + fan wall backend)
```

---

## Step 1 — Cloudflare Pages (the site)

1. Go to dash.cloudflare.com → Pages → Create Project
2. Upload the `site/` folder (or connect GitHub repo)
3. Project name: `kickoffist`
4. Build settings: none needed (static HTML)
5. Custom domain: add `kickoffist.com` once domain is registered

---

## Step 2 — Cloudflare Worker (live scores API)

1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Create KV namespace:
   ```
   wrangler kv:namespace create "FANWALL_KV"
   ```
   Copy the ID into `wrangler.toml`

4. Deploy:
   ```
   cd worker/
   wrangler deploy
   ```

5. The Worker will be at:
   `kickoffist-api.YOUR_SUBDOMAIN.workers.dev`

6. Update `WORKER_URL` in `site/index.html` with your Worker URL

---

## Step 3 — Google Apps Script (AI stories)

1. Go to script.google.com → New Project
2. Paste contents of `appscript/Code.gs`
3. Create a Google Sheet, copy its ID from the URL
4. Update in Code.gs:
   - `SHEET_ID` = your Google Sheet ID
   - `CLAUDE_API_KEY` = your Anthropic API key (console.anthropic.com)
5. Run `setupSheets()` once to create headers
6. Deploy as Web App:
   - Execute as: Me
   - Who has access: Anyone
   - Copy the Web App URL
7. Add trigger:
   - Triggers → Add → `generateMatchStories` → Every hour
8. Update `index.html` with your App Script URL for fetching stories

---

## Step 4 — PDF Schedule

Generate the PDF using:
- Go to kickoffist.com/schedule
- Print → Save as PDF
- Or use a Cloudflare Worker with Puppeteer (Workers Browser Rendering)

---

## API Keys Summary

| Key | Where | Used For |
|-----|-------|----------|
| `0db60d4a97d24573ae965ed4b45f6bd1` | `worker.js` | Live scores from football-data.org |
| Your Anthropic key | `Code.gs` | AI match stories |
| YouTube Data API key (optional) | `index.html` | Video section |

---

## Costs

| Service | Cost |
|---------|------|
| kickoffist.com domain | ~$9/year (Cloudflare Registrar) |
| Cloudflare Pages | FREE |
| Cloudflare Worker | FREE (100k req/day) |
| Cloudflare KV | FREE (1M reads/day) |
| football-data.org API | FREE tier (10 req/min) |
| Google Apps Script | FREE |
| Claude API (stories) | ~$2-5 total for full tournament |
| **Total** | **~$11 for the whole World Cup** |

---

## Football-data.org Free Tier Limits

- 10 requests per minute
- The Worker handles caching so real users don't hit this limit
- Live scores: cached 60 seconds
- Today's schedule: cached 5 minutes
- Full schedule: cached 1 hour

---

## Go live checklist

- [ ] Register kickoffist.com on Cloudflare
- [ ] Deploy site/index.html to Cloudflare Pages
- [ ] Deploy worker/worker.js to Cloudflare Workers
- [ ] Create KV namespace and update wrangler.toml
- [ ] Set up Google Sheet + Apps Script
- [ ] Add Anthropic API key to Apps Script
- [ ] Update WORKER_URL in index.html
- [ ] Test live scores by hitting /api/today
- [ ] Set Apps Script trigger (hourly)
- [ ] Share on WhatsApp groups and social 🚀
