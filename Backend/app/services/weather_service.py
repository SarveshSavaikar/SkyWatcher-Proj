import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from datetime import datetime, timedelta
from typing import List, Dict, Optional

from app.core.config import settings

class WeatherService:
    def __init__(self):
        self.nasa_api_key = settings.NASA_API_KEY
        self.meteomatics_username = settings.METEOMATICS_USERNAME
        self.meteomatics_password = settings.METEOMATICS_PASSWORD
        self.google_api_key = settings.GOOGLE_WEATHER_API_KEY
    
    async def analyze_weather_probability(
        self,
        location: str,
        start_date: str,
        end_date: Optional[str] = None,
        conditions_checklist: List[str] = [],
        activity_profile: Optional[str] = None
    ):
        """Main method to analyze weather probability."""
        # Get coordinates
        coords = await self.get_coordinates(location)
        lat, lon = coords['latitude'], coords['longitude']
        
        # Parse date
        date = datetime.strptime(start_date, "%Y-%m-%d")
        
        # Fetch historical data
        historical_dfs = await self.get_historical_dfs(lat, lon, date)
        
        # Combine data
        df_combined = pd.concat(historical_dfs) if historical_dfs else pd.DataFrame()
        
        # Calculate probabilities
        if not df_combined.empty:
            hourly_probs = self.calculate_hourly_probabilities(df_combined)
            summary = self.calculate_summary(df_combined)
        else:
            hourly_probs = pd.DataFrame()
            summary = {}
        
        # Generate chart
        chart_base64 = self.generate_chart(hourly_probs, location, start_date)
        
        # Generate summary text
        summary_text = self.generate_summary_text(summary, conditions_checklist)
        
        # Calculate confidence level
        confidence = self.calculate_confidence(len(historical_dfs))
        
        return {
            "location": location,
            "coordinates": {"latitude": lat, "longitude": lon},
            "date": start_date,
            "summary": summary,
            "hourly_probabilities": hourly_probs.to_dict('records') if not hourly_probs.empty else [],
            "confidence_level": confidence,
            "summary_text": summary_text,
            "chart_base64": chart_base64
        }
    
    async def get_coordinates(self, location: str) -> Dict[str, float]:
        """Get coordinates for a location."""
        # Implement geocoding logic (use Google Maps API or similar)
        # For now, return dummy data
        return {"latitude": 15.272923, "longitude": 73.958159}
    
    async def get_historical_dfs(self, lat: float, lon: float, date: datetime) -> List[pd.DataFrame]:
        """Fetch historical weather data."""
        dfs = []
        current_year = datetime.now().year
        
        for year in range(current_year - settings.HISTORICAL_YEARS, current_year):
            for day_offset in range(-settings.DAYS_RANGE, settings.DAYS_RANGE + 1):
                target_date = date.replace(year=year) + timedelta(days=day_offset)
                df = await self.fetch_meteomatics_data(lat, lon, target_date)
                if not df.empty:
                    dfs.append(df)
        
        return dfs
    
    async def fetch_meteomatics_data(self, lat: float, lon: float, date: datetime) -> pd.DataFrame:
        """Fetch data from Meteomatics API."""
        # Implement Meteomatics API call
        # For now, return dummy data
        return pd.DataFrame()
    
    def calculate_hourly_probabilities(self, df: pd.DataFrame) -> pd.DataFrame:
        """Calculate hourly weather probabilities."""
        df = df.copy()
        df['hour'] = df.index.hour
        
        def calc_probs(group):
            rain = (group.get('precip_1h:mm', 0) > 0).mean() if 'precip_1h:mm' in group else 0
            cloudy = (group.get('relative_humidity_2m:p', 0) > 70).mean() if 'relative_humidity_2m:p' in group else 0
            sunny = ((group.get('precip_1h:mm', 0) == 0) & (group.get('relative_humidity_2m:p', 100) < 60)).mean() if 'precip_1h:mm' in group and 'relative_humidity_2m:p' in group else 0
            high_wind = (group.get('wind_speed_10m:ms', 0) > 10).mean() if 'wind_speed_10m:ms' in group else 0
            return pd.Series({
                'rain_prob': rain * 100,
                'cloudy_prob': cloudy * 100,
                'sunny_prob': sunny * 100,
                'high_wind_prob': high_wind * 100
            })
        
        hourly_probs = df.groupby('hour').apply(calc_probs).reset_index()
        return hourly_probs
    
    def calculate_summary(self, df: pd.DataFrame) -> Dict[str, float]:
        """Calculate daily summary statistics."""
        return {
            "avg_rain_prob": 0.0,
            "avg_cloudy_prob": 0.0,
            "avg_sunny_prob": 0.0,
            "avg_high_wind_prob": 0.0
        }
    
    def generate_chart(self, hourly_probs: pd.DataFrame, location: str, date: str) -> str:
        """Generate matplotlib chart and return as base64."""
        if hourly_probs.empty:
            return None
        
        fig, ax = plt.subplots(figsize=(12, 6))
        ax.plot(hourly_probs['hour'], hourly_probs['rain_prob'], marker='o', label='Rain %')
        ax.plot(hourly_probs['hour'], hourly_probs['cloudy_prob'], marker='s', label='Cloudy %')
        ax.plot(hourly_probs['hour'], hourly_probs['sunny_prob'], marker='^', label='Sunny %')
        
        ax.set_xlabel('Hour')
        ax.set_ylabel('Probability (%)')
        ax.set_title(f'Hourly Weather Probabilities for {location} on {date}')
        ax.legend()
        ax.grid(True, alpha=0.3)
        
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode()
        plt.close()
        
        return image_base64
    
    def generate_summary_text(self, summary: Dict, conditions: List[str]) -> str:
        """Generate human-readable summary text."""
        return "Weather analysis complete. Check the detailed probabilities for more information."
    
    def calculate_confidence(self, data_points: int) -> str:
        """Calculate confidence level based on available data."""
        if data_points >= 10:
            return "High"
        elif data_points >= 5:
            return "Medium"
        else:
            return "Low"
    
    async def get_historical_weather(self, location: str, start_date: str, end_date: str):
        """Get historical weather data for a date range."""
        return {
            "location": location,
            "date_range": {"start": start_date, "end": end_date},
            "historical_patterns": {},
            "averages": {}
        }
