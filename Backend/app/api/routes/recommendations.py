from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from app.db.database import get_db
from app.core.security import get_current_user
from app.db import models
from app.services.recommendation_service import RecommendationService

router = APIRouter()

class RecommendationRequest(BaseModel):
    activity_type: str
    preferences: dict = {}
    constraints: dict = {}

class RecommendationResponse(BaseModel):
    location: str
    date: str
    score: float
    reasons: List[str]

@router.post("/recommendations", response_model=List[RecommendationResponse])
async def get_recommendations(
    request: RecommendationRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get AI-powered recommendations for activities based on preferences and constraints.
    Returns ranked location/date recommendations with scores.
    """
    try:
        recommendation_service = RecommendationService()
        results = await recommendation_service.get_recommendations(
            activity_type=request.activity_type,
            preferences=request.preferences,
            constraints=request.constraints,
            user_id=current_user.id
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
