from app.models import db, Photo
from .user_image_data import image_seeds
import random

def seed_photos():
    for i in range((len(image_seeds))):
        photo_amount = 15
        photo_selection = random.sample(range(len(image_seeds)),photo_amount)
        for p in range(photo_amount):
            db.session.add(Photo(image=image_seeds[photo_selection[p]]['url'], restaurant_id=(i+1), caption=" "))

def undo_photos():
    db.session.execute('TRUNCATE TABLE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
