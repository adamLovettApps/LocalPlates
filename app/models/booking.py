from app.models.restaurant import Restaurant
from .db import db
from datetime import datetime


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        "restaurants.id"), nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"), nullable=False)
    booked_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    booked_for = db.Column(db.DateTime, nullable=False)
    confirmation_status = db.Column(db.Integer, nullable=False)
    party_size = db.Column(db.Integer, nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="bookings")
    user = db.relationship("User", back_populates="bookings")

    def to_dict(self):

        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "user_id": self.user_id,
            "booked-at": self.booked_at,
            "booked-for": self.booked_for,
            "confirmation_status": self.confirmation_status,
            "party_size": self.party_size,
            "restaurant": self.restaurant.to_dict(),
        }
