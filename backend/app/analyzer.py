from openai import OpenAI
from app.models import AnalysisResult

def analyze_with_ai(comments: list, user_key: str, provider: str = "groq"):
    """
    Analyzes comments using either Groq or OpenAI.
    provider: 'groq' or 'openai'
    """
    
    # Configure the client based on provider
    if provider == "groq":
        client = OpenAI(
            base_url="https://api.groq.com/openai/v1",
            api_key=user_key
        )
        model = "llama-3.3-70b-versatile" # High-quality, fast, and free on Groq
    else:
        client = OpenAI(api_key=user_key)
        model = "gpt-4o-mini"

    # The Strategic Prompt
    prompt = f"""
    You are a Content Strategist. Analyze these YouTube comments to help a creator:
    {chr(10).join(comments[:50])} 

    Return a JSON object with:
    1. 'themes': Top 3 recurring topics.
    2. 'pain_points': What users are struggling with.
    3. 'video_ideas': 3 specific video titles with a 1-sentence hook.
    """

    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"} # Ensures valid JSON output
    )

    return response.choices[0].message.content