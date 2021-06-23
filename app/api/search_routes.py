from flask import Blueprint, request
from app.models import db, Restaurant, Tag
import requests
import json
import os
from sqlalchemy.sql import text

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
        f"SELECT * FROM restaurants FULL JOIN restaurant_tags ON restaurant_tags.restaurant_id=restaurants.id FULL JOIN tags ON tags.id=restaurant_tags.tag_id WHERE restaurants.name ILIKE \'%{searchString}%\' OR restaurants.description ILIKE \'%{searchString}%\' OR restaurants.city ILIKE \'%{searchString}%\' OR restaurants.state ILIKE \'%{searchString}%\' OR tags.type ILIKE \'%{searchString}%\' ORDER BY ST_Distance(geo, ST_MakePoint({latitude}, {longitude}):: geography) LIMIT 10")
    rows = results.fetchall()
    print("RESULTS!!!!!!!!!", rows)
    return {}
