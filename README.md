# HEC+ME Supplement Finder

An AI-powered supplement recommendation tool built with TanStack Start and Claude. HEC+ME (Health, Exercise & Conditioning + personalized ME) helps users discover the right supplements for their specific health and fitness goals through an intelligent conversational interface.

## What it does

- Provides evidence-based supplement recommendations tailored to goals like muscle building, energy, sleep, weight management, immunity, stress, cognitive performance, and joint health
- Streams responses in real-time using Claude via the Netlify AI Gateway
- Offers quick-start goal chips for instant, pre-prompted conversations
- Covers dosing protocols, timing, stacking synergies, and safety considerations

## Key Technologies

- **TanStack Start** — Full-stack React meta-framework with file-based routing
- **@tanstack/ai** — Streaming AI chat with server-sent events
- **@tanstack/ai-anthropic** — Anthropic (Claude) adapter
- **Netlify AI Gateway** — Zero-config AI inference, no API keys required
- **Tailwind CSS v4** — Utility-first styling via Vite plugin
- **streamdown** — Markdown streaming renderer

## Running Locally

```bash
npm install
netlify dev
```

Requires a Netlify account with AI Gateway enabled (Free tier and above). The `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` are injected automatically by Netlify — no `.env` setup needed locally when using `netlify dev`.
