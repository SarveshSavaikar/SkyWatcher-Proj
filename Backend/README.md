# Weather Analysis API

FastAPI backend for weather probability analysis, trip planning, and recommendations.

## Features

- **Weather Analysis**: Hourly weather probability predictions based on historical data
- **Trip Management**: CRUD operations for trip planning
- **AI Recommendations**: Smart location and date recommendations
- **User Reports**: Community weather reports with photo uploads
- **Data Export**: CSV, JSON, and calendar event exports
- **Authentication**: JWT-based user authentication

## Setup

1. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Copy `.env.example` to `.env` and configure your API keys:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Run the server:
\`\`\`bash
cd backend
python main.py
\`\`\`

Or with uvicorn:
\`\`\`bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login and get access token
- `POST /auth/logout` - Logout
- `GET /auth/user` - Get current user info

### Weather Analysis
- `POST /api/weather-probability` - Analyze weather probability
- `GET /api/weather-history` - Get historical weather data

### Locations
- `GET /api/locations/search` - Search for locations

### Trips
- `GET /api/trips` - List user's trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/{id}` - Get trip details
- `PUT /api/trips/{id}` - Update trip
- `DELETE /api/trips/{id}` - Delete trip

### Recommendations
- `POST /api/recommendations` - Get AI recommendations

### Reports
- `GET /api/reports` - Get weather reports
- `POST /api/reports` - Submit new report
- `PUT /api/reports/{id}` - Update report
- `DELETE /api/reports/{id}` - Delete report
- `POST /api/reports/{id}/photos` - Upload photo

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `PUT /api/profile/preferences` - Update preferences

### Export
- `GET /api/export/csv` - Export as CSV
- `GET /api/export/json` - Export as JSON
- `POST /api/calendar/event` - Create calendar event

## Database

The application uses SQLite by default. To use PostgreSQL or MySQL, update the `DATABASE_URL` in `.env`:

\`\`\`
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost/dbname

# MySQL
DATABASE_URL=mysql://user:password@localhost/dbname
\`\`\`

## Development

The API uses:
- **FastAPI** for the web framework
- **SQLAlchemy** for database ORM
- **Pydantic** for data validation
- **JWT** for authentication
- **Pandas/NumPy** for data analysis
- **Matplotlib** for chart generation
