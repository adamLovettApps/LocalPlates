import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
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
    const delivery = useSelector((state)=>Object.values(state.restaurant.delivery))
    const burgers = useSelector((state)=>Object.values(state.restaurant.burgers))
    const pizza = useSelector((state)=>Object.values(state.restaurant.pizza))
    const asian = useSelector((state)=>Object.values(state.restaurant.asian))
    const user = useSelector(state => state.session.user);
    if (user){
    }

    useEffect(() =>{
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
        const timer = setTimeout(() => {
            let leftButtons = document.getElementsByClassName("left-button");
            let rowCount =  leftButtons.length

            function scrollAnimation(isLeft, scrollRow) {

                let x = isLeft? -1 : 1;
                function intervalMaker(cb, count, delay) {
                const intervalObj = setInterval(()=>{
                    cb();
                    count --;
                    if(count === 0 ) {
                    clearInterval(intervalObj);
                    }
                },delay)}

                //fast
                intervalMaker(()=>{
                scrollRow.scrollLeft += (x *3);
                }, 200, 3)
                //slower
                intervalMaker(()=>{
                scrollRow.scrollLeft += (x *2);
                }, 170, 10)
                //very slow
                intervalMaker(()=>{
                scrollRow.scrollLeft += x;
                }, 150, 15)
            }
            for(let i = 1; i<=  rowCount; i++){

                let scrollHolder = document.getElementById(`${i}-scroll-div`);
                document.getElementById(`${i}-left-scroll-btn`).addEventListener("click", (e)=>{
                scrollAnimation(true, scrollHolder);
                })
                document.getElementById(`${i}-right-scroll-btn`).addEventListener("click",(e)=>{
                scrollAnimation(false, scrollHolder);
                })
            }
            }, 300)
    },[])

    let placeholderTitle = "Tag Title Goes here"
    useEffect(() => {
        (async() => {
          let ip = await getIPInfo();

        //   await dispatch(getRestaurants("all"));
          await dispatch(getRestaurants("italian",ip));
          await dispatch(getRestaurants("outdoor",ip));
          await dispatch(getRestaurants("hispanic",ip));
          await dispatch(getRestaurants("delivery",ip));
          await dispatch(getRestaurants("burgers",ip));
          await dispatch(getRestaurants("pizza",ip));
          await dispatch(getRestaurants("asian",ip));
        })();
      }, [dispatch]);

      if (user) {
      if (user.is_owner) {

        return <Redirect to={`/restaurantmanagement/${user.restaurant_id}`}></Redirect>
      }
    }

    return(
        <div>
            <SplashDisplay/>
            {outdoor &&<CardScroll order={1} collectionTitle={"Outdoor Seating"} restaurants={outdoor}/>}
            {delivery &&<CardScroll order={2} collectionTitle={"Delivery Options"} restaurants={delivery}/>}
            {italian &&<CardScroll order={3}collectionTitle={"Italian Food"} restaurants={italian}/>}
            {hispanic &&<CardScroll order={4}collectionTitle={"Hispanic Cuisine"} restaurants={hispanic}/>}
            {asian &&<CardScroll order={5} collectionTitle={"Asian Flavors"} restaurants={asian}/>}

        </div>
    );
}
export default Home;
