from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.database import db
from app.models.complaint import Complaint
from app.models.user import User
from datetime import datetime

complaints_bp = Blueprint("complaints", __name__)

@complaints_bp.post("/")
@jwt_required()
def create_complaint():
    user_id = int(get_jwt_identity())
    data = request.json
    complaint = Complaint(
        user_id=user_id,
        description=data["description"],
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    db.session.add(complaint)
    db.session.commit()
    return {"message": "Complaint created"}

@complaints_bp.get("/")
@jwt_required()
def list_complaints():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if user.role == "admin":
        # Admin sees all complaints
        complaints = Complaint.query.all()
    else:
        # Regular user sees only their own complaints
        complaints = Complaint.query.filter_by(user_id=user_id).all()

    result = []
    for c in complaints:
        complaint_user = User.query.get(c.user_id)
        result.append({
            "id": c.id,
            "user_id": c.user_id,
            "username": complaint_user.username if complaint_user else "Unknown",
            "description": c.description,
            "created_at": c.created_at
        })
    return result

