from flask import Blueprint, request
from app.models import db, Restaurant, Tag
import requests
import json
import os
from sqlalchemy.sql import text
from sqlalchemy import func
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)


@search_routes.route('/<searchString>/<ip>')
def get_search_results(searchString, ip):

    REACT_APP_IPAPI_KEY = os.environ.get('REACT_APP_IPAPI_KEY')
    res = requests.get(
        f"https://api.ipapi.com/api/{ip}?access_key={REACT_APP_IPAPI_KEY}")
    location = res.json()
    searchString = searchString[1:]

    latitude = location["latitude"]
    longitude = location["longitude"]
    print("LOCAAAAAAATION!!!!!!!!!!!!!", location["latitude"])
    results = db.session.execute(
        f"SELECT * FROM restaurants FULL JOIN users ON users.id=restaurants.owner_id FULL JOIN restaurant_tags ON restaurant_tags.restaurant_id=restaurants.id FULL JOIN tags ON tags.id=restaurant_tags.tag_id FULL JOIN reviews ON reviews.restaurant_id=restaurants.id WHERE restaurants.name ILIKE \'%{searchString}%\' OR restaurants.description ILIKE \'%{searchString}%\' OR restaurants.city ILIKE \'%{searchString}%\' OR restaurants.state ILIKE \'%{searchString}%\' OR tags.type ILIKE \'%{searchString}%\' ORDER BY ST_Distance(geo, ST_MakePoint({latitude}, {longitude}):: geography) LIMIT 10")
    rows = results.fetchall()
    data = {}
    for row in rows:
        print(row)
        if row[0] not in data:
            if row[25] is not None:
                data[row[0]] = {"name": row[1], "address": row[2], "city": row[3],
                                "state": row[4], "phone_number": row[6],
                                "bookings": row[9], "rating": row[10],
                                "reviews": row[11], "photo": row[20],
                                "tags": {"1": row[25]}, "review": row[29]}
            else:
                data[row[0]] = {"name": row[1], "address": row[2], "city": row[3],
                                "state": row[4], "phone_number": row[6],
                                "bookings": row[9], "rating": row[10],
                                "reviews": row[11], "photo": row[20],
                                "tags": {}, "review": row[29]}
        else:
            prev_tags = data[row[0]]["tags"]
            new_tag_num = len(prev_tags) + 1
            new_tag = {f"'{new_tag_num}'": row[25]}
            new_tags = {}
            new_tags.update(prev_tags)
            new_tags.update(new_tag)
            data[row[0]] = {"name": row[1], "address": row[2], "city": row[3],
                            "state": row[4], "phone_number": row[6],
                            "bookings": row[9], "rating": row[10],
                            "reviews": row[11], "photo": row[20],
                            "tags": new_tags, "review": row[29]}

    return data
