from fastapi import APIRouter, HTTPException
from starlette.concurrency import run_in_threadpool

from app.models.recommendation import RecommendationRequest, RecommendationResponse
from app.services.ai_service import generate_recommendations

router = APIRouter()


@router.post("/recommend", response_model=RecommendationResponse)
async def recommend(payload: RecommendationRequest):
    """Generate a learning path while keeping AI logic inside the service layer."""
    try:
        return await run_in_threadpool(generate_recommendations, payload)
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))
    except (ValueError, TypeError) as error:
        raise HTTPException(status_code=502, detail=f"Invalid AI response: {error}")
    except Exception as error:
        raise HTTPException(status_code=502, detail=f"AI request failed: {error}")
