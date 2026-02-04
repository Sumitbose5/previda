from googleapiclient.discovery import build
from app.utils import extract_video_id

def get_youtube_comments(video_url: str, api_key: str):
    video_id = extract_video_id(video_url)
    if not video_id:
        return {"error": "Invalid YouTube URL"}

    youtube = build("youtube", "v3", developerKey=api_key)

    # Fetch top-level comments
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=100,  # Start with 100 for the MVP
        textFormat="plainText"
    )
    response = request.execute()

    comments = []
    for item in response.get("items", []):
        # We use textOriginal to avoid HTML junk
        text = item["snippet"]["topLevelComment"]["snippet"]["textOriginal"]
        comments.append(text)

    return comments