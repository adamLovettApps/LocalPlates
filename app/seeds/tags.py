from app.models import db, Tag

def seed_tags():

    tag = Tag(type="Italian")
    tag2 = Tag(type="Indian")
    tag3 = Tag(type="Mexican")
    tag4 = Tag(type="Sushi")

    db.session.add(tag)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
