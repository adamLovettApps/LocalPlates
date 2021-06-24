from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Booking, Favorite, Review

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    print("EEEEEEEEEEEEEEEEEEEE", current_user.to_dict()["id"], id)
    if current_user.to_dict()["id"] == id:
        user = User.query.get(id)
        bookings = Booking.query.filter_by(user_id=id).all()
        print(bookings)
        favorites = Favorite.query.filter_by(user_id=id).all()
        print(favorites)
        reviews = Review.query.filter_by(user_id=id).all()
        new_user = user.to_dict()
        # for k, value in dict(user).items():
        #     new_user[k] = value
        if bookings:
            new_user["bookings"] = {k: booking.to_dict() for k, booking in dict(
                zip(range(len(bookings)), bookings)).items()}
            print(new_user.bookings)
        if reviews:
            new_user["reviews"] = {k: review.to_dict() for k, review in dict(
                zip(range(len(reviews)), reviews)).items()}
        if favorites:
            new_user["favorites"] = {k: favorite.to_dict() for k, favorite in dict(
                zip(range(len(favorites)), favorites)).items()}
            print(new_user.favorites)
        print(new_user)
        return new_user
