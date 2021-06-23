from flask import Blueprint, jsonify, session, request
import os
import json
import requests
from app.models import User, Restaurant, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import RestaurantSignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            profile_photo="null",
            is_owner=False

        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/signupRestaurant', methods=['POST'])
def sign_up_restaurant():
    """
    Creates a new user and logs them in
    """
    
    form = RestaurantSignUpForm()
    addressForGoogle = form.data["address"].replace(" ", "+")
    cityForGoogle = form.data["city"].replace(" ", "+")
    stateForGoogle = form.data["state"].replace(" ", "+")
    googleKey = os.environ.get("GOOGLE_KEY")

    print(googleKey)
    res = requests.get(
        f"https://maps.googleapis.com/maps/api/geocode/json?address={addressForGoogle},+{cityForGoogle},+{stateForGoogle}&key={googleKey}")

    if res.status_code == 200:
        location = res.json()
        print(location["results"][0]['geometry']['location'])
        lat = location["results"][0]['geometry']['location']['lat']
        lng = location["results"][0]['geometry']['location']['lng']
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            print("HERE!")
            profile_photo = form.data["profile_photo"]
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password'],
                is_owner=True,
                profile_photo=profile_photo["url"]
            )
            db.session.add(user)
            db.session.commit()
            restaurant = Restaurant(
                owner_id=user.id,
                name=form.data["name"],
                address=form.data["address"],
                city=form.data["city"],
                state=form.data["state"],
                zipcode=form.data["zipcode"],
                phone_number=form.data["phoneNumber"],
                total_bookings=0,
                star_rating=0,
                review_count=0,
                hours=" ",
                description=form.data["description"],
                geo=f'POINT({lat} {lng})'
            )
            db.session.add(restaurant)
            db.session.commit()
            login_user(user)
            return user.to_dict()
        else:
            print("ERRORS!!!!!!!!!!!", form.errors)
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        return {'errors': "Please provide a valid address."}, 404


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
