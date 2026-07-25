from datetime import datetime, timezone

from pydantic import BaseModel, EmailStr, Field


class UserRegisterRequest(BaseModel):
    """Input model for the registration endpoint."""

    name: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=8)


class UserResponse(BaseModel):
    """Response model returned after a successful registration."""

    message: str


class UserLoginRequest(BaseModel):
    """Input model for the login endpoint."""

    email: EmailStr
    password: str


class UserPublic(BaseModel):
    """Safe user details returned to the client after login."""

    id: str
    name: str
    email: str


class LoginResponse(BaseModel):
    """JWT response returned after a successful login."""

    access_token: str
    token_type: str = "bearer"
    user: UserPublic


class UserRecord(BaseModel):
    """Stored user model for MongoDB persistence."""

    name: str
    email: str
    password: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
