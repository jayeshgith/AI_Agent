import os


def _split_origins(value):
  return [origin.strip() for origin in value.split(",") if origin.strip()]


class Settings:
  """Small settings object for values needed before database or AI setup exists."""

  APP_NAME = os.getenv("APP_NAME", "AI-Agent API")
  ALLOWED_ORIGINS = _split_origins(
    os.getenv("ALLOWED_ORIGINS", "http://localhost:5173"),
  )


settings = Settings()
