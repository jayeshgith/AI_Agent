import os
from pathlib import Path

from dotenv import load_dotenv

# settings.py loads backend/.env once so every module reads the same config source.
ENV_PATH = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(ENV_PATH)


def _split_origins(value):
  return [origin.strip() for origin in value.split(",") if origin.strip()]


class Settings:
  """Small settings object for environment-driven application values."""

  APP_NAME = os.getenv("APP_NAME", "AI-Agent API")
  ALLOWED_ORIGINS = _split_origins(
    os.getenv("ALLOWED_ORIGINS", "http://localhost:5173"),
  )
  MONGODB_URI = os.getenv("MONGODB_URI", "")
  DATABASE_NAME = os.getenv("DATABASE_NAME", "")
  GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")


settings = Settings()
