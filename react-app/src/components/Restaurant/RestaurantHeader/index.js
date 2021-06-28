import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getOneRestaurant } from '../../../store/restaurant'
import { getAllFavoritesNoIP, setFavorite} from "../../../store/favorite";

import './RestaurantHeader.css'
const getIPInfo = async () => {
    let res = await fetch('https://ipapi.co/json/');
    let ip = await res.json();
    return ip;
}
const RestaurantHeader = () => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.session.user);
    const restaurant = useSelector(state => state.restaurant.restaurant);
    const favorites = useSelector(state => state.favorites.favoritesNoIp)
    const { id } = useParams();
    let favorited = false;

    useEffect(() => {
        (async() => {
            dispatch(getOneRestaurant(id));
            if (user) {
                dispatch(getAllFavoritesNoIP(user.id))
            }
            setLoaded(true);

        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }
    const addFavorite = () => {
        (async() => {
            dispatch(setFavorite(user.id, id, 1));
            dispatch(getAllFavoritesNoIP(user.id));
        })();
    }
    const removeFavorite = () => {
        (async() => {
            dispatch(setFavorite(user.id, id, 0));
            dispatch(getAllFavoritesNoIP(user.id));
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
        {console.log("FAVORIdwdwdwdRES", favorites)}

        

        if (user) {

            if (favorites) {
                {Object.keys(favorites).forEach((key) => {
                    console.log("ID", favorites[key].restaurant_id, id)
                    if (favorites[key].restaurant_id == id) {
                        favorited = true;
                        console.log("TRUE!!!")
                    }
                    console.log("HERE")
                    console.log(favorited)
                })}
            
                if (favorited) {
                    return (
                        <div className="restaurant-header"><img src={url}/>
                        <div><button onClick={removeFavorite} className="remove-favorites-button">Remove Favorite</button></div>
                        </div>
                    )
                } else {
                    return ( <div className="restaurant-header"><img src={url}/><div><button onClick={addFavorite} className="add-favorites-button">Add Favorite</button></div></div>)
                }
            } else {
                return null;
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
