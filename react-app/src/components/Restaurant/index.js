import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { getOneRestaurant } from "../../store/restaurant";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantInfo from "./RestaurantInfo"
import BookingCard from "./BookingCard";
import SearchBar from "../SearchBar";
import Reviews from "./Reviews";
import PhotoGallery from "./PhotoGallery";
import Map from "./Map";
import "./Restaurant.css"

function Restaurant(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const restaurant_data = useSelector(state => state.restaurant.restaurant)


    if (sessionUser) {
        if (sessionUser.is_owner) {

            return <Redirect to={`/restaurantmanagement/${sessionUser.restaurant_id}`}></Redirect>
        }
    }


    if (restaurant_data){
    return (
        <>
        <div className="search-bar-container"><SearchBar></SearchBar></div>
        <RestaurantHeader></RestaurantHeader>
        <div className="top-level-container">
            <div classNam="restaurant-card-container">
                <RestaurantInfo></RestaurantInfo>
                <div classnmae="photo-gallery-container"><PhotoGallery></PhotoGallery></div>
            </div>
            <div className="right-side-container">
                <div className="booking-container"><BookingCard></BookingCard></div>
                <div className="map-container"><Map restaurant={restaurant_data}></Map></div>
                <div className="address-and-phone-num-container">
                    <div >{restaurant_data.address}</div>
                    <div className="city-state-display">{restaurant_data.city}, {restaurant_data.state} {restaurant_data.zipcode}</div>
                    <div className="phone-num-display">Call {restaurant_data.phone_number} for takeout</div>
                </div>
            </div>
        </div>
        <div className="review-component-container">
        <Reviews restaurant={restaurant_data}/>
        </div>
        </>

    )
    } else {
        return null;
    }
}

export default Restaurant;
