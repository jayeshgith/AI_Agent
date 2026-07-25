from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.db_status import router as db_status_router
from app.api.health import router as health_router
from app.api.recommendation import router as recommendation_router
from app.config.settings import settings
from app.database.connection import close_mongo_connection, connect_to_mongo


@asynccontextmanager
async def lifespan(app):
    # Try to connect during startup, but keep the API alive if Atlas is unavailable.
    connect_to_mongo()
    yield
    close_mongo_connection()


# main.py is the FastAPI entry point used by `uvicorn main:app --reload`.
app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="Backend API scaffold for AI-Agent.",
    lifespan=lifespan,
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
app.include_router(db_status_router)
app.include_router(recommendation_router)
