from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class TripBase(BaseModel):
    name: str
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    start_date: datetime
    end_date: datetime
    activity_type: Optional[str] = None
    conditions_checklist: List[str] = []

class TripCreate(TripBase):
    pass

class TripUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    activity_type: Optional[str] = None
    conditions_checklist: Optional[List[str]] = None

class TripResponse(TripBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
