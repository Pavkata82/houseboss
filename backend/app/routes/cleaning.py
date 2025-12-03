from datetime import datetime, timedelta
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.database import db
from app.models.user import User
from app.models.event import Event
from app.models.cleaning_rotation import CleaningRotation

cleaning_bp = Blueprint("cleaning", __name__)

def get_current_week():
    now = datetime.now()
    week = now.isocalendar().week
    return f"{now.year}-W{week}"

def get_next_week():
    now = datetime.now()
    year, week, _ = now.isocalendar()
    next_week = week + 1
    next_year = year
    # handle year rollover
    if next_week > 52:
        next_week = 1
        next_year += 1
    return f"{next_year}-W{next_week}"

def get_week_start_end(week_str):
    """Return the start (Monday) and end (Sunday) dates of an ISO week."""
    year, week = map(int, week_str.split("-W"))
    first_day = datetime.strptime(f'{year}-W{week}-1', "%G-W%V-%u")  # Monday
    last_day = first_day + timedelta(days=6)  # Sunday
    return first_day.strftime("%Y-%m-%d"), last_day.strftime("%Y-%m-%d")

def get_pair(students, rotation_index):
    n = len(students)
    return [
        students[rotation_index % n],
        students[(rotation_index + 1) % n]
    ]

@cleaning_bp.get("/")
@jwt_required()
def get_cleaning_schedule():
    # 1. Load all students (users with role=student)
    students = User.query.filter_by(role="student").order_by(User.id).all()
    student_names = [f"{s.first_name} {s.last_name}" for s in students]

    # 2. Load rotation record
    rotation = CleaningRotation.query.get(1)
    if not rotation:
        return {"error": "Cleaning rotation not initialized"}, 400

    rotation_index = rotation.rotation_index
    stored_week = rotation.stored_week
    current_week = get_current_week()

    # 3. Weekly rotation update
    if stored_week != current_week:
        rotation_index += 2
        rotation.rotation_index = rotation_index
        rotation.stored_week = current_week
        db.session.commit()

    # 4. Weekly cleaning pairs
    current_pair = get_pair(student_names, rotation_index)
    next_pair = get_pair(student_names, rotation_index + 2)

    # 5. Event cleaning the DAY AFTER the event
    events = Event.query.order_by(Event.date).all()
    event_cleaning = []
    for e in events:
        creator = User.query.get(e.created_by)
        creator_name = f"{creator.first_name} {creator.last_name}" if creator else "Unknown"

        try:
            event_date = datetime.strptime(e.date, "%Y-%m-%d")
            cleaning_date = (event_date + timedelta(days=1)).strftime("%Y-%m-%d")
        except:
            cleaning_date = e.date

        event_cleaning.append({
            "id": e.id,
            "title": e.title,
            "event_date": e.date,
            "cleaning_date": cleaning_date,
            "user": creator_name
        })

    # 6. Get week start/end
    current_start, current_end = get_week_start_end(current_week)
    next_week_str = get_next_week()
    next_start, next_end = get_week_start_end(next_week_str)

    return jsonify({
        "current": {
            "week": current_week,
            "start": current_start,
            "end": current_end,
            "status": "Current",
            "people": current_pair
        },
        "next": {
            "week": next_week_str,
            "start": next_start,
            "end": next_end,
            "status": "Next",
            "people": next_pair
        },
        "events": event_cleaning
    })
