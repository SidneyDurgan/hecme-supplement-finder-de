# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

HEC+ME Supplement Finder — an AI-powered supplement recommendation tool built with TanStack Start and deployed on Netlify. Uses Claude (via Netlify AI Gateway) to give evidence-based supplement recommendations through a streaming chat interface.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| AI | TanStack AI + Anthropic (Claude sonnet-4-6) via Netlify AI Gateway |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx       # HTML shell, Google Fonts (Cormorant Garamond + DM Sans), meta tags
    index.tsx        # Main UI: EmptyState, Messages, TypingDots, goal chips, chat form
    api.chat.ts      # Server POST /api/chat: Claude streaming via @tanstack/ai-anthropic
  lib/
    ai-hook.ts       # useAIChat() hook — wraps @tanstack/ai-react useChat
    weather-tools.ts # Unused (template artifact, safe to delete)
  styles.css         # All styles: CSS tokens, component classes, dark theme, animations
public/
  favicon.ico
README.md
AGENTS.md
netlify.toml
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`:

- `__root.tsx` — Root layout wrapping all pages
- `index.tsx` — Route for `/` (main supplement chat UI)
- `api.chat.ts` — Server POST endpoint at `/api/chat` (Claude streaming)

### AI Integration

The app uses Anthropic Claude (`claude-sonnet-4-6`) exclusively via Netlify AI Gateway. `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` are injected automatically by Netlify — no API key configuration needed.

The system prompt in `api.chat.ts` contains the full supplement advisor persona and knowledge base covering 8 categories: performance/muscle, energy/cognition, recovery/sleep, weight management, immunity, stress, joints, and general health.

### Styling Architecture

All styles are in `src/styles.css`. CSS custom properties (`:root` tokens) define the dark forest-green palette. Component classes use BEM-inspired naming (`.message-bubble--ai`, `.goal-chip`, etc.). Tailwind is imported only for base reset — actual component styles are hand-written with CSS variables.

### Adding/Modifying Goals

Edit the `GOALS` array in `src/routes/index.tsx`. Each item: `{ label, icon (lucide-react), prompt }`.

### Modifying Supplement Knowledge

Edit `SYSTEM_PROMPT` in `src/routes/api.chat.ts`.

## Configuration

| File | Purpose |
|------|---------|
| `vite.config.ts` | TanStack Start, Netlify, Tailwind, React plugins |
| `tsconfig.json` | `@/*` path alias for `src/*` |
| `netlify.toml` | Build command, output dir |

## Conventions

- Components: PascalCase
- CSS classes: BEM-ish (block__element--modifier)
- No Tailwind utility classes in component markup — use custom CSS classes only
- Import paths use `@/` alias
- TypeScript strict mode; `any` only where adapter types force it
