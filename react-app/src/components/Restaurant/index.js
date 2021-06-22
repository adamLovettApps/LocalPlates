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

    const [currentRestaurant, setRestaurant] = useState();
    const [restaurantPics, setRestaurantPics] = useState();

    useEffect(() => {
        dispatch(getRestaurant(id));
    }, [dispatch, id])

    useEffect(() => {
        if (!currentRestaurant) {
            setRestaurant(restaurant);
        }
    }, [currentRestaurant])


    return (
        <div className="body-wrapper">
            <div className="gallery-slider">

            </div>
            <div className="title-card">
                <h1>{currentRestaurant.name}</h1>
            </div>
            <div className="reservation-wrapper">
                <div className="reservation-card">
                    <input className="party_size" />
                    <button>Reserve Now</button>
                </div>
                <div className="phone-details">
                    <p>To order delivery or takeout call: {currentRestaurant.phone_number}</p>
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
                            
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    )
}
