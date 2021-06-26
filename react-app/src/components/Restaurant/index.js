import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneRestaurant } from "../../store/restaurant";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantInfo from "./RestaurantInfo"
import BookingCard from "./BookingCard";
import SeachBar from "../SearchBar";
import Reviews from "./Reviews";
import PhotoGallery from "./PhotoGallery";
import "./Restaurant.css"

function Restaurant(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const restaurant_data = useSelector(state => state.restaurant.restaurant)




    return (
        <>
        <div className="search-bar-container"><SeachBar></SeachBar></div>
        <RestaurantHeader></RestaurantHeader>
        <div className="top-level-container"> 
            <div classNam="restaurant-card-container">
                <RestaurantInfo></RestaurantInfo>
                <div classnmae="photo-gallery-container"><PhotoGallery></PhotoGallery></div>
            </div>
            <div className="right-side-container">
                <div className="booking-card-container"><BookingCard></BookingCard></div>
                <div className="map-container"></div>
            </div>
        </div>
        <Reviews restaurant={restaurant_data}/>
        </>

    )
}

export default Restaurant;
