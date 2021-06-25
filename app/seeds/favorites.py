from app.models import db, Favorite


def seed_favorites():
    fav1 = Favorite(user_id=1, restaurant_id=2)
    fav2 = Favorite(user_id=2, restaurant_id=2)
    fav3 = Favorite(user_id=3, restaurant_id=2)
    fav4 = Favorite(user_id=4, restaurant_id=2)
    fav5 = Favorite(user_id=5, restaurant_id=2)
    fav6 = Favorite(user_id=6, restaurant_id=2)
    fav6 = Favorite(user_id=7, restaurant_id=2)
    fav7 = Favorite(user_id=8, restaurant_id=2)
    fav8 = Favorite(user_id=9, restaurant_id=2)
    fav9 = Favorite(user_id=9, restaurant_id=1)
    fav10 = Favorite(user_id=8, restaurant_id=1)
    fav11 = Favorite(user_id=7, restaurant_id=1)

    db.session.add(fav1)
    db.session.add(fav2)
    db.session.add(fav3)
    db.session.add(fav4)
    db.session.add(fav5)
    db.session.add(fav6)
    db.session.add(fav7)
    db.session.add(fav8)
    db.session.add(fav9)
    db.session.add(fav10)
    db.session.add(fav11)
    db.session.commit()


def undo_favorites():
    db.session.execute('TRUNCATE TABLE favorites RESTART IDENTITY CASCADE;')
    db.session.commit()
