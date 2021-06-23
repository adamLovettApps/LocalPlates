import React, { useState, useEffect } from "react";
import './Card.css'
import StarRating from "../StarRating"
function Card({restaurant}){
    return (
        <a>
            <div className="card-container">
                <div className='zoom-image'>
                    <img className="card-image" src="https://brandsitesplatform-res.cloudinary.com/image/fetch/w_auto:100,c_scale,q_auto:eco,f_auto,fl_lossy,dpr_auto,e_sharpen:85/https://assets.brandplatform.generalmills.com%2F-%2Fmedia%2FProject%2FGMI%2Foldelpaso%2Foldelpaso-us%2FRecipes%2Feasy-shredded-chicken-tacos.png%3Frev%3D6644262a781f454fa99fff52f40312b0"></img>
                </div>
                <div className='card-info-container'>
                    <div className='card-name'>
                        {restaurant.name}
                    </div>
                    <div className="card-stars">
                        <StarRating rating={restaurant.star_rating}/>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default Card;
