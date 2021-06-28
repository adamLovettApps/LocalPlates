from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tags import seed_tags, undo_tags
from .restaurants import seed_restaurants, undo_restaurants
from .favorites import seed_favorites, undo_favorites
from .review import seed_reviews, undo_reviews
from .bookings import seed_bookings, undo_bookings
from .photos import seed_photos, undo_photos


from .restaurant_tags import seed_restaurant_tags, undo_restaurant_tags

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_tags()
    seed_restaurants()
    seed_favorites()
    seed_reviews()
    seed_bookings()
    seed_photos()
    seed_restaurant_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_photos()
    undo_restaurant_tags()
    undo_restaurants()
    undo_users()
    undo_tags()
    undo_favorites()
    undo_reviews()
    undo_bookings()
    # Add other undo functions here
