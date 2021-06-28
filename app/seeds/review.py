from app.models import db, Review
from datetime import datetime
from .review_seed_data import review_seeds
import random

def seed_reviews():


    for i in range(120):
        review_order = random.sample(range(10),10)
        for r in range(10):
            db.session.add(Review(restaurant_id=(i+1), user_id=121,body=review_seeds[review_order[r]]["body"], stars=review_seeds[review_order[r]]["stars"],title=review_seeds[review_order[r]]["title"],image="",created_at=datetime(2019, 10, 13), updated_at=datetime(2019, 10, 13)))
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE TABLE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
