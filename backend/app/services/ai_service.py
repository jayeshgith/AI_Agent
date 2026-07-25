import json

from groq import Groq

from app.config.settings import settings
from app.models.recommendation import RecommendationRequest, RecommendationResponse

MODEL_NAME = "llama-3.3-70b-versatile"


def _build_recommendation_prompt(payload: RecommendationRequest):
    """Build the user prompt from validated request data."""
    skills = ", ".join(payload.skills) if payload.skills else "No skills provided"

    return f"""
Create an ordered learning path for this learner.

Learner:
- Name: {payload.name or "Not provided"}
- Background: {payload.background or "Not provided"}
- Current skills: {skills}
- Goal: {payload.goal or "Not provided"}

Return JSON only in this exact shape:
{{
  "courses": [
    {{
      "name": "Course name",
      "reason": "Why this course belongs in the path",
      "difficulty": "Beginner | Intermediate | Advanced",
      "duration": "Estimated duration"
    }}
  ]
}}

Rules:
- Order courses from first to last.
- Include a reason for every course.
- Include difficulty and estimated duration for every course.
- Do not include markdown, explanations, or text outside the JSON object.
""".strip()


def generate_recommendations(payload: RecommendationRequest):
    """Call Groq and return a validated JSON recommendation response."""
    if not settings.GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY is missing from the .env file")

    client = Groq(api_key=settings.GROQ_API_KEY)

    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "You are a course recommendation API. Return JSON only.",
            },
            {
                "role": "user",
                "content": _build_recommendation_prompt(payload),
            },
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    content = completion.choices[0].message.content or "{}"
    parsed_response = json.loads(content)

    # Validate the AI output before returning it from the API route.
    return RecommendationResponse.model_validate(parsed_response).model_dump()
