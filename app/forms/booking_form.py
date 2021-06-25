from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from app.models import Booking


class BookingForm(FlaskForm):
    restaurant_id = IntegerField('restaurant')
    user_id = IntegerField('user')
    booking_day = DateField('date')
    booking_time = StringField('time')
    party_size = IntegerField('party size')
