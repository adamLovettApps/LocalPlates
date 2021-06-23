import React, { useState, useEffect } from "react";
import Card from "../Card"
import "./CardScroll.css"
function CardScroll({collectionTitle,restaurants}){

    return (

        <div className='scroll-container'>

        <div className="scroll-center">

            <div className='scroll-title'>
                <h1>{collectionTitle}</h1>
            </div>
            <div className="scroll-border-bar"></div>
            <div className='scroll'>
                <div className='scroll-button-container'>
                    <div className='left-button scroll-button'>
                        <div className="fas fa-angle-left chevron-left"></div>
                    </div>

                    <div className='right-button scroll-button'>
                        <div className="fas fa-angle-right chevron-right"></div>
                    </div>

                </div>
                <div className="card-scroll">
                    {restaurants && restaurants.map((restaurant,index)=>(
                        <div><Card restaurant={restaurant}/> </div>
                        ))}
                </div>
            </div>
        </div>
        </div>
    )
}

export default CardScroll;
