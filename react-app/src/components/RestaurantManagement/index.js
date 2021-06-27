import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RestaurantHeader from "./RestaurantHeader";
import RestaurantInfo from "./RestaurantInfo";
import Bookings from "./Bookings"
import "./RestaurantManagement.css"

const RestaurantManagement = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    return (<>
        <RestaurantHeader></RestaurantHeader>
        <RestaurantInfo></RestaurantInfo>
        <Bookings></Bookings>
        </>
    )
}

export default RestaurantManagement;