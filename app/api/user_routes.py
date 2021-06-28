from flask import Blueprint, jsonify, redirect
from flask.globals import request
from flask_login import login_required, current_user
from sqlalchemy import desc
from werkzeug.security import generate_password_hash
from app.models import User, Booking, Favorite, Review, Restaurant
from datetime import datetime
from app.forms.user_edit import UserEditForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    if current_user.to_dict()["id"] == id:

        user = User.query.get(id)
        bookings = Booking.query.filter_by(
            user_id=id).order_by(Booking.booked_for).all()
        favorites = Favorite.query.filter_by(user_id=id).all()
        reviews = Review.query.filter_by(user_id=id).all()
        new_user = dict(user.to_dict())

        if bookings:
            new_user["bookings"] = {k: booking.to_dict() for k, booking in dict(
                zip(range(len(bookings)), bookings)).items()}

        if reviews:
            new_user["reviews"] = {k: review.to_dict() for k, review in dict(
                zip(range(len(reviews)), reviews)).items()}

        if favorites:
            new_user["favorites"] = {k: favorite.to_dict() for k, favorite in dict(
                zip(range(len(favorites)), favorites)).items()}
        return new_user
    else:
        return redirect("http://localhost:3000/", 302)


# @user_routes.route('/<int:id>', methods=["PUT"])
# @login_required
# def user(id):
#     if current_user.to_dict()["id"] == id:
#         form = UserEditForm()
#         if form.validate_on_submit():
#             newUser = {}

@user_routes.route('/getfavorites/<int:id>')
@login_required
def favorites(id):
    favorites = Favorite.query.filter_by(user_id=id).all()
    new_favorites = {k: photo.to_dict() for k, photo in dict(
        zip(range(len(favorites)), favorites)).items()}
    return new_favorites


@user_routes.route('/addFavorite/<int:userid>/<int:restaurantid>', methods=["POST"])
@login_required
def addfavorite(id):
    favorites = Favorite.query.filter_by(user_id=id).all()
    new_favorites = {k: photo.to_dict() for k, photo in dict(
        zip(range(len(favorites)), favorites)).items()}
    return new_favorites


@user_routes.route('/removefavorite/<int:userid>/<int:restaurantid>', methods=["POST"])
@login_required
def removefavorite(id):
    favorites = Favorite.query.filter_by(user_id=id).all()
    new_favorites = {k: photo.to_dict() for k, photo in dict(
        zip(range(len(favorites)), favorites)).items()}
    return new_favorites
