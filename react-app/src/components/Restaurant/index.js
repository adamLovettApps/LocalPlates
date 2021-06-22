import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRestaurant } from "../../store/restaurant";

const Restaurant = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const restaurant = useSelector(state => state.restaurant)

    const [restaurantPics, setRestaurantPics] = useState();
    const [reviews, setReviews] = useState(restaurant.reviews);

    useEffect(() => {
        dispatch(getRestaurant(id));
    }, [dispatch, id])

    useEffect(() => {
        if (!restaurant) {
            setRestaurant(restaurant);
        }
    }, [restaurant])


    return (
        <div className="body-wrapper">
            <div className="gallery-slider">
                Set gallery images here
            </div>
            <div className="title-card">
                <h1>{restaurant.name}</h1>
            </div>
            <div className="reservation-wrapper">
                <div className="reservation-card">
                    <input className="party_size" />
                    <button>Reserve Now</button>
                </div>
                <div className="phone-details">
                    <p>To order delivery or takeout call: {restaurant.phone_number}</p>
                </div>
            </div>
            <div className="review-wrapper">
                <div className="section-title">
                    <h3>Reviews</h3>
                    <button>Submit Review</button>
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
