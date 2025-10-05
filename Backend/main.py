from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from app.api.routes import weather, trips, recommendations, reports, profile, export, locations, auth
from app.core.config import settings
from app.db.database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables on startup
    Base.metadata.create_all(bind=engine)
    yield
    # Cleanup on shutdown (if needed)

app = FastAPI(
    title="Weather Analysis API",
    description="API for weather probability analysis, trip planning, and recommendations",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(weather.router, prefix="/api", tags=["Weather"])
app.include_router(locations.router, prefix="/api/locations", tags=["Locations"])
app.include_router(trips.router, prefix="/api/trips", tags=["Trips"])
app.include_router(recommendations.router, prefix="/api", tags=["Recommendations"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(export.router, prefix="/api/export", tags=["Export"])

@app.get("/")
async def root():
    return {
        "message": "Weather Analysis API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
