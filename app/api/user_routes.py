from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Favorite

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


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
