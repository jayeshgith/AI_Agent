from datetime import datetime, timezone

from app.database.mongodb import mongo
from app.models.user import UserRegisterRequest
from app.utils.password import hash_password


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
