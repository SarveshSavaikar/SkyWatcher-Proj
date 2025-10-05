from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class WeatherProbabilityRequest(BaseModel):
    location: str = Field(..., description="Location name or coordinates")
    start_date: str = Field(..., description="Start date in YYYY-MM-DD format")
    end_date: Optional[str] = Field(None, description="End date in YYYY-MM-DD format")
    conditions_checklist: List[str] = Field(default=[], description="Weather conditions to check")
    activity_profile: Optional[str] = Field(None, description="Activity type for recommendations")

class HourlyProbability(BaseModel):
    hour: int
    rain_prob: float
    cloudy_prob: float
    sunny_prob: float
    high_wind_prob: float

class WeatherProbabilityResponse(BaseModel):
    location: str
    coordinates: Dict[str, float]
    date: str
    summary: Dict[str, float]
    hourly_probabilities: List[HourlyProbability]
    confidence_level: str
    summary_text: str
    chart_base64: Optional[str] = None

class WeatherHistoryRequest(BaseModel):
    location: str
    start_date: str
    end_date: str

class WeatherHistoryResponse(BaseModel):
    location: str
    date_range: Dict[str, str]
    historical_patterns: Dict[str, any]
    averages: Dict[str, float]
