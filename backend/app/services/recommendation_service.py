from datetime import datetime, timezone
from bson import ObjectId
from app.database.mongodb import mongo


def serialize_recommendation(document: dict) -> dict:
    """Convert a MongoDB document into a JSON-friendly payload with a string id."""
    document = dict(document)
    document["id"] = str(document.pop("_id"))
    return document


def save_recommendation(payload: dict) -> dict:
    """Persist a recommendation document and return the stored record."""
    if mongo.database is None:
        raise RuntimeError("MongoDB is not available")

    document = {
        "name": payload.get("name", ""),
        "background": payload.get("background", ""),
        "skills": payload.get("skills", []),
        "goal": payload.get("goal", ""),
        "courses": payload.get("courses", []),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    result = mongo.database.recommendations.insert_one(document)
    document["_id"] = result.inserted_id
    return serialize_recommendation(document)


def get_all_recommendations() -> list[dict]:
    """Return all saved recommendations, newest first."""
    if mongo.database is None:
        raise RuntimeError("MongoDB is not available")

    documents = list(
        mongo.database.recommendations.find().sort("created_at", -1)
    )
    return [serialize_recommendation(document) for document in documents]


def get_recommendation_by_id(recommendation_id: str) -> dict | None:
    """Return one recommendation by its MongoDB ObjectId."""
    if mongo.database is None:
        raise RuntimeError("MongoDB is not available")

    try:
        document = mongo.database.recommendations.find_one(
            {"_id": ObjectId(recommendation_id)}
        )
        if document is None:
            return None
        return serialize_recommendation(document)
    except Exception as error:
        print(f"Error retrieving recommendation by ID: {error}")
        return None


def delete_recommendation(recommendation_id: str) -> bool:
    """Delete a recommendation document by its MongoDB ObjectId and return success state."""
    if mongo.database is None:
        raise RuntimeError("MongoDB is not available")

    try:
        result = mongo.database.recommendations.delete_one(
            {"_id": ObjectId(recommendation_id)}
        )
        return result.deleted_count > 0
    except Exception as error:
        print(f"Error deleting recommendation: {error}")
        return False
