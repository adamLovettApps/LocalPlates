from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    title = StringField("Review headline.", validators=[DataRequired()])
    body = TextAreaField("Tell us about your experience.",
                         validators=[DataRequired()])
    stars = IntegerField("how many stars?", validators=[DataRequired()])
    image = StringField("Image URL: ")
    submit = SubmitField("Submit")
