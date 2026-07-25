from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    """Request payload sent by the frontend for course recommendations."""

    name: str = ""
    background: str = ""
    skills: list[str] = Field(default_factory=list)
    goal: str = ""


class CourseRecommendation(BaseModel):
    """Single course item returned by the AI service."""

    name: str
    reason: str
    difficulty: str
    duration: str


class RecommendationResponse(BaseModel):
    """Final JSON response shape returned by POST /recommend."""

    courses: list[CourseRecommendation]
