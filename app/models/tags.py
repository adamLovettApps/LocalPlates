from .db import db
from .restaurant_tags import restaurant_tags

class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String, nullable=False)
    restaurant = db.relationship(
        "Restaurant",
        secondary=restaurant_tags,
        back_populates="tags"
    )
