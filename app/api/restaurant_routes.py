from flask import Flask, Blueprint, jsonify, request
import requests
import os
from requests.api import request
from sqlalchemy import func
from datetime import datetime
from sqlalchemy import desc
from flask.helpers import url_for
from app.models import User, Restaurant, Review, Photo, MenuPhoto, db, Tag, restaurant_tags
from app.forms import ReviewForm
restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/tag_select/<string:tag>/<ip>')
def get_collection_of_restaurants(tag, ip):

    # restaurants = Restaurant.query.all()
    REACT_APP_IPAPI_KEY = os.environ.get('REACT_APP_IPAPI_KEY')
    res = requests.get(
        f"https://api.ipapi.com/api/{ip}?access_key={REACT_APP_IPAPI_KEY}")
    location = res.json()
    latitude = location["latitude"] - 2
    longitude = location["longitude"] + 3
    results = db.session.execute(
        f"SELECT restaurants.id FROM restaurants JOIN restaurant_tags ON restaurant_tags.restaurant_id=restaurants.id JOIN tags ON tags.id=restaurant_tags.tag_id  WHERE tags.type ILIKE \'%{tag}%\'  LIMIT 20")
    restaurantsWithTup = results.fetchall()
    restaurant_id_list = list({id[0] for id in restaurantsWithTup})
    restaurants = Restaurant.query.order_by(func.ST_Distance(
        Restaurant.geo, func.ST_MakePoint(latitude, longitude))).filter(Restaurant.id.in_(restaurant_id_list)).all()
    # print('>>>>>>>>>>>>>>>>>>>>>>>got past query and reassigned', restaurantsWithTup )

    return {k: restaurant.to_dict() for k, restaurant in dict(zip(range(len(restaurants)), restaurants)).items()}
# @restaurant_routes.route('/all/<ip>')
# def get_all_restaurants(ip):
#     REACT_APP_IPAPI_KEY = os.environ.get('REACT_APP_IPAPI_KEY')
#     res = requests.get(
#         f"https://api.ipapi.com/api/{ip}?access_key={REACT_APP_IPAPI_KEY}")
#     location = res.json()
#     latitude = location["latitude"]
#     longitude = location["longitude"]
#     restaurants = Restaurant.query.order_by(func.ST_Distance(
#         Restaurant.geo, func.ST_MakePoint(latitude, longitude)
#     )).all()
#     print('>>>>>>>>>>>>>>>>>>>>>>>got to restaurants api')
#     print(restaurants[0].to_dict())

#     print({k: restaurant.to_dict() for k, restaurant in dict(
#         zip(range(len(restaurants)), restaurants)).items()})
#     # every restaurant is assigned a key from 0 to length of total restaurants
#     return {k: restaurant.to_dict() for k, restaurant in dict(zip(range(len(restaurants)), restaurants)).items()}


@restaurant_routes.route('/<int:id>')
def get_restaurant(id):
    restaurant = Restaurant.query.get(id)

    return restaurant.to_dict()


@restaurant_routes.route('/reviews/<int:id>')
def get_reviews(id):
    reviews = Review.query.filter_by(restaurant_id=id).order_by(desc(Review.created_at)).all()
    new_reviews = {k: review.to_dict() for k, review in dict(
        zip(range(len(reviews)), reviews)).items()}
    return new_reviews

@restaurant_routes.route('/reviews', methods=['POST'])
def add_review():
    print(request)
    print("review add backEnd>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    form = ReviewForm()
    print(form.data)

    form_validates = False
    if form['body'] and form['title'] and form['stars']:
        form_validates = True
    if form_validates:
        new_review = Review()
        form.populate_obj(new_review)
        print('REVIEW SUCCESS', new_review)
        db.session.add(new_review)
        db.session.commit()
        return {}
    print("review add backEnd>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ERROR")
    return {}
    # update review count and score on the user obj

@restaurant_routes.route('/photos/<int:id>')
def get_photos(id):
    photos = Photo.query.order_by(
        desc(Photo.id)).filter_by(restaurant_id=id).all()
    new_photos = {k: photo.to_dict() for k, photo in dict(
        zip(range(len(photos)), photos)).items()}
    return new_photos


@restaurant_routes.route('/photos/add/<int:id>/<url>')
def add_photo(id, url):
    print("GOT TO THE ADD PHOTO ROUTE WHAT IS HAPPENING HERE")
    new_url = "https://localplates.s3.amazonaws.com/" + url
    photo = Photo(
        image=new_url,
        restaurant_id=id,
        caption=""
    )
    db.session.add(photo)
    db.session.commit()
    return {}


@restaurant_routes.route('/photos/remove/<int:id>')
def remove_photo(id):
    photo = Photo.query.filter_by(id=id).first()
    db.session.delete(photo)
    db.session.commit()
    return {}


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


@restaurant_routes.route('/getRestaurantId/<int:id>')
def get_restaurant_id(id):
    restaurant = Restaurant.query.filter_by(owner_id=id).first()
    print("RESTAURANT!!!!!!!!!", restaurant.id)

    return {"id": restaurant.id}



@restaurant_routes.route('/getcoordinates/<int:id>')
def get_coords(id):
    googleKey = os.environ.get("GOOGLE_KEY")
    restaurant = Restaurant.query.filter_by(id=id).first()
    addressForGoogle = restaurant.address.replace(" ", "+")
    cityForGoogle = restaurant.city.replace(" ", "+")
    stateForGoogle = restaurant.state.replace(" ", "+")
    res = requests.get(
        f"https://maps.googleapis.com/maps/api/geocode/json?address={addressForGoogle},+{cityForGoogle},+{stateForGoogle}&key={googleKey}")
    if res.json()["status"] == 'OK':
        location = res.json()
        lat = location["results"][0]['geometry']['location']['lat']
        lng = location["results"][0]['geometry']['location']['lng']
        print("REsTAURANT COORDS ROUTE", lat, lng)
        print(' ')
        print(' ')
        print(' ')
        print(' ')
        print(' ')
        return {"lat": lat, "lng": lng}
    return {}
