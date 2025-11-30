from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.models.house_rule import HouseRule

rules_bp = Blueprint("rules", __name__)

@rules_bp.get("/")
@jwt_required()
def get_rules():
    rules = HouseRule.query.order_by(HouseRule.sort_order).all()
    return [{"id": r.id, "text": r.rule_text} for r in rules]
