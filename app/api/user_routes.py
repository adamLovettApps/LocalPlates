from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import User, Booking, Favorite, Review, Restaurant

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
        # restaurant = Booking.query.filter(Booking.restaurant)

        # print("uuuuuuuusssssssseeeeeerrrrrrr", user.to_dict)
        bookings = Booking.query.filter_by(user_id=id).all()

        # print("BBBooooooooooooooooooookings", bookings[0].restaurant.to_dict())

        favorites = Favorite.query.filter_by(user_id=id).all()
        # print("faaaaaaaaaaavorittes", favorites)
        reviews = Review.query.filter_by(user_id=id).all()
        new_user = dict(user.to_dict())
        # print(new_user)
        # for k, value in dict(user).items():
        #     new_user[k] = value
        if bookings:
            new_user["bookings"] = {k: booking.to_dict() for k, booking in dict(
                zip(range(len(bookings)), bookings)).items()}

        if reviews:
            new_user["reviews"] = {k: review.to_dict() for k, review in dict(
                zip(range(len(reviews)), reviews)).items()}
            # print(new_user["reviews"])
        if favorites:
            new_user["favorites"] = {k: favorite.to_dict() for k, favorite in dict(
                zip(range(len(favorites)), favorites)).items()}
            # print(new_user["favorites"])
        return new_user
    else:
        return redirect("http://localhost:3000/", 302)


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
