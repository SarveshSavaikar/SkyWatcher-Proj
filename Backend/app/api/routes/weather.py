from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import io
import base64
from datetime import datetime

from app.db.database import get_db
from app.core.security import get_current_user
from app.db import models
from app.schemas.weather import (
    WeatherProbabilityRequest,
    WeatherProbabilityResponse,
    WeatherHistoryRequest,
    WeatherHistoryResponse,
    HourlyProbability
)
from app.services.weather_service import WeatherService

router = APIRouter()

@router.post("/weather-probability", response_model=WeatherProbabilityResponse)
async def get_weather_probability(
    request: WeatherProbabilityRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Analyze weather probability for a given location and date range.
    Returns probability scores, summary text, and confidence level.
    """
    try:
        weather_service = WeatherService()
        result = await weather_service.analyze_weather_probability(
            location=request.location,
            start_date=request.start_date,
            end_date=request.end_date,
            conditions_checklist=request.conditions_checklist,
            activity_profile=request.activity_profile
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/weather-history", response_model=WeatherHistoryResponse)
async def get_weather_history(
    location: str,
    start_date: str,
    end_date: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get historical weather data for a location and date range.
    Returns historical patterns and averages.
    """
    try:
        weather_service = WeatherService()
        result = await weather_service.get_historical_weather(
            location=location,
            start_date=start_date,
            end_date=end_date
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
