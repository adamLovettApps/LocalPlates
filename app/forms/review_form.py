from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    body = TextAreaField("Body",
                         validators=[DataRequired()])
    stars = IntegerField("Rating", validators=[DataRequired()])
    image = StringField("Image")
    submit = SubmitField("Submit")
