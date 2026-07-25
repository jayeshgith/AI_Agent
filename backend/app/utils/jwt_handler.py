from datetime import datetime, timedelta, timezone
from typing import Any

import jwt

from app.config.settings import settings

SECRET_KEY = settings.SECRET_KEY or "dev-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24


def create_access_token(subject: dict[str, Any]) -> str:
    """Create a signed JWT access token with an expiry window."""
    expires_at = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {"sub": subject, "exp": expires_at}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_access_token(token: str) -> dict[str, Any]:
    """Decode and validate a JWT access token."""
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
