from app.models import db, Restaurant

# Adds a demo user, you can add other users here if you want


def seed_restaurants():
    # lon1 = -122.43129
    # lat1 = 37.773972
    # geo = 'POINT({} {})'.format(lon1, lat1)
    demo = Restaurant(name='Daniel', address="60 E 65th St", city="New York", state="New York", zipcode=10065, phone_number=2122880033, owner_id=1, hours='{"Mon" : "closed", "Tue" : "5-9PM", "Wed" : "5-9PM", "Thur" : "5-9PM", "Fri" : "5-9PM", "Sat" : "5-9PM", "Sun" : "5-9PM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Daniel Boulud's elegant French flagship where jackets are required & expense accounts come in handy.", longitude=40.769191, latitude=-73.967084, geo='POINT({} {})'.format(40.769191, -73.967084))  # in module: import json    Then, restaurant hours = str(json.loads(restaurant.hours)).  This returns: {Mon:"9:00 AM to 10:00 PM"], T:...}

    demo2 = Restaurant(name='ATOMIX', address="104 E 30th St", city="New York", state="New York", zipcode=10016, phone_number=1234567890, owner_id=2, hours='{"Mon" : "closed", "Tue" : "closed", "Wed" : "5:30 - 11PM", "Thur" : "5:30 - 11PM", "Fri" : "5:30 - 11PM", "Sat" : "5:30 - 11PM", "Sun" : "5:30 - 11PM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Upscale Korean restaurant offering a chef's tasting menu with beverage pairings in chic environs.", longitude=40.7502085, latitude=-73.975324, geo='POINT({} {})'.format(40.7502081, -73.975324))

    demo3 = Restaurant(name='Jose Luis', address="186 Avenue B", city="New York", state="New York", zipcode=10009, phone_number=6467070746, owner_id=3, hours='{"Mon" : "4 - 11PM", "Tue" : "4 - 11PM", "Wed" : "4 - 11PM", "Thur" : "4 - 11PM", "Fri" : "4 - 11PM", "Sat" : "1 - 11PM", "Sun" : "4 - 11PM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Tapas, paellas & pasta are served in this relaxed restaurant that has snug surroundings & a patio.", longitude=40.735121, latitude=-73.971547, geo='POINT({} {})'.format(40.735121, -73.971547))

    demo4 = Restaurant(name='Crown Shy', address="70 Pine St", city="New York", state="New York", zipcode=10005, phone_number=2125171932, owner_id=4, hours='{"Mon" : "5:30PM - 12AM", "Tue" : "5:30PM - 12AM", "Wed" : "5:30PM - 12AM", "Thur" : "5:30PM - 12AM", "Fri" : "5:30PM - 12AM", "Sat" : "11AM - 2PM, 5:30PM - 12AM", "Sun" : "11AM - 2PM, 5:30PM - 12AM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Polished, new American restaurant with global influences inside spacious room with high ceilings.", longitude=40.713395, latitude=-74.007596, geo='POINT({} {})'.format(40.713395, -74.007596))

    demo5 = Restaurant(name="L'Artusi", address="228 W 10th St", city="New York", state="New York", zipcode=10014, phone_number=2122555757, owner_id=1, hours='{"Mon" : "12 - 11PM", "Tue" : "12 - 11PM", "Wed" : "12 - 11PM", "Thur" : "12 - 11PM", "Fri" : "12 - 11PM", "Sat" : "12 - 11PM", "Sun" : "12 - 11PM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Italian small plates are matched by an extensive wine list at this bi-level restaurant.", longitude=40.738893, latitude=-74.005536, geo='POINT({} {})'.format(40.7388, -74.005536))

    demo6 = Restaurant(name='Lucciola', address="621 Amsterdam Ave", city="New York", state="New York", zipcode=10024, phone_number=3475361335, owner_id=2, hours='{"Mon" : "closed", "Tue" : "5 - 10:30PM", "Wed" : "5 - 10:30PM", "Thur" : "5 - 10:30PM", "Fri" : "5 - 11PM", "Sat" : "5 - 11PM", "Sun" : "5 - 10:30PM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Refined eatery offering classic Italian dishes, seafood & steak, plus a robust wine list.", longitude=40.794018, latitude=-73.966054, geo='POINT({} {})'.format(40.794018, -73.966054))

    demo7 = Restaurant(name='Gramercy Tavern', address="42 E 20th St", city="New York", state="New York", zipcode=10003, phone_number=2124770777, owner_id=3, hours='{"Mon" : "5 10PM", "Tue" : "5 10PM", "Wed" : "5 10PM", "Thur" : "5 10:30PM", "Fri" : "11:30AM - 2:30PM, 5 - 10PM", "Sat" : "11:30AM - 2:30PM, 5 - 10PM", "Sun" : "11:30AM - 2:30PM, 5 - 10PM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Danny Meyer's Flatiron District tavern with a fixed-price-only dining room & a bustling bar area.", longitude=40.7405844, latitude=-73.983735, geo='POINT({} {})'.format(40.7405841, -73.983735))

    demo8 = Restaurant(name='K Rico Steakhouse', address="772 9th Ave", city="New York", state="New York", zipcode=10019, phone_number=2127579393, owner_id=4, hours='{"Mon" : "", "Tue" : "", "Wed" : "", "Thur" : "", "Fri" : "", "Sat" : "", "Sun" : ""}', total_bookings=0, star_rating=0, review_count=0,
                      description="Upscale place for South American steaks & other Latin dishes, with a patio & sidewalk seating.", longitude=40.764811, latitude=-73.987846, geo='POINT({} {})'.format(40.764811, -73.987846))

    demo9 = Restaurant(name='Republique', address="624 South La Brea Ave", city="Los Angeles", state="California", zipcode=90036, phone_number=3103626115, owner_id=1, hours='{"Mon" : "8AM - 2PM", "Tue" : "8AM - 2PM", "Wed" : "8AM - 2PM, 6 - 9PM", "Thur" : "8AM - 2PM, 6 - 9PM", "Fri" : "8AM - 2PM, 5 - 9PM", "Sat" : "8AM - 2PM, 5 - 9PM", "Sun" : "8AM - 2PM, 5 - 9PM"}', total_bookings=0, star_rating=0, review_count=0,
                      description="Modern French plates served in a striking space with communal tables, plus a bakery & cocktail bar.", longitude=34.2526965, latitude=-118.29937, geo='POINT({} {})'.format(34.2526969, -118.29937))


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


def undo_restaurants():
    db.session.execute('TRUNCATE CASCADE restaurants;')
    db.session.commit()
