import React, { useState, useEffect } from "react";
import SplashDisplay from "../SplashDisplay"
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../store/restaurant"
function Home(){
    const dispatch = useDispatch();
    const restaurants = useSelector((state)=>Object.values(state.restaurant.restaurants))
    useEffect(() => {
        (async() => {
          await dispatch(getRestaurants());

        })();
      }, [dispatch]);
    return(
        <div>
            <SplashDisplay/>
            {restaurants && restaurants.map((restaurant,index)=>(
                <div>{restaurant.name} </div>

            ))}
        </div>
    );
}
export default Home;
