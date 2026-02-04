import re

def extract_video_id(url: str) -> str:
    """Extracts the video ID from various YouTube URL formats."""
    reg = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(reg, url)
    return match.group(1) if match else None