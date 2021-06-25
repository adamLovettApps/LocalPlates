from .db import db
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(
        "restaurants.id"), nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"), nullable=False)
    body = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    restaurant = db.relationship("Restaurant", back_populates="review")
    user = db.relationship("User", back_populates="review")

    def to_dict(self):

        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "user_id": self.user_id,
            "body": self.body,
            "stars": self.stars,
            "title": self.title,
            "image": self.image,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
