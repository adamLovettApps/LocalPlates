from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import User, Booking, Favorite, Review, Restaurant, db
import os
import requests
from sqlalchemy import func

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
        # print("uuuuuuuusssssssseeeeeerrrrrrr", user.to_dict)
        bookings = Booking.query.filter_by(user_id=id).all()
        # print("BBBooooooooooooooooooookings", bookings)
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
            # print("Booooooooooooookings", new_user["bookings"])
        if reviews:
            new_user["reviews"] = {k: review.to_dict() for k, review in dict(
                zip(range(len(reviews)), reviews)).items()}
            # print(new_user["reviews"])
        if favorites:
            new_user["favorites"] = {k: favorite.to_dict() for k, favorite in dict(
                zip(range(len(favorites)), favorites)).items()}
            # print(new_user["favorites"])
        print(new_user)
        return new_user
    else:
        return redirect("http://localhost:3000/", 302)


@user_routes.route('/getfavorites/<int:id>/<ip>')
@login_required
def favorites(id,ip):
    REACT_APP_IPAPI_KEY = os.environ.get('REACT_APP_IPAPI_KEY')
    res = requests.get(
        f"https://api.ipapi.com/api/{ip}?access_key={REACT_APP_IPAPI_KEY}")
    location = res.json()
    latitude = location["latitude"] - 2
    longitude = location["longitude"] + 3
    data = db.session.execute(f"SELECT favorites.restaurant_id FROM favorites WHERE favorites.user_id = {id}")
    restaurant_ids_with_tup = data.fetchall()
    restaurant_id_list = list({id[0] for id in restaurant_ids_with_tup})
    favorites = Restaurant.query.order_by(func.ST_Distance(
        Restaurant.geo, func.ST_MakePoint(latitude, longitude))).filter(Restaurant.id.in_(restaurant_id_list)).all()
    new_favorites = {k: favorite.to_dict() for k, favorite in dict(
        zip(range(len(favorites)), favorites)).items()}
    return new_favorites


@user_routes.route('/getfavoritesNoIp/<int:id>')
@login_required
def favorites_no_ip(id):
    favorites = Favorite.query.filter_by(user_id=id).all()
    new_favorites = {k: favorite.to_dict() for k, favorite in dict(
        zip(range(len(favorites)), favorites)).items()}
    return new_favorites


@user_routes.route('/setFavorite/<int:userid>/<int:restaurantid>/<int:status>')
@login_required
def addfavorite(userid, restaurantid, status):
    if status == 1:
        favorite = Favorite(
            user_id=userid,
            restaurant_id=restaurantid
        )
        db.session.add(favorite)
        db.session.commit()
    else:
        favorite = Favorite.query.filter_by(user_id=userid).filter_by(restaurant_id=restaurantid).first()
        db.session.delete(favorite)
        db.session.commit()
    favorites = Favorite.query.filter_by(user_id=userid).all()
    new_favorites = {k: favorite.to_dict() for k, favorite in dict(
        zip(range(len(favorites)), favorites)).items()}
    return new_favorites
