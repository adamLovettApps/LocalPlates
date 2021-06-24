from flask import Blueprint, jsonify
import requests
import os
from sqlalchemy import func
from flask.helpers import url_for
from app.models import User, Restaurant, Review, Photo, MenuPhoto, db
restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/all/<ip>')
def get_all_restaurants(ip):
    REACT_APP_IPAPI_KEY = os.environ.get('REACT_APP_IPAPI_KEY')
    res = requests.get(
        f"https://api.ipapi.com/api/{ip}?access_key={REACT_APP_IPAPI_KEY}")
    location = res.json()
    latitude = location["latitude"]
    longitude = location["longitude"]
    restaurants = Restaurant.query.order_by(func.ST_Distance(
        Restaurant.geo, func.ST_MakePoint(latitude, longitude)
    )).all()
    print('>>>>>>>>>>>>>>>>>>>>>>>got to restaurants api')
    print(restaurants[0].to_dict())
    print({k: restaurant.to_dict() for k, restaurant in dict(
        zip(range(len(restaurants)), restaurants)).items()})
    # every restaurant is assigned a key from 0 to length of total restaurants
    return {k: restaurant.to_dict() for k, restaurant in dict(zip(range(len(restaurants)), restaurants)).items()}


@restaurant_routes.route('/<int:id>')
def get_restaurant(id):
    print("In Route>>>>>>>>>>>>>>>>>>>>>>>>>>>>:  ", int(id))
    restaurant = Restaurant.query.get(id)
    reviews = Review.query.filter_by(restaurant_id=id).all()
    photos = Photo.query.filter_by(restaurant_id=id).all()
    menu_photos = MenuPhoto.query.filter_by(restaurant_id=id).all()
    # loop through iterables and call to_dict
    data = {"restaurant": restaurant, "data": {
        "reviews": reviews, "menu_photos": menu_photos, "photos": photos}}
    new_reviews = {k: review.to_dict() for k, review in dict(
        zip(range(len(reviews)), reviews)).items()}
    new_photos = {k: photo.to_dict() for k, photo in dict(
        zip(range(len(photos)), photos)).items()}
    new_menu_photos = {k: menu_photo.to_dict() for k, menu_photo in dict(
        zip(range(len(menu_photos)), menu_photos)).items()}
    return {"restaurant": restaurant.to_dict(), "data": {"reviews": new_reviews, "photos": new_photos, "menu_photos": new_menu_photos}}
