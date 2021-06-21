from .db import db

class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String, nullable=False)
    restaurant = db.relationship(
        "Restuarant", 
        secondary=restaurant_tags, 
        back_populates="tags"
    )