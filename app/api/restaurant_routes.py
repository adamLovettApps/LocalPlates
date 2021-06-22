from flask import Blueprint, jsonify
from app.models import User, Restaurant, db
restaurant_routes = Blueprint('restaurant', __name__)


@restaurant_routes.route('/all')
def get_all_restaurants():
    restaurants = Restaurant.query.all()
    print('>>>>>>>>>>>>>>>>>>>>>>>got to restaurants api')
    print(restaurants[0].to_dict())
    print({k:restaurant.to_dict() for k,restaurant in dict(zip(range(len(restaurants)),restaurants)).items()})
    # every restaurant is assigned a key from 0 to length of total restaurants
    return {k:restaurant.to_dict() for k,restaurant in dict(zip(range(len(restaurants)),restaurants)).items()}


@restaurant_routes.route('/:id')
def get_restaurant():
    restaurant = 
