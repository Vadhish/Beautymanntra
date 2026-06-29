from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Beautymanntra API")
api_router = APIRouter(prefix="/api")

# All available time slots (24h format)
ALL_SLOTS = [
    "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00",
]


class BookingCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=6, max_length=20)
    email: Optional[EmailStr] = None
    service: str
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    notes: Optional[str] = Field(default="", max_length=500)


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service: str
    date: str
    time: str
    notes: str = ""
    status: str = "confirmed"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class NewsletterSignup(BaseModel):
    email: EmailStr


@api_router.get("/")
async def root():
    return {"message": "Beautymanntra API", "status": "ok"}


@api_router.get("/slots")
async def get_slots(date: str = Query(..., description="YYYY-MM-DD")):
    """Return available + booked slots for the given date."""
    try:
        # Validate date
        datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")

    booked_docs = await db.bookings.find(
        {"date": date, "status": {"$ne": "cancelled"}},
        {"_id": 0, "time": 1},
    ).to_list(200)
    booked = sorted({d["time"] for d in booked_docs})
    available = [s for s in ALL_SLOTS if s not in booked]
    return {"date": date, "all_slots": ALL_SLOTS, "available": available, "booked": booked}


@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    # Validate date & time
    try:
        datetime.strptime(payload.date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")
    if payload.time not in ALL_SLOTS:
        raise HTTPException(status_code=400, detail="Invalid time slot")

    existing = await db.bookings.find_one({
        "date": payload.date,
        "time": payload.time,
        "status": {"$ne": "cancelled"},
    })
    if existing:
        raise HTTPException(status_code=409, detail="This time slot is already booked")

    booking = Booking(
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        email=payload.email,
        service=payload.service,
        date=payload.date,
        time=payload.time,
        notes=(payload.notes or "").strip(),
    )
    await db.bookings.insert_one(booking.model_dump())
    return booking


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings(limit: int = 100):
    docs = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


@api_router.post("/newsletter")
async def newsletter_signup(payload: NewsletterSignup):
    await db.newsletter.update_one(
        {"email": payload.email},
        {"$setOnInsert": {
            "email": payload.email,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    return {"ok": True, "message": "Subscribed"}


@api_router.get("/services")
async def get_services():
    """Static service catalogue used by frontend."""
    return {
        "categories": [
            {"key": "hair", "name": "Hair"},
            {"key": "skin", "name": "Skin & Facial"},
            {"key": "bridal", "name": "Bridal"},
            {"key": "spa", "name": "Spa & Massage"},
            {"key": "nails", "name": "Nails"},
            {"key": "makeup", "name": "Make-up"},
        ]
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
