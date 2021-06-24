from app.models import db, Tag

def seed_tags():

    tag1 = Tag(type="Italian")
    tag2 = Tag(type="Indian")
    tag3 = Tag(type="Hispanic")
    tag4 = Tag(type="Sushi")
    tag5 = Tag(type="Burgers")
    tag6 = Tag(type="Vegetarian")
    tag7 = Tag(type="Barbecue")
    tag8 = Tag(type="Pizza")
    tag9 = Tag(type="Outdoor Seating")
    tag10 = Tag(type="Delivery")
    tag11 = Tag(type="Small Plates")
    tag12 = Tag(type="American")
    tag13 = Tag(type="Wine List")
    tag14 = Tag(type="Takeout")
    tag15 = Tag(type="Asian")


    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)
    db.session.add(tag9)
    db.session.add(tag10)
    db.session.add(tag11)
    db.session.add(tag12)
    db.session.add(tag13)
    db.session.add(tag14)
    db.session.add(tag15)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
