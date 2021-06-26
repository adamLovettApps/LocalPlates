import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneRestaurant } from "../../../store/restaurant";
import { getRestaurantTags } from "../../../store/tags"
import StarRating from "../../StarRating";

import "./RestaurantInfo.css"

const RestaurantInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);

    const restaurant = useSelector(state => state.restaurant.restaurant)
    const tags = useSelector(state => state.tags.tags)
    let count = 0;
    useEffect(() => {
        (async () => {
            dispatch(getOneRestaurant(id))
            dispatch(getRestaurantTags(id))
            setLoaded(true);
        })();
    }, [dispatch])

    if (!loaded) {
        return null;
    }
    if (restaurant.name){
        return (

            <div className="restaurant-info-container">
                <div className="restaurant-name-container">
                    {restaurant.name}
                </div>
                <div className="hr-container"><hr className="restaurant-page-restaurant-info-divider"></hr></div>
                <div className="restaurant-page-stars-container"><StarRating rating={restaurant.star_rating} reviewNum={restaurant.review_count}></StarRating></div>
                <div className="tag-container"> 
                    {Object.keys(tags).map(key => {
                        if (count < Object.keys(tags).length -1 && count < 4 ) 
                        {
                            count++; ; 
                            return `${key} • `;} 
                        if (count < 4) {
                            count++; 
                            return `${key}`;
                        }
                    })}
                </div>
                <div className="description-container">{restaurant.description}</div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default RestaurantInfo;