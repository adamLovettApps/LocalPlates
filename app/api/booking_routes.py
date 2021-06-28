from flask import Blueprint, request
from app.models import db, Booking
from flask_login import current_user, login_required
from app.forms.booking_form import BookingForm
from datetime import datetime

booking_routes = Blueprint("booking", __name__)

@login_required
@booking_routes.route("", methods=["POST"])
def create_booking():
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    restaurant_id = form.data['restaurant_id'],
    user_id = form.data['user_id'],
    booking_day = form.data['booking_day'],
    booking_time = form.data['booking_time'],
    party_size = form.data['party_size'],

    booking_info = str(booking_day[0]) + " " + booking_time[0]
    date_time_obj = datetime.strptime(booking_info, '%Y-%m-%d %H:%M:%S')
    booking = Booking(
        restaurant_id=restaurant_id,
        user_id=user_id,
        booked_at=datetime.now(),
        booked_for=date_time_obj,
        confirmation_status=0,
        party_size=party_size
    )
    db.session.add(booking)
    db.session.commit()
    return {}


@booking_routes.route("/accepted/<int:id>")
def get_accepted_restaurant_bookings(id):
    bookings = Booking.query.order_by(Booking.booked_for).filter(Booking.booked_for >= datetime.today()).filter_by(restaurant_id=id).filter_by(confirmation_status=1).all()
    new_bookings = {k: bookings.to_dict() for k, bookings in dict(
        zip(range(len(bookings)), bookings)).items()}
    print(datetime.today())
    return new_bookings


@booking_routes.route("/pending/<int:id>")
def get_pending_restaurant_bookings(id):
    print("HIT THE PENDING ROUTE ON THE BACKEND")
    bookings = Booking.query.order_by(Booking.booked_for).filter(Booking.booked_for >= datetime.today()).filter_by(
        restaurant_id=id).filter_by(confirmation_status=0).all()
    new_bookings = {k: bookings.to_dict() for k, bookings in dict(
        zip(range(len(bookings)), bookings)).items()}
    print(datetime.today())
    print("PENDING BOOKINGS", new_bookings)
    return new_bookings


@booking_routes.route("/cancelled/<int:id>")
def get_cancelled_restaurant_bookings(id):
    bookings = Booking.query.order_by(Booking.booked_for).filter(Booking.booked_for >= datetime.today()).filter_by(
        restaurant_id=id).filter_by(confirmation_status=-1).all()
    new_bookings = {k: bookings.to_dict() for k, bookings in dict(
        zip(range(len(bookings)), bookings)).items()}
    print(datetime.today())
    return new_bookings


@booking_routes.route("/<int:id>/<string:status>")
def update_booking(id, status):
    status = int(status)
    print("GOT TO CHANGE BOOKING")
    booking = Booking.query.filter_by(id=id).first()
    booking.confirmation_status = status
    db.session.commit()
    return {}
