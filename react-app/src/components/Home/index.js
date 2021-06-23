import React, { useState, useEffect } from "react";
import SplashDisplay from "../SplashDisplay"
import CardScroll from "../CardScroll"
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../store/restaurant"
function Home(){
    const dispatch = useDispatch();
    const restaurants = useSelector((state)=>Object.values(state.restaurant.restaurants))
    const user = useSelector(state => state.session.user);
    if (user){
        console.log('user authenticated')
    }
    let placeholderTitle = "Tag Title Goes here"
    useEffect(() => {
        (async() => {
            if (user){
              console.log('user authenticated')
          }
          await dispatch(getRestaurants("all"));
        })();
      }, [dispatch]);
    return(
        <div>
            <SplashDisplay/>
            {restaurants &&<CardScroll collectionTitle={placeholderTitle} restaurants={restaurants}/>}
            {restaurants &&<CardScroll collectionTitle={placeholderTitle} restaurants={restaurants}/>}
        </div>
    );
}
export default Home;
