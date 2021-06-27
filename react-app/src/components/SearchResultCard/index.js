import React, { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating"
import "./SearchResultCard.css";


function trimString( review, useWordBoundary ){
    if (review.length <= 145) { return review; }
    const subString = review.substr(0, 144); // the original check
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "...";
    };

const SearchRestultCard = (restaurant) => {
    console.log("SEARCH RESULT ",restaurant)
    if (restaurant.restaurant) {
        console.log("PHOTO THATS A PROBLEM",restaurant.restaurant.photo);
        const baseURL = restaurant.restaurant.photo.split('/')[3];;
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

        if (restaurant.restaurant.review) {
            restaurant.restaurant.review = trimString(restaurant.restaurant.review);
        }

        let count = 0;
        console.log("RES ID", restaurant.restaurant.id)
        return (
            <>
            <div className="search-result-card-container">
                <div className="photo-container"><Link className="restaurant-page-link" to={`/restaurants/${restaurant.restaurant.id}`}><img src={url} className="restaurant-main-photo"></img></Link></div>
                <div className="name-container"><Link className="restaurant-page-link" to={`/restaurants/${restaurant.restaurant.id}`}><h2>{restaurant.restaurant.name}</h2></Link></div>
                <div className="location-container">{restaurant.restaurant.city}, {restaurant.restaurant.state}</div>
                <div className="stars-container"><StarRating rating={restaurant.restaurant.rating} reviewNum={restaurant.restaurant.reviews} ></StarRating></div>
                <div className="tags-container">{restaurant.restaurant.tags.map(tag => {if (count < restaurant.restaurant.tags.length -1 && count < 4 ) {count++; ; return `${tag} • `;} if (count < 4) {count++; return `${tag}`;}} )}</div>
                <div className="book-container"><Link to={`/restaurants/${restaurant.id}}`}><button className="booking-button">Book Now</button></Link> <div className="booking-count-container">Booked {restaurant.restaurant.bookings} times previously.</div></div>
                <div className="search-review-container">{restaurant.restaurant.review ? `"${restaurant.restaurant.review}"` : null}</div>
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
