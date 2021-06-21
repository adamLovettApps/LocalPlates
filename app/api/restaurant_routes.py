from flask import Blueprint
from app.models import User, Restaurant, db
restaurant_routes = Blueprint('restaurant', __name__)


@restaurant_routes.route('/all')
def get_all_restaurants():
    # restuarants = Restaurant.query.all()
    print('got to restaurants api');
    # return restuarants.to_dict();
