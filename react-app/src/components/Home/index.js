import React, { useState, useEffect } from "react";
import SplashDisplay from "../SplashDisplay"
import CardScroll from "../CardScroll"
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../store/restaurant"

const getIPInfo = async () => {
        let res = await fetch('https://ipapi.co/json/');
        let ip = await res.json();
        return ip;
  }

function Home(){
    const dispatch = useDispatch();
    const restaurants = useSelector((state)=>Object.values(state.restaurant.restaurants))
    useEffect(() => {
        (async() => {
          let ip = await getIPInfo();
          await dispatch(getRestaurants(ip));

        })();
      }, [dispatch]);
    return(
        <div>
            <SplashDisplay/>
            {restaurants &&<CardScroll restaurants={restaurants}/>}
        </div>
    );
}
export default Home;
