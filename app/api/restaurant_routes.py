from flask import Blueprint, jsonify
from flask.helpers import url_for
from app.models import User, Restaurant, Review, Photo, MenuPhoto, db, Tag, restaurant_tags
restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/tag_select/<string:tag>')
def get_all_restaurants(tag):
    # restaurants = Restaurant.query.all()
    print('>>>>>>>>>>>>>>>>>>>>>>>got to restaurants api', tag)
    results = db.session.execute(
        f"SELECT restaurants.id FROM restaurants JOIN restaurant_tags ON restaurant_tags.restaurant_id=restaurants.id JOIN tags ON tags.id=restaurant_tags.tag_id  WHERE tags.type ILIKE \'%{tag}%\'  LIMIT 20")
    restaurantsWithTup = results.fetchall();
    restaurant_id_list = list({id[0] for id in restaurantsWithTup})
    print('>>>>>>>>>>>>>>>>>>>>>>>got past query', restaurant_id_list )
    restaurants = Restaurant.query.filter(Restaurant.id.in_(restaurant_id_list)).all()
    # print('>>>>>>>>>>>>>>>>>>>>>>>got past query and reassigned', restaurantsWithTup )
    print('>>>>>>>>>>>>>>>>>>>>>>>got past reassign ', restaurants )
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
