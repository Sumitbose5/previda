<p align="center">
	<img src="https://res.cloudinary.com/dgxc8nspo/image/upload/v1770216727/previda-removebg-preview_yfwmry.png" alt="Previda Logo" width="180" />
</p>

# Previda — AI-Powered Content Intelligence

> Turn YouTube comments into data-driven video ideas, hooks, and audience insights.

Previda is a privacy-first toolkit for content creators. It scrapes and analyzes YouTube comment sections to surface viewer pain points, recurring themes, and ready-to-use video blueprints using LLMs (Groq / OpenAI).

## Table of contents
- Features
- Tech stack
- Quickstart (backend + client)
- Configuration / env
- Usage
- Contributing

## Features
- Comment mining: fetch and clean YouTube comments at scale
- Audience themes & viewer friction categorization
- Blueprint generator: titles, concepts, and opening hooks
- BYOK (bring your own key): users provide LLM API keys client-side for privacy

## Tech stack
- Frontend: React + TypeScript, Vite, Tailwind CSS, Clerk for auth
- Backend: FastAPI, Uvicorn, YouTube Data API v3, OpenAI / Groq SDKs

## Quickstart
Minimal steps to run the project locally (Windows / PowerShell shown).

Prerequisites
- Node.js (16+) and npm
- Python 3.10+

Backend (API)
1. Create and activate a virtual environment (PowerShell):

```powershell
python -m venv .\backend\venv
.\backend\venv\Scripts\Activate.ps1
```

2. Install Python dependencies:

```powershell
pip install -r backend/requirements.txt
```

3. Add environment variables (create `backend/.env`):

```
YOUTUBE_API_KEY=your_youtube_api_key_here
CLERK_JWKS_URL=https://your-clerk-instance.clerk.accounts.dev/.well-known/jwks.json
```

4. Run the API (from repository root):

```powershell
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Frontend (client)
1. Install dependencies and run dev server:

```powershell
cd client
npm install
npm run dev -- --host
```

2. Open the app in your browser: http://localhost:5173

API base: http://localhost:8000

## Configuration / environment
- Backend uses `backend/.env` for secrets (YouTube API key, Clerk JWKS URL). Keep keys private.
- The frontend is configured to use BYOK for LLM requests — users supply their API keys in the UI.

## Usage
- Start backend and frontend as above.
- Sign in (if auth is configured) and paste a YouTube video URL or channel feed to analyze.

## Contributing
- Improvements, bug fixes, and UI polish welcome. Open a pull request describing the change.

## License & contact
This repository is open for development; add a license file if you wish to publish. For questions, open an issue or reach out via the project maintainer.

----
Small, clear README focused on onboarding. If you want, I can add a quick troubleshooting section, example .env.template, or badges (CI / license).