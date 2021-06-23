from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    restaurant_id = IntegerField("restaurant_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    body = TextAreaField("body",
                         validators=[DataRequired()])
    stars = IntegerField("rating", validators=[DataRequired()])
    image = StringField("image")
    submit = SubmitField("submit")
