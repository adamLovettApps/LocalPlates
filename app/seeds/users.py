from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    # lon1 = -122.43129
    # lat1 = 37.773972
    # geo = 'POINT({} {})'.format(lon1, lat1)
    demo = User(username='Demo', email='demo@aa.io',
                password='password', is_owner=False)


    demo2 = User(username='Demo 2', email='demo2@aa.io',
                 password='password', is_owner=False)


    demo3 = User(username='Demo 3', email='demo3@aa.io',
                 password='password', is_owner=False)


    demo4 = User(username='Demo 4', email='demo4@aa.io',
                 password='password', is_owner=False)

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
