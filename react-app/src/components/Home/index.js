import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import SplashDisplay from "../SplashDisplay"
import CardScroll from "../CardScroll"
import { useDispatch, useSelector } from "react-redux";
import {getRestaurants} from "../../store/restaurant"
import {getAllFavorites} from "../../store/favorite"

const getIPInfo = async () => {
        let res = await fetch('https://ipapi.co/json/');
        let ip = await res.json();
        return ip;
  }

function Home(){
    const [offset, setOffset] = useState(-1);
    const dispatch = useDispatch();
    const italian = useSelector((state)=>Object.values(state.restaurant.italian))
    const outdoor = useSelector((state)=>Object.values(state.restaurant.outdoor))
    const hispanic = useSelector((state)=>Object.values(state.restaurant.hispanic))
    const delivery = useSelector((state)=>Object.values(state.restaurant.delivery))
    const asian = useSelector((state)=>Object.values(state.restaurant.asian))
    const favorites = useSelector((state)=>state.favorites.favorites)
    const user = useSelector(state => state.session.user);

    useEffect(()=>{
        console.log("FAVVVV LENGTH",favorites)
        if(favorites.length  >0){
            setOffset(0);
        }else{
            setOffset(-1);
        }
    },[favorites,user])


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
            function scrollLeft(){

            }
            for(let i = 1; i<=  rowCount; i++){

                let scrollHolder = document.getElementById(`${i}-scroll-div`);
                let leftHolder = document.getElementById(`${i}-left-scroll-btn`);
                let rightHolder = document.getElementById(`${i}-right-scroll-btn`);
                function leftScroll () {
                    scrollAnimation(true, scrollHolder);
                }
                function rightScroll(){
                    scrollAnimation(false, scrollHolder);
                }
                leftHolder.removeEventListener("click", leftScroll)
                rightHolder.removeEventListener("click",rightScroll)
                leftHolder.addEventListener("click", leftScroll)
                rightHolder.addEventListener("click",rightScroll)


            }
            }, 3000)

            return ()=> {
                Array.from(document.getElementsByClassName("left-button")).forEach(el=>{el.removeEventListener("click", (e)=>{
                },true)})
                Array.from(document.getElementsByClassName("right-button")).forEach(el=>{el.removeEventListener("click", (e)=>{
                },true)})
            }

    },[])

    useEffect(() => {
        (async() => {
          let ip = await getIPInfo();
          await dispatch(getRestaurants("italian",ip));
          await dispatch(getRestaurants("outdoor",ip));
          await dispatch(getRestaurants("hispanic",ip));
          await dispatch(getRestaurants("delivery",ip));
          await dispatch(getRestaurants("asian",ip));
          if(user){
              await dispatch(getAllFavorites(user.id,ip));
          }
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
            { (user && favorites.length>0 && favorites) &&<CardScroll order={1+offset} collectionTitle={"Favorites of Yours!"} restaurants={favorites}/>}
            {outdoor && <CardScroll order={2+offset} collectionTitle={"Outdoor Seating"} restaurants={outdoor}/>}
            {delivery && <CardScroll order={3+offset} collectionTitle={"Delivery Options"} restaurants={delivery}/>}
            {italian && <CardScroll order={4+offset}collectionTitle={"Italian Food"} restaurants={italian}/>}
            {hispanic && <CardScroll order={5+offset}collectionTitle={"Hispanic Cuisine"} restaurants={hispanic}/>}
            {asian && <CardScroll order={6+offset} collectionTitle={"Asian Flavors"} restaurants={asian}/>}

        </div>
    );
}
export default Home;
