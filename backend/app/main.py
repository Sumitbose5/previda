from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware # Import CORS
from app.scraper import get_youtube_comments
from app.analyzer import analyze_with_ai
from app.models import AnalysisRequest
import json
import os
import requests
from dotenv import load_dotenv

# Load Environment Variables
load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
# Replace this with your actual Clerk JWKS URL from your Clerk Dashboard
CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL", "https://your-clerk-instance.clerk.accounts.dev/.well-known/jwks.json")

app = FastAPI(title="Previda API")

# --- 1. CORS Configuration ---
# This allows your React frontend to communicate with this backend
origins = [
    "http://localhost:5173",  # Vite default for local development
    "http://localhost:3000",  # Alternative local development port
    "https://previda-chi.vercel.app",  # Replace with your actual production domain
    "https://*.vercel.app",  # Allow all Vercel preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all HTTP methods (POST, GET, etc.)
    allow_headers=["*"], # Allow all headers (Authorization, Content-Type, etc.)
)

# --- 2. Security Dependency ---
def verify_user(authorization: str = Header(None)):
    """
    Verifies the Clerk JWT token. In a 7-day sprint, we ensure the header 
    exists. For production, integrate 'python-jose' to validate the signature.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, 
            detail="Unauthorized: Missing or invalid token"
        )
    
    # Optional: Logic to ping Clerk or verify signature using CLERK_JWKS_URL
    # For now, we trust the presence of the token for the MVP logic
    return True

# --- 3. Endpoints ---

@app.post("/generate-ideas")
async def generate_ideas(
    request: AnalysisRequest, 
    authorized: bool = Depends(verify_user) # FastAPI handles the check here
):
    # Fetch comments using your server-side YouTube API Key
    comments = get_youtube_comments(request.url, YOUTUBE_API_KEY)
    
    if not comments or "error" in comments:
        raise HTTPException(status_code=400, detail="Could not fetch YouTube comments.")

    # 2. Analyze (Using user's provided Groq/OpenAI key from the request)
    try:
        raw_analysis = analyze_with_ai(comments, request.api_key, request.provider)
        return json.loads(raw_analysis)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Analysis failed: {str(e)}")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to PREVIDA - AI Content Intelligence"
    }

if __name__ == "__main__":
    import uvicorn
    # Using reload=True is great for Day 2-6 development
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)