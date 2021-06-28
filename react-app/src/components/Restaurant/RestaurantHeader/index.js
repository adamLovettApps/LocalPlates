import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getOneRestaurant } from '../../../store/restaurant'
import {getAllFavorites, setFavorite} from "../../../store/favorite";

import './RestaurantHeader.css'

const RestaurantHeader = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    let favorite = false;
    const user = useSelector(state => state.session.user);
    const restaurant = useSelector(state => state.restaurant.restaurant);
    const favorites = useSelector(state => state.favorites.favorites)
    const { id } = useParams();

    useEffect(() => {
        (async() => {
            dispatch(getOneRestaurant(id));
            if (user) {
                dispatch(getAllFavorites(user.id))
            }
            setLoaded(true);

        })();
        
    }, []);

    if (!loaded) {
        return null;
    }

    const addFavorite = () => {
        (async() => {
            dispatch(setFavorite(user.id, id, 1));
        })();
    }

    const removeFavorite = () => {
        (async() => {
            dispatch(setFavorite(user.id, id, 0));
        })();
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
        {console.log("FAVORIRES", favorites)}
        {Object.keys(favorites).forEach((key) => {
            if (favorites[key].restaurant_id === 1) {
                favorite = true;
            }
        })}

        if (user) {
            if (favorite) {
                return (
                    <div className="restaurant-header"><img src={url}/>
                    <div><button onClick={removeFavorite} className="remove-favorites-button">Remove Favorite</button></div>
                    </div>
                )
            } else {
                return ( <div className="restaurant-header"><img src={url}/><div><button onClick={addFavorite} className="add-favorites-button">Add Favorite</button></div></div>)
            }
        } else {
            return (
                <div className="restaurant-header"><img src={url}/></div>
            )
        }
    } else {
        return null;
    }

}


export default RestaurantHeader;