from app.models import db, restaurant_tags


def seed_restaurant_tags():
    # group1 =

    db.session.execute(restaurant_tags.insert().values(tag_id=1,restaurant_id=1));
    db.session.execute(restaurant_tags.insert().values(tag_id=1,restaurant_id=2));
    db.session.execute(restaurant_tags.insert().values(tag_id=1,restaurant_id=3));
    db.session.commit();


def undo_restaurant_tags():


    db.session.execute('TRUNCATE restaurant_tags RESTART IDENTITY CASCADE;');
    db.session.commit();
