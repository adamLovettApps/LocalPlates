from .db import db

restaurant_tags = db.Table(
    'restaurant_tags',
    db.Column(
        "tag_id", 
        db.Integer, 
        db.ForeignKey("tags.id"), 
        primary_key=True
    ),
    db.Column(
        "restaurant_id", 
        db.Integer, 
        db.ForeignKey("restaurants.id"), 
        primary_key=True
    )
)
