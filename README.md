# Ixiera Digital Agency & AI Orchestration Platform

An enterprise-grade digital agency platform featuring a complex multi-agent AI orchestration backend. The architecture strictly separates a Next.js client, authenticated via Clerk, from a high-performance FastAPI service powered by LangGraph.

## Architecture & Core Features

- **Authentication (Clerk):** Secure, modern user management, session handling, and authentication integration.
- **Backend API (FastAPI):** High-speed, asynchronous Python backend acting as the central nervous system for all client and AI operations.
- **AI Orchestration (LangGraph):** Advanced multi-agent state management. It routes queries between a generative sales agent (Gemini 2.5) and a lightweight background data extractor (Groq/Llama-3).
- **Vector Database (Supabase RAG):** AI responses are strictly grounded using Supabase pgvector and SentenceTransformers to provide accurate, business-specific context and prevent hallucinations.
- **Automated Lead Routing:** Background worker tasks asynchronously parse chat logs to extract qualified lead data (Name, WhatsApp) and dispatch alerts via Telegram API.

## Tech Stack

**Frontend**
- Next.js (App Router)
- Clerk (Authentication)
- Tailwind CSS
- shadcn/ui
- Package Manager: pnpm

**Backend & AI Engine**
- Python 3 & FastAPI
- LangGraph (Agent Orchestration)
- Supabase (PostgreSQL + pgvector)
- Google GenAI (Gemini 2.5 Flash)
- Groq API (Llama 3.1 8B)
- SentenceTransformers (all-MiniLM-L6-v2)

## Environment Variables Configuration

**Backend Variables (FastAPI / Hugging Face Spaces)**
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_google_ai_studio_key
GROQ_API_KEY=your_groq_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_API_URL=your_fastapi_backend_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Local Development Setup
1. Frontend Setup
Navigate to the frontend directory, configure your .env.local with Clerk and Supabase credentials, and install dependencies using pnpm:
pnpm install
pnpm dev

The client application will run on http://localhost:3000.
2. Backend Setup
Navigate to the backend directory, create an .env file, and install Python dependencies:
pip install -r requirements.txt
Run the FastAPI development server:
uvicorn app.main:app --reload
API documentation (Swagger UI) is automatically generated and accessible at http://127.0.0.1:8000/docs.
Deployment
Frontend: Optimized for Vercel deployment. Ensure Clerk keys are added to the Vercel project settings.
Backend: Designed to be deployed on Hugging Face Spaces or standard Docker containers. Maintain security by restricting CORS origins to the production frontend domain (ixiera.id).