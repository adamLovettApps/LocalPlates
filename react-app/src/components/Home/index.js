import React, { useState, useEffect } from "react";
import SplashDisplay from "../SplashDisplay"
import CardScroll from "../CardScroll"
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../store/restaurant"
function Home(){
    const dispatch = useDispatch();
    const restaurants = useSelector((state)=>Object.values(state.restaurant.restaurants))
    const italian = useSelector((state)=>Object.values(state.restaurant.italian))
    const indian = useSelector((state)=>Object.values(state.restaurant.indian))
    const user = useSelector(state => state.session.user);
    if (user){
        console.log('user authenticated')
    }
    let placeholderTitle = "Tag Title Goes here"
    useEffect(() => {
        (async() => {

        //   await dispatch(getRestaurants("all"));
          await dispatch(getRestaurants("italian"));
          await dispatch(getRestaurants("indian"));
        })();
      }, [dispatch]);
    return(
        <div>
            <SplashDisplay/>
            {indian &&<CardScroll collectionTitle={"Indian"} restaurants={indian}/>}
            {italian &&<CardScroll collectionTitle={"Italian"} restaurants={italian}/>}
        </div>
    );
}
export default Home;
