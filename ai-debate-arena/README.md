# AI Debate Arena — Frontend

A modern, dark, glassmorphic React frontend for an AI debate application.
Two AI agents (FOR vs AGAINST) debate a topic across multiple rounds, and an
AI judge delivers a verdict. This repo is **frontend only** — it expects a
backend (Python / LangChain / Groq) exposing:

```
POST /debate
Request:  { "topic": "AI is good", "rounds": 2 }
Response: {
  "history": [
    { "round": 1, "pro": "...", "con": "..." }
  ],
  "verdict": "..."
}
```

## Tech stack

- React 19 + Vite
- Tailwind CSS (custom dark/glass design tokens)
- Axios
- Framer Motion
- Lucide React

## Getting started

```bash
npm install
cp .env.example .env
# edit .env and set VITE_API_BASE_URL to your backend's URL
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at the URL
set in `VITE_API_BASE_URL` (defaults to `http://localhost:8000`).

## Project structure

```
src/
  components/
    Hero.jsx          — landing hero with animated background
    TopicInput.jsx     — debate topic input
    RoundSelector.jsx  — rounds dropdown (1–5)
    DebateCard.jsx      — one round: FOR card vs AGAINST card
    JudgeCard.jsx       — golden verdict card
    Sidebar.jsx         — logo, about, GitHub, reset
    Loader.jsx           — "AI Agents are debating..." loader
    Navbar.jsx            — top bar / mobile menu trigger
    Footer.jsx             — credits & socials
  pages/
    Home.jsx                — page composition & state/API orchestration
  services/
    api.js                    — Axios client + startDebate()
  App.jsx
  main.jsx
```

## Notes

- No mock/fake data is used anywhere — all debate content comes from your
  live `/debate` API call via `src/services/api.js`.
- `JudgeCard` renders the backend's `verdict` string. Since the API only
  returns a single free-text `verdict` field, the card best-effort parses
  labeled sections (`Winner:`, `Score:`, `Summary:`, etc.) if your backend
  prompt produces them, and otherwise falls back to showing the full text
  under "Summary".
