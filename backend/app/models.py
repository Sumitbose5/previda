from pydantic import BaseModel
from typing import List

class AnalysisRequest(BaseModel):
    url: str
    api_key: str
    provider: str = "groq" # Defaults to Groq

class VideoIdea(BaseModel):
    title: str
    hook: str

class AnalysisResponse(BaseModel):
    themes: List[str]
    pain_points: List[str]
    video_ideas: List[VideoIdea]

class AnalysisResult(BaseModel):
    success: bool
    data: AnalysisResponse