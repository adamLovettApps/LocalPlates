import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getOneRestaurant } from '../../../store/restaurant'
import './RestaurantHeader.css'

const RestaurantHeader = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const restaurant = useSelector(state => state.restaurant.restaurant);
    const { id } = useParams();

    useEffect(() => {
        (async() => {
            dispatch(getOneRestaurant(id));

            setLoaded(true);

        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    if (restaurant.profile_photo){
        
        const baseURL = restaurant.profile_photo.split('/')[3];;
            const imageRequest = JSON.stringify({
                            bucket: "localplates",
                            key: baseURL,
                            edits: {
                                
                                resize: {
                                    width: 1600,
                                    height:306,
                                    fit: "cover"
                                }
                            }
                        })
            const encoded = btoa(imageRequest);
            const url = `https://d3tzg5ntrh3zgq.cloudfront.net/${encoded}`;

        return (
            <div className="restaurant-header"><img src={url}/></div>
        )
    } else {
        return null;
    }

}


export default RestaurantHeader;