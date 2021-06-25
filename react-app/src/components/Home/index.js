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
    const italian = useSelector((state)=>Object.values(state.restaurant.italian))
    const outdoor = useSelector((state)=>Object.values(state.restaurant.outdoor))
    const hispanic = useSelector((state)=>Object.values(state.restaurant.hispanic))
    const user = useSelector(state => state.session.user);
    if (user){
        console.log('user authenticated')
    }
    let placeholderTitle = "Tag Title Goes here"
    useEffect(() => {
        (async() => {
          let ip = await getIPInfo();

        //   await dispatch(getRestaurants("all"));
          await dispatch(getRestaurants("italian",ip));
          await dispatch(getRestaurants("outdoor",ip));
          await dispatch(getRestaurants("hispanic",ip));

        })();
      }, [dispatch]);
    return(
        <div>
            <SplashDisplay/>
            {outdoor &&<CardScroll order={1} collectionTitle={"Outdoor Seating"} restaurants={outdoor}/>}
            {italian &&<CardScroll order={2}collectionTitle={"Italian Food"} restaurants={italian}/>}
            {hispanic &&<CardScroll order={3}collectionTitle={"Hispanic Cuisine"} restaurants={hispanic}/>}
            
        </div>
    );
}
export default Home;
