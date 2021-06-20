from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    lon1 = -122.43129
    lat1 = 37.773972
    geo = 'POINT({} {})'.format(lon1, lat1)
    demo = User(username='SF', email='demo@aa.io',
                password='password', latitude=lat1, longitude=lon1, geo=geo)

    lon2 = -118.243683
    lat2 = 34.052235
    geo2 = 'POINT({} {})'.format(lon2, lat2)
    demo2 = User(username='LA', email='demo2@aa.io',
                 password='password', latitude=lat2, longitude=lon1, geo=geo2)

    lon3 = -122.335167
    lat3 = 47.608013
    geo3 = 'POINT({} {})'.format(lon3, lat3)
    demo3 = User(username='Seattle', email='demo3@aa.io',
                 password='password', latitude=lat3, longitude=lon3, geo=geo3)

    lon4 = -122.271111
    lat4 = 37.804363
    geo4 = 'POINT({} {})'.format(lon4, lat4)
    demo4 = User(username='Oakland', email='demo4@aa.io',
                 password='password', latitude=lat4, longitude=lon4, geo=geo4)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
