import React, { useState, useEffect } from "react";
import './SplashDisplay.css'
import SearchBar from "../SearchBar"
function SplashDisplay(){

    return(
        <div className="splash-background">
            <h1 className="splash-title">Find a Seat For a Local Plate!</h1>
            <SearchBar/>
        </div>
    )
}

export default SplashDisplay;
