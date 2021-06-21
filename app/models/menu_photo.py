from .db import db


class MenuPhoto(db.Model):
    __tablename__ = "menu_photos"

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    updated_at = db.Column(db.Datetime, nullable=False)
    
    restaurant = db.relationship("Restaurant", back_populates="menu_photo")
