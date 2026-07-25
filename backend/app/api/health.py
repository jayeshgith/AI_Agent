from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check():
  """Return a simple status response for local uptime checks."""
  return {"status": "ok"}
