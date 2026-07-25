from bson import ObjectId

from app.services.recommendation_service import serialize_recommendation


def test_serialize_recommendation_converts_objectid_to_string():
    recommendation_id = ObjectId()
    document = {
        "_id": recommendation_id,
        "name": "Asha",
        "background": "student",
        "skills": ["python"],
        "goal": "build apps",
        "courses": [{"name": "Python Basics", "reason": "good start", "difficulty": "Beginner", "duration": "2 weeks"}],
        "created_at": "2026-01-01T00:00:00+00:00",
    }

    result = serialize_recommendation(document)

    assert result["id"] == str(recommendation_id)
    assert result["name"] == "Asha"
    assert result["courses"][0]["name"] == "Python Basics"
