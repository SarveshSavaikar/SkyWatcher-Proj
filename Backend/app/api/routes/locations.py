from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import get_current_user
from app.db import models
from app.services.location_service import LocationService

router = APIRouter()

@router.get("/search")
async def search_locations(
    q: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Search for locations and return geocoded suggestions.
    """
    try:
        location_service = LocationService()
        results = await location_service.search_locations(q)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
