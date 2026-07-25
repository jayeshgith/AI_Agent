from fastapi import APIRouter, HTTPException

from app.models.user import LoginResponse, UserLoginRequest, UserRegisterRequest, UserResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
async def register_user(payload: UserRegisterRequest):
    """Register a new user and store the hashed profile in MongoDB."""
    try:
        return AuthService.register_user(payload)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))


@router.post("/login", response_model=LoginResponse)
async def login_user(payload: UserLoginRequest):
    """Verify user credentials and return an access token."""
    try:
        return AuthService.login_user(payload)
    except ValueError as error:
        raise HTTPException(status_code=401, detail=str(error))
    except RuntimeError as error:
        raise HTTPException(status_code=503, detail=str(error))
