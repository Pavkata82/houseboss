# admin feature, user list
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models.user import User

users_bp = Blueprint("users", __name__)

@users_bp.get("/")
@jwt_required()
def list_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "username": u.username,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "role": u.role,
            "created_at": u.created_at
        }
        for u in users
    ])
