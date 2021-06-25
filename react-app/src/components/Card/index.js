import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Card.css'
import StarRating from "../StarRating"
function Card({restaurant,collectionTitle}){
    //formats tag str to include a '...' and cut off more than 2 tags and to not include the collection title tag in the str
    let tagArr = restaurant.tags.split(', ');
    let noTitleTagArr = []
    tagArr.forEach((el)=>{
    if(collectionTitle.toLowerCase().includes(el.toLowerCase())){
        return;
    }else{
        noTitleTagArr.push(el)
    }})
    let tagString=  noTitleTagArr.join(", ");
    let formatedTagStr = "";
    if(tagString.length > 14){
        formatedTagStr = tagString.slice(0,14) + "..."
    }else{
        formatedTagStr = tagString
    }
    // let tagArr = tagString.split(', ');
    // let formatedTagArr = [];
    // tagArr.forEach((el,i)=>{
    //     if(el.toLowerCase().includes(collectionTitle.toLowerCase())){
    //         return;
    //     }
    //     if(formatedTagArr.length === 2){
    //         formatedTagArr[1]+="..."
    //     }
    //     if (formatedTagArr.length < 2){
    //         formatedTagArr.push(el);
    //     }
    // })
    // let formatedTagStr = formatedTagArr.join(', ')
    const baseURL = restaurant.profile_photo.split('/')[3];;
    const imageRequest = JSON.stringify({
                    bucket: "localplates",
                    key: baseURL,
                    edits: {

                        resize: {
                            width: 240,
                            height:110,
                            fit: "cover"
                        }
                    }
                })
    const encoded = btoa(imageRequest);
    const url = `https://d3tzg5ntrh3zgq.cloudfront.net/${encoded}`;

    return (
        <Link to={`/restaurants/${restaurant.id}`} className="card-link">
            <div className="card-container">
                <div className='zoom-image'>
                    <img className="card-image" src={url}></img>
                </div>
                <div className='card-info-container'>
                    <div className='card-name'>
                        {restaurant.name}
                    </div>
                    <div className="card-stars">
                        <StarRating reviewNum ={restaurant.review_count} rating={restaurant.star_rating}/>
                    </div>
                    <div className='card-tag-city-container'>
                        <div className="card-tags">
                                {formatedTagStr}
                        </div>
                        <div className="card-city">
                        &nbsp; &#8226; &nbsp; {restaurant.city}
                        </div>
                    </div>
                    <div className="card-booking-container">
                        <div className='card-reserve'>
                            Reserve
                        </div>
                        <div className="card-booking-display">
                            Booked {restaurant.total_bookings} times
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;
