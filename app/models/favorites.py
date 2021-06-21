from .db import db

class Favorite(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer,  db.ForeignKey("users.id"),nullable=False)
    restaurant_id=db.Column(db.Integer, db.ForeignKey("restaurants.id"),nullable=False)
    
    restaurant = db.relationship("Restaurant")
    user = db.relationship("User", back_populates="favorites")
