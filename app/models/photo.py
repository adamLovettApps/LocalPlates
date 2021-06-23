from .db import db

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    caption = db.Column(db.String, nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="photo")

    def to_dict(self):
        return {
            "id": self.id,
            "image": self.image,
            "restaurant_id": self.restaurant_id,
            "caption": self.caption
        }
