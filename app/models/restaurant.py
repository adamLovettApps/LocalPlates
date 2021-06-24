from geoalchemy2 import Geometry
from .db import db
from .restaurant_tags import restaurant_tags
from .user import User


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    hours = db.Column(db.String, nullable=False)
    total_bookings = db.Column(db.Integer, nullable=False)
    star_rating = db.Column(db.Float)
    review_count = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    geo = db.Column(Geometry(geometry_type="POINT"))

    owner = db.relationship("User", back_populates="restaurant",)

    menu_photo = db.relationship("MenuPhoto", back_populates="restaurant")
    photo = db.relationship("Photo", back_populates="restaurant")
    review = db.relationship("Review", back_populates="restaurant")

    bookings = db.relationship("Booking", back_populates="restaurant")

    tags = db.relationship(
        "Tag",
        secondary=restaurant_tags,
        back_populates="restaurant"
    )

    def to_dict(self):
        data = User.query.get(self.owner_id)
        owner_info = data.to_dict()
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
            "phone_number": self.phone_number,
            # add owner.to_dict() method call
            # "owner": self.owner.to_dict(),
            "profile_photo": owner_info["profile_photo"],
            "hours": self.hours,
            "total_bookings": self.total_bookings,
            "star_rating": self.star_rating,
            "review_count": self.review_count,
            "description": self.description,
        }
