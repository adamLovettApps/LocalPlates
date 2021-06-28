from app.models import db, Booking
from datetime import datetime


def seed_bookings():
    b1 = Booking(restaurant_id=1, user_id=1, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=0, party_size=2)
    b2 = Booking(restaurant_id=1, user_id=2, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=1, party_size=2)
    b3 = Booking(restaurant_id=1, user_id=3, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=2, party_size=2)
    b4 = Booking(restaurant_id=1, user_id=4, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=0, party_size=2)
    b5 = Booking(restaurant_id=1, user_id=5, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=1, party_size=2)
    b6 = Booking(restaurant_id=1, user_id=6, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=2, party_size=2)
    b7 = Booking(restaurant_id=1, user_id=7, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=0, party_size=2)
    b8 = Booking(restaurant_id=1, user_id=8, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=1, party_size=2)
    b9 = Booking(restaurant_id=1, user_id=9, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                 confirmation_status=2, party_size=2)
    b10 = Booking(restaurant_id=1, user_id=1,
                  booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21), confirmation_status=0, party_size=2)
    b11 = Booking(restaurant_id=1, user_id=9, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                  confirmation_status=1, party_size=2)
    b12 = Booking(restaurant_id=1, user_id=8, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                  confirmation_status=2, party_size=2)
    b13 = Booking(restaurant_id=1, user_id=6, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                  confirmation_status=0, party_size=2)
    b14 = Booking(restaurant_id=1, user_id=5, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                  confirmation_status=1, party_size=2)
    b15 = Booking(restaurant_id=1, user_id=4, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                  confirmation_status=2, party_size=2)
    b16 = Booking(restaurant_id=1, user_id=3, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                  confirmation_status=0, party_size=2)
    b17 = Booking(restaurant_id=1, user_id=2, booked_for=datetime(2021, 6, 27), booked_at=datetime(2021, 6, 21),
                  confirmation_status=1, party_size=2)

    db.session.add(b1)
    db.session.add(b2)
    db.session.add(b3)
    db.session.add(b4)
    db.session.add(b5)
    db.session.add(b6)
    db.session.add(b7)
    db.session.add(b8)
    db.session.add(b9)
    db.session.add(b10)
    db.session.add(b11)
    db.session.add(b12)
    db.session.add(b13)
    db.session.add(b14)
    db.session.add(b15)
    db.session.add(b16)
    db.session.add(b17)
    db.session.commit()


def undo_bookings():
    db.session.execute('TRUNCATE TABLE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
