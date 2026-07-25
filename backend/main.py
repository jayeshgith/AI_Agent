from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.config.settings import settings

# main.py is the FastAPI entry point used by `uvicorn main:app --reload`.
app = FastAPI(
  title=settings.APP_NAME,
  version="0.1.0",
  description="Backend API scaffold for AI-Agent.",
)

# CORS is currently limited to the Vite dev server.
app.add_middleware(
  CORSMiddleware,
  allow_origins=settings.ALLOWED_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(health_router)
