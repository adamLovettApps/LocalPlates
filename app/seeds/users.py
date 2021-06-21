from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    # lon1 = -122.43129
    # lat1 = 37.773972
    # geo = 'POINT({} {})'.format(lon1, lat1)
    demo = User(username='Demo', email='demo@aa.io',
                password='password', is_owner=True)


    demo2 = User(username='Demo2', email='demo2@aa.io',
                 password='password', is_owner=True)


    demo3 = User(username='Demo3', email='demo3@aa.io',
                 password='password', is_owner=True)


    demo4 = User(username='Demo4', email='demo4@aa.io',
                 password='password', is_owner=True)

    demo5 = User(username='Demo5', email='demo5@aa.io',
                 password='password', is_owner=True)

    demo6 = User(username='Demo6', email='demo6@aa.io',
                 password='password', is_owner=True)

    demo7 = User(username='Demo7', email='demo7@aa.io',
                 password='password', is_owner=True)

    demo8 = User(username='Demo8', email='demo8@aa.io',
                 password='password', is_owner=True)

    demo9 = User(username='Demo9', email='demo9@aa.io',
                 password='password', is_owner=True)

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE TABLE users CASCADE;')
    db.session.commit()
