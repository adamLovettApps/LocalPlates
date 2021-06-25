from app.models import db, Review
from datetime import datetime


def seed_reviews():
    r1 = Review(restaurant_id=1, user_id=1, body="test review 1", stars=1,
                title="Review title 1", image="", created_at=datetime(2019, 10, 13), updated_at=datetime(2019, 10, 13))
    r2 = Review(restaurant_id=2, user_id=2, body="test review 2", stars=2,
                title="Review title 2", image="", created_at=datetime(2019, 10, 14), updated_at=datetime(2019, 10, 14))
    r3 = Review(restaurant_id=3, user_id=3, body="test review 3", stars=3,
                title="Review title 3", image="", created_at=datetime(2019, 10, 15), updated_at=datetime(2019, 10, 15))
    r4 = Review(restaurant_id=4, user_id=4, body="test review 4", stars=4,
                title="Review title 4", image="", created_at=datetime(2019, 10, 16), updated_at=datetime(2019, 10, 16))
    r5 = Review(restaurant_id=5, user_id=5, body="test review 5", stars=5,
                title="Review title 5", image="", created_at=datetime(2019, 10, 17), updated_at=datetime(2019, 10, 17))
    r6 = Review(restaurant_id=6, user_id=6, body="test review 6", stars=1,
                title="Review title 6", image="", created_at=datetime(2019, 10, 18), updated_at=datetime(2019, 10, 18))
    r7 = Review(restaurant_id=7, user_id=7, body="test review 7", stars=2,
                title="Review title 7", image="", created_at=datetime(2019, 10, 19), updated_at=datetime(2019, 10, 19))
    r8 = Review(restaurant_id=8, user_id=8, body="test review 8", stars=3,
                title="Review title 8", image="", created_at=datetime(2019, 10, 12), updated_at=datetime(2019, 10, 12))
    r9 = Review(restaurant_id=9, user_id=9, body="test review 9", stars=4,
                title="Review title 9", image="", created_at=datetime(2020, 1, 5), updated_at=datetime(2020, 1, 5))
    r10 = Review(restaurant_id=5, user_id=8, body="test review 10", stars=5,
                 title="Review title 10", image="", created_at=datetime(2020, 1, 5), updated_at=datetime(2020, 1, 5))
    r11 = Review(restaurant_id=9, user_id=7, body="test review 11", stars=1,
                 title="Review title 11", image="", created_at=datetime(2020, 1, 5), updated_at=datetime(2020, 1, 5))
    r12 = Review(restaurant_id=8, user_id=6, body="test review 12", stars=2,
                 title="Review title 12", image="", created_at=datetime(2020, 1, 5), updated_at=datetime(2020, 1, 5))
    r13 = Review(restaurant_id=7, user_id=5, body="test review 13", stars=3,
                 title="Review title 13", image="", created_at=datetime(2020, 1, 5), updated_at=datetime(2020, 1, 5))
    r14 = Review(restaurant_id=6, user_id=4, body="test review 14", stars=4,
                 title="Review title 14", image="", created_at=datetime(2020, 1, 5), updated_at=datetime(2020, 1, 5))
    r15 = Review(restaurant_id=5, user_id=3, body="test review 15", stars=5,
                 title="Review title 15", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))
    r16 = Review(restaurant_id=4, user_id=2, body="test review 16", stars=1,
                 title="Review title 16", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))
    r17 = Review(restaurant_id=3, user_id=1, body="test review 17", stars=2,
                 title="Review title 17", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))
    r18 = Review(restaurant_id=2, user_id=2, body="test review 18", stars=3,
                 title="Review title 18", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))
    r19 = Review(restaurant_id=1, user_id=3, body="test review 19", stars=4,
                 title="Review title 19", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))
    r20 = Review(restaurant_id=2, user_id=4, body="test review 20", stars=5,
                 title="Review title 20", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))
    r21 = Review(restaurant_id=3, user_id=5, body="test review 21", stars=1,
                 title="Review title 21", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))
    r22 = Review(restaurant_id=4, user_id=6, body="test review 22", stars=2,
                 title="Review title 22", image="", created_at=datetime(2021, 5, 17), updated_at=datetime(2021, 5, 17))

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add(r10)
    db.session.add(r11)
    db.session.add(r12)
    db.session.add(r13)
    db.session.add(r14)
    db.session.add(r15)
    db.session.add(r16)
    db.session.add(r17)
    db.session.add(r18)
    db.session.add(r19)
    db.session.add(r20)
    db.session.add(r21)
    db.session.add(r22)
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE TABLE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
