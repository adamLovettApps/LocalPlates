import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneRestaurant } from "../../store/restaurant";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantInfo from "./RestaurantInfo"
import SeachBar from "../SearchBar"
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
        <RestaurantInfo></RestaurantInfo>
        </>

    )
}

export default Restaurant;
