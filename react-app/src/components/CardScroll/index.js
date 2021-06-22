import React, { useState, useEffect } from "react";
import Card from "../Card"
import "./CardScroll.css"
function CardScroll({restaurants}){
    return (
        <div className='scroll-container'>


        <div className='scroll-title'>
            <h1>tag title</h1>
        </div>
            <div className='scroll'>
                <div>left button</div>
                {restaurants && restaurants.map((restaurant,index)=>(
                    <div><Card restaurant={restaurant}/> </div>

                    ))}
                <div>right button</div>
            </div>
        </div>
    )
}

export default CardScroll;
