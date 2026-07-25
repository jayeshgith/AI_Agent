from fastapi import APIRouter, HTTPException

from app.models.recommendation import Recommendation
from app.services.recommendation_service import (
    delete_recommendation,
    get_all_recommendations,
    get_recommendation_by_id,
)

router = APIRouter()


@router.get("/history", response_model=list[Recommendation])
async def history():
    """Return previously stored recommendations ordered by newest first."""
    try:
        return get_all_recommendations()
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))


@router.get("/history/{recommendation_id}", response_model=Recommendation)
async def history_detail(recommendation_id: str):
    """Return one recommendation by its MongoDB ObjectId."""
    try:
        recommendation = get_recommendation_by_id(recommendation_id)
        if recommendation is None:
            raise HTTPException(status_code=404, detail="Recommendation not found")
        return recommendation
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))


@router.delete("/history/{recommendation_id}")
async def delete_history_item(recommendation_id: str):
    """Delete a recommendation from MongoDB by its ObjectId."""
    try:
        success = delete_recommendation(recommendation_id)
        if not success:
            raise HTTPException(status_code=404, detail="Recommendation not found or could not be deleted")
        return {"status": "success", "message": "Recommendation deleted successfully"}
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))
