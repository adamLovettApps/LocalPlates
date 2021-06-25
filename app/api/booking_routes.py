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
