import sys
import os

# Add the parent directory to the Python path so we can import from app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

# Vercel expects the ASGI app to be available as 'app'
# This is the entry point for Vercel serverless functions