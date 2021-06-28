from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != current_user.id:
        raise ValidationError("Please choose a valid email address.")


class UserEditForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    profile_photo = StringField('profile_photo', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
