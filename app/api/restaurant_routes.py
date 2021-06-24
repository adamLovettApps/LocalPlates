from flask import Blueprint, jsonify
import requests
import os
from sqlalchemy import func
from flask.helpers import url_for
from app.models import User, Restaurant, Review, Photo, MenuPhoto, db, Tag, restaurant_tags
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
    # every restaurant is assigned a key from 0 to length of total restaurants
    return {k: restaurant.to_dict() for k, restaurant in dict(zip(range(len(restaurants)), restaurants)).items()}


@restaurant_routes.route('/<int:id>')
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)
    reviews = Review.query.filter_by(restaurant_id=id).all()
    photos = Photo.query.filter_by(restaurant_id=id).all()
    menu_photos = MenuPhoto.query.filter_by(restaurant_id=id).all()
    # loop through iterables and call to_dict
    return restaurant.to_dict()


@restaurant_routes.route('/reviews/<int:id>')
def get_reviews(id):
    reviews = Review.query.filter_by(restaurant_id=id).all()
    new_reviews = {k: review.to_dict() for k, review in dict(
        zip(range(len(reviews)), reviews)).items()}
    return new_reviews


@restaurant_routes.route('/photos/<int:id>')
def get_photos(id):
    photos = Photo.query.filter_by(restaurant_id=id).all()
    new_photos = {k: photo.to_dict() for k, photo in dict(
        zip(range(len(photos)), photos)).items()}
    return new_photos


@restaurant_routes.route('/menuphotos/<int:id>')
def get_menu_photos(id):
    menu_photos = MenuPhoto.query.filter_by(restaurant_id=id).all()
    new_menu_photos = {k: menu_photo.to_dict() for k, menu_photo in dict(
        zip(range(len(menu_photos)), menu_photos)).items()}
    return new_menu_photos


@restaurant_routes.route('/tags/<int:id>')
def get_restaurant_tags(id):
    print("HEEEEEEEEEEERRRRRRRREEEEEEEEEEEEEEE!")
    data = db.session.execute(
        f"SELECT tags.type FROM tags JOIN restaurant_tags ON tag_id=tags.id WHERE restaurant_tags.restaurant_id = {id}")
    rows = data.fetchall()
    tags = {}
    for row in rows:
        tags[row[0]] = row[0]
        
    return tags
