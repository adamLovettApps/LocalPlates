from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
from .user_image_data import image_seeds
fake = Faker()
# Adds a demo user, you can add other users here if you want
def seed_users():
    # lon1 = -122.43129
    # lat1 = 37.773972
    # geo = 'POINT({} {})'.format(lon1, lat1)

    # creating 200 restaurant owners
    for i in range(60):
        username = fake.unique.name()
        email= f'restuarantEmail{i}@App_Academy.io'
        password= f'password{i}'
        db.session.add(User(username=username,email=email,password=password,profile_photo=image_seeds[i]["url"],is_owner=True))
    db.session.add(User(username="Demo User",email="fake@email.com",password="password",is_owner=False))

        
        
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE TABLE users RESTART IDENTITY CASCADE;')
    db.session.commit()
