import React, { useState, useEffect } from "react";
import Card from "../Card"
import "./CardScroll.css"
function CardScroll({restaurants}){
    return (

        <div className='scroll-container'>

        <div className="scroll-center">

        <div className='scroll-title'>
            <h1>tag title</h1>
        </div>
            <div className='scroll'>
                <div className='left-button'>left button</div>
                <div className="card-scroll">
                    {restaurants && restaurants.map((restaurant,index)=>(
                        <div><Card restaurant={restaurant}/> </div>

                        ))}
                </div>
                <div className='right-button'>right button</div>
            </div>
        </div>
        </div>
    )
}

export default CardScroll;
