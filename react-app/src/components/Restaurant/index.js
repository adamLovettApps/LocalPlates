import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneRestaurant } from "../../store/restaurant";
import ReviewForm from "./review_form";

const Restaurant = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const data = useSelector(state => state.restaurant)
    const [reviews, setReviews] = useState(data.restaurant_data.reviews);
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
        dispatch(getOneRestaurant(id));
        if (!data.restaurant_data) {
            setReviews(data.restaurant_data.reviews)
        }
    }, [dispatch, id])

    useEffect(() => {
        if (!data.restaurant) {
            getOneRestaurant(id);
        }
    }, [data])



    return (
        <div className="body-wrapper">
            <div className="gallery-slider">
                <p>Set gallery images here</p>
            </div>
            <div className="title-card">
                <h1>{data.restaurant.name}</h1>
                <div className="restaurant-details">
                    <div>
                        <div>
                            {data.restaurant.star_rating}
                        </div>
                        <div>{data.restaurant.review_count}</div>
                    </div>
                    <div>
                       <div>"Tag 1"</div>
                       <div>"Tag 2"</div>
                       <div>"Tag 3"</div>
                    </div>
                </div>
            </div>
            <div className="reservation-wrapper">
                <div className="reservation-card">
                    <input className="party_size" />
                    <button>Reserve Now</button>
                </div>
                <div className="phone-details">
                    <p>To order delivery or takeout call: {data.restaurant.phone_number}</p>
                </div>
            </div>
            <div className="review-wrapper">
                <div className="section-title">
                    <h3>Reviews</h3>
                    <button onClick={() => setIsHidden(!isHidden)} disabled={!isHidden}>Submit Review</button>
                    <div hidden={isHidden}>
                        <ReviewForm />
                    </div>
                </div>
                {reviews && reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <h4>{review.title}</h4>
                            <div>{review.stars}</div>
                            <div>{review.updated_at}</div>
                        </div>
                        <div className="review-body">
                            <div>{review.image}</div>
                            <div>{review.body}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Restaurant;
