from fastapi import APIRouter

from app.database.mongodb import get_database_status

router = APIRouter()


@router.get("/db-status")
async def db_status():
    """Return the current MongoDB connection state for quick diagnostics."""
    return {"database": get_database_status()}
