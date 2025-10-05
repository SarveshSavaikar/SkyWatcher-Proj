from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime

from app.db.database import get_db
from app.core.security import get_current_user
from app.db import models

router = APIRouter()

class ReportCreate(BaseModel):
    location: str
    latitude: float = None
    longitude: float = None
    report_date: datetime
    weather_conditions: dict = {}
    description: str = ""

class ReportUpdate(BaseModel):
    location: str = None
    weather_conditions: dict = None
    description: str = None

class ReportResponse(BaseModel):
    id: int
    user_id: int
    location: str
    latitude: float = None
    longitude: float = None
    report_date: datetime
    weather_conditions: dict
    description: str
    photos: List[str] = []
    created_at: datetime
    
    class Config:
        from_attributes = True

@router.get("", response_model=List[ReportResponse])
async def get_reports(
    location: str = None,
    date: str = None,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get reports for a location/date."""
    query = db.query(models.Report)
    
    if location:
        query = query.filter(models.Report.location.ilike(f"%{location}%"))
    if date:
        query = query.filter(models.Report.report_date >= date)
    
    reports = query.all()
    return reports

@router.post("", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
async def create_report(
    report_data: ReportCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit a user report."""
    new_report = models.Report(**report_data.dict(), user_id=current_user.id)
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

@router.put("/{report_id}", response_model=ReportResponse)
async def update_report(
    report_id: int,
    report_data: ReportUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a report."""
    report = db.query(models.Report).filter(
        models.Report.id == report_id,
        models.Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    for key, value in report_data.dict(exclude_unset=True).items():
        setattr(report, key, value)
    
    db.commit()
    db.refresh(report)
    return report

@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(
    report_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a report."""
    report = db.query(models.Report).filter(
        models.Report.id == report_id,
        models.Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db.delete(report)
    db.commit()
    return None

@router.post("/{report_id}/photos")
async def upload_photo(
    report_id: int,
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload a photo to a report."""
    report = db.query(models.Report).filter(
        models.Report.id == report_id,
        models.Report.user_id == current_user.id
    ).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Save file (implement your file storage logic here)
    # For now, just return a placeholder
    photo_url = f"/uploads/{report_id}/{file.filename}"
    
    photos = report.photos or []
    photos.append(photo_url)
    report.photos = photos
    
    db.commit()
    return {"photo_url": photo_url}
