import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

export function ReviewForm({ user, restaurantId, reviewId }) {


    const [title, setTitle] = useState('')
    const [stars, setStars] = useState(0)
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')

    return (
        <div className="form-wrapper">
            <form action={`/api/restaurants/${restaurantId}/reviews/${reviewId}`} method="PUT" className="user-edit-form">
                <div>
                    <label htmlFor="title">Review Title: </label>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="stars">Star Rating: </label>
                    <input type="number" id="stars" name="stars" value={stars} onChange={(e) => setStars(e.target.value)} min={0} max={5} />
                </div>
                <div>
                    <label htmlFor="body">Tell us what you think: </label>
                    <textarea type="text" id="body" name="body" value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="image">Add an image URL: </label>
                    <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}


function Reviews({ user, setFeature }) {

    const [reviewList, setReviewList] = useState([])
    const [restaurantId, setRestaurantId] = useState();
    const [reviewId, setReviewId] = useState()

    const updateReview = (restaurant, review) => {
        setRestaurantId(restaurant)
        setReviewId(review)
        setFeature("reviewEdit")
    }

    useEffect(() => {
        if (!reviewList.length) {
            let newReviews = [];
            for (let key in user.reviews) {
                newReviews.push(user.reviews[key])
            }
            setReviewList(newReviews)
        }
    })


    return (
        <>
            <div className="review-wrapper">
                <h2>Your Reviews: </h2>
                {reviewList.map(review =>
                    <div key={review.id} className="review-body">
                        <div className="review-title">
                            <h3>{review.title}</h3>
                            <div className='rating-span'>
                                {review.stars > 0 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                                {review.stars > 1 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                                {review.stars > 2 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                                {review.stars > 3 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                                {review.stars > 4 ? <span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
                                <div className="star-rating-num"> {review.stars} Stars</div>
                            </div>
                        </div>
                        <p>{review.body}</p>
                        <button className="buttons" onClick={(e) => updateReview(review.restaurant.id, review.id)}>Edit</button>
                    </div>
                )}
            </div>
        </>
    )
}


export default Reviews;
