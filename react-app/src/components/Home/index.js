import React, { useState, useEffect } from "react";
import SplashDisplay from "../SplashDisplay"
import { useDispatch } from "react-redux";
import {getRestaurants} from "../../store/restaurants"
function Home(){
    const dispatch = useDispatch();
    useEffect(() => {
        (async() => {
          await dispatch(getRestaurants());

        })();
      }, []);
    return(
        <div>
            <SplashDisplay/>
        </div>
    );
}
export default Home;
