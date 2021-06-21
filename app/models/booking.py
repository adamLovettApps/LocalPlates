from app.models.restaurant import Restaurant
from .db import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key = True)
    restaurant_id=db.Column(db.Integer, db.ForeignKey("restaurants.id"),nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"),nullable=False)
    booked_at = db.Column(db.DateTime , nullable=False)
    booked_for = db.Column(db.DateTime , nullable=False)
    confirmation_status = db.Column(db.Integer, nullable = False)
    party_size = db.Column(db.Integer, nullable = False)

    restaurant = db.relationship("Restaurant", back_populates="bookings")
    user = db.relationship("User", back_populates="bookings")
