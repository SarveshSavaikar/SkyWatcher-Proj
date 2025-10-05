from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict

from app.db.database import get_db
from app.core.security import get_current_user
from app.db import models
from app.schemas.auth import UserResponse

router = APIRouter()

class ProfileUpdate(BaseModel):
    email: str = None
    username: str = None

class PreferencesUpdate(BaseModel):
    preferences: Dict

@router.get("", response_model=UserResponse)
async def get_profile(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user profile."""
    return current_user

@router.put("", response_model=UserResponse)
async def update_profile(
    profile_data: ProfileUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile."""
    if profile_data.email:
        current_user.email = profile_data.email
    if profile_data.username:
        current_user.username = profile_data.username
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/preferences")
async def update_preferences(
    preferences_data: PreferencesUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update weather preferences."""
    profile = db.query(models.UserProfile).filter(
        models.UserProfile.user_id == current_user.id
    ).first()
    
    if not profile:
        profile = models.UserProfile(user_id=current_user.id)
        db.add(profile)
    
    profile.preferences = preferences_data.preferences
    db.commit()
    
    return {"message": "Preferences updated successfully"}
