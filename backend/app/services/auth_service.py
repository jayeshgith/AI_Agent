from datetime import datetime, timezone

from app.database.mongodb import mongo
from app.models.user import LoginResponse, UserLoginRequest, UserPublic, UserRegisterRequest
from app.utils.jwt_handler import create_access_token
from app.utils.password import hash_password, verify_password


class AuthService:
    """Handles user registration and persistence logic."""

    @staticmethod
    def register_user(payload: UserRegisterRequest) -> dict:
        """Validate the input, hash the password, and store the user."""
        if mongo.database is None:
            raise RuntimeError("MongoDB is not available")

        existing_user = mongo.database.users.find_one({"email": str(payload.email).lower()})
        if existing_user is not None:
            raise ValueError("Email is already registered")

        if len(payload.password) < 8:
            raise ValueError("Password must be at least 8 characters")

        user_document = {
            "name": payload.name,
            "email": str(payload.email).lower(),
            "password": hash_password(payload.password),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

        mongo.database.users.insert_one(user_document)
        return {"message": "User registered successfully"}

    @staticmethod
    def login_user(payload: UserLoginRequest) -> LoginResponse:
        """Validate credentials and return a signed JWT plus the user profile."""
        if mongo.database is None:
            raise RuntimeError("MongoDB is not available")

        user = mongo.database.users.find_one({"email": str(payload.email).lower()})
        if user is None:
            raise ValueError("Invalid email or password")

        if not verify_password(payload.password, user.get("password", "")):
            raise ValueError("Invalid email or password")

        token = create_access_token({"user_id": str(user["_id"]), "email": user["email"]})
        return LoginResponse(
            access_token=token,
            user=UserPublic(
                id=str(user["_id"]),
                name=user.get("name", ""),
                email=user.get("email", ""),
            ),
        )
