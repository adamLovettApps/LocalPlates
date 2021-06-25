import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { addReview, editReview, deleteReview } from "../../store/restaurant"
import './Restaurant.css';

const ReviewForm = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [stars, setStars] = useState(0)
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])

    const submitReview = async (e) => {
        e.preventDefault();
        dispatch(addReview({ restaurant_id: id, user_id: user.id, title, body, stars, image}))
    }

    useEffect(() => {
        const ers = [];
        if (!title) {
            ers.push("Please provide a title for your review.")
        }
        if (!body) {
            ers.push("Please add your review.")
        }
        if (!stars) {
            ers.push("Please provide a rating.")
        }
        setErrors(ers)
    }, [title, body, stars])



    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    const updateStars = (e) => {
        setStars(e.target.value);
    };

    const updateImage = (e) => {
        setImage(e.target.value);
    };

    return (
        <div className="review-form-wrapper">
            <h3>Post A Review!</h3>
            {errors.map(error => <li key={error}>{error}</li>)}
            <form action={`/api/restaurants/${id}/review`} method="POST" onSubmit={submitReview}>
                <input hidden name="csrf_token"/>
                <label htmlFor="title">Title: </label>
                <input name="title" id="title" value={title} onChange={(e) => updateTitle(e)} />
                <label htmlFor="body">Body: </label>
                <input name="body" id="body" value={body} onChange={(e) => updateBody(e)} />
                <label htmlFor="stars">Star Rating: </label>
                <input name="stars" id="stars" type="number" max={5} min={0}value={stars} onChange={(e) => updateStars(e)} />
                <label htmlFor="image">Image URL: </label>
                <input name="image" id="image" value={image} onChange={(e) => updateImage(e)} />
                <button disabled={errors.length}>Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm;
