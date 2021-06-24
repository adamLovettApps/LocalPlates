from flask import Blueprint, jsonify
import requests
import os
from sqlalchemy import func
from flask.helpers import url_for
from wtforms.validators import ValidationError
from app.models import User, Restaurant, Review, Photo, MenuPhoto, Booking, db
from app.forms.review_form import ReviewForm

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
    restaurant = Restaurant.query.get(id)
    reviews = Review.query.filter_by(restaurant_id=id).all()
    photos = Photo.query.filter_by(restaurant_id=id).all()
    menu_photos = MenuPhoto.query.filter_by(restaurant_id=id).all()
    bookings = Booking.filter_by(restaurant_id=id).all()
    # loop through iterables and call to_dict

    if reviews:
        new_reviews = {k: review.to_dict() for k, review in dict(
            zip(range(len(reviews)), reviews)).items()}
    if photos:
        new_photos = {k: photo.to_dict() for k, photo in dict(
            zip(range(len(photos)), photos)).items()}
    if menu_photos:
        new_menu_photos = {k: menu_photo.to_dict() for k, menu_photo in dict(
            zip(range(len(menu_photos)), menu_photos)).items()}
    if bookings:
        new_bookings = {k: booking.to_dict() for k, booking in dict(
            zip(range(len(bookings)), bookings)).items()}
    return {"restaurant": restaurant.to_dict(), "data": {"reviews": new_reviews, "photos": new_photos, "menu_photos": new_menu_photos, "bookings": new_bookings}}


@restaurant_routes.route('/<int:id>/reviews', methods=["POST"])
def add_review(id):
    form = ReviewForm()
    if form.validate_on_submit():
        review = Review(
            restaurant_id=form.data["restaurant_id"],
            user_id=form.data["user_id"],
            title=form.data["title"],
            body=form.data["body"],
            stars=form.data["stars"],
            image=form.data["image"]
        )
        print(review)
        db.session.add(review)
        db.session.commit()
        return review
        print("Review Added")
    else:
        return ValidationError("There was an Error when submitting your review, please try again.")
