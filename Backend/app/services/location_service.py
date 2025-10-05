from typing import List, Dict

class LocationService:
    async def search_locations(self, query: str) -> List[Dict]:
        """Search for locations using geocoding API."""
        # Implement location search (Google Maps API, OpenStreetMap, etc.)
        # For now, return dummy data
        return [
            {
                "name": "Margao, Goa, India",
                "latitude": 15.272923,
                "longitude": 73.958159,
                "country": "India"
            }
        ]
