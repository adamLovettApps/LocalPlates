from app.models import db, Favorite


def seed_favorites():
    fav1 = Favorite(user_id=121, restaurant_id=3)
    fav2 = Favorite(user_id=121, restaurant_id=4)
    fav3 = Favorite(user_id=121, restaurant_id=5)
    fav4 = Favorite(user_id=121, restaurant_id=8)
    fav5 = Favorite(user_id=121, restaurant_id=78)
    fav6 = Favorite(user_id=121, restaurant_id=17)
    fav6 = Favorite(user_id=121, restaurant_id=101)
    fav7 = Favorite(user_id=121, restaurant_id=102)
    fav8 = Favorite(user_id=121, restaurant_id=88)
    fav9 = Favorite(user_id=121, restaurant_id=77)
    fav10 = Favorite(user_id=121, restaurant_id=55)
    fav11 = Favorite(user_id=121, restaurant_id=22)

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
