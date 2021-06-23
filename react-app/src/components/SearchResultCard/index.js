import React from "react";
import StarRating from "../StarRating"
import "./SearchResultCard.css";


const SearchRestultCard = (restaurant) => {
    if (restaurant.restaurant) {
        const baseURL = restaurant.restaurant.photo.split('/')[3];;
        console.log(baseURL)
        const imageRequest = JSON.stringify({
                        bucket: "localplates",
                        key: baseURL,
                        edits: {
                            
                            resize: {
                                width: 205,
                                height:205,
                                fit: "cover"
                            }
                        }
                    })
        const encoded = btoa(imageRequest);
        const url = `https://d3tzg5ntrh3zgq.cloudfront.net/${encoded}`;
        let count = 0;
        return (
            <>
            <div className="search-result-card-container">
                <div className="photo-container"><img src={url} className="restaurant-main-photo"></img></div>
                <div className="name-container"><h2>{restaurant.restaurant.name}</h2></div>
                <div className="location-container">{restaurant.restaurant.city}, {restaurant.restaurant.state}</div>
                <div className="stars-container"><StarRating rating={restaurant.restaurant.rating}></StarRating> <div className="review-count-container">{restaurant.restaurant.reviews} total reviews</div></div>
                <div className="tags-container">{restaurant.restaurant.tags.map(tag => {if (count < restaurant.restaurant.tags.length -1 && count < 4 ) {count++; ; return `${tag} • `;} if (count < 4) {count++; return `${tag}`;}} )}</div>
                <div className="book-container"><button className="booking-button">Book Now</button> <div className="booking-count-container">Booked {restaurant.restaurant.bookings} times previously.</div></div>
                <div className="review-container">{restaurant.restaurant.review ? `"${restaurant.restaurant.review}"` : null}</div>
            </div>
            </>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default SearchRestultCard;