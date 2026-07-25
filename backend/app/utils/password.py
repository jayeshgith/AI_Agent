import bcrypt


def hash_password(password: str) -> str:
    """Hash a plain-text password using bcrypt."""
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    """Check whether a plain-text password matches the stored hash."""
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))
