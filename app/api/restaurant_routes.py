from flask import Blueprint, jsonify
from flask.helpers import url_for
from app.models import User, Restaurant, Review, Photo, MenuPhoto, db
restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route('/all')
def get_all_restaurants():
    restaurants = Restaurant.query.all()
    print('>>>>>>>>>>>>>>>>>>>>>>>got to restaurants api')
    print(restaurants[0].to_dict())
    print({k:restaurant.to_dict() for k,restaurant in dict(zip(range(len(restaurants)),restaurants)).items()})
    # every restaurant is assigned a key from 0 to length of total restaurants
    return {k:restaurant.to_dict() for k,restaurant in dict(zip(range(len(restaurants)),restaurants)).items()}


@restaurant_routes.route('/<int:id>')
def get_restaurant(id):
    print("In Route>>>>>>>>>>>>>>>>>>>>>>>>>>>>:  ", int(id))
    restaurant = Restaurant.query.get(id)
    print(restaurant.to_dict())
    reviews = Review.query.filter_by(restaurant_id=id).all()
    print("REEEEEEEEEEEEEEEEEEEEEEEEE", reviews)
    photos = Photo.query.filter_by(restaurant_id=id).all()
    print("MEEEEEEEEEEEEEEEEEEEEEEEEEE", photos)
    menu_photos = MenuPhoto.query.filter_by(restaurant_id=id).all()
    print("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", menu_photos)
    #loop through iterables and call to_dict
    data = {restaurant: restaurant, data: dict(reviews, photos, menu_photos)}

    return data
