from flask import Blueprint, request
from app.models import db, Restaurant

search_routes = Blueprint('search', __name__)


@search_routes.route('/')
def get_search_results():
    return
