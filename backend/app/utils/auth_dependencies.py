from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database.mongodb import mongo
from app.utils.jwt_handler import verify_access_token

security_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security_scheme),
):
    """Extract the authenticated user from the Authorization Bearer token."""
    if credentials is None or not credentials.scheme.lower() == "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")

    try:
        payload = verify_access_token(credentials.credentials)
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token") from error

    user_id = payload.get("sub", {}).get("user_id")
    email = payload.get("sub", {}).get("email")

    if not user_id or not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

    if mongo.database is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="MongoDB is not available")

    user = mongo.database.users.find_one({"_id": user_id})
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return {
        "id": str(user["_id"]),
        "name": user.get("name", ""),
        "email": user.get("email", ""),
    }
