import './ReviewDisplay.css'
import { useDispatch,useSelector } from 'react-redux';

import React, { useEffect, useState } from "react";
function ReviewDisplay({review}){
    console.log("THIS IS THE REVIEW OBJ",review);

    const baseURL = review.user_photo.split('/')[3];;
        const imageRequest = JSON.stringify({
                        bucket: "localplates",
                        key: baseURL,
                        edits: {

                            resize: {
                                width: 70,
                                height:70,
                                fit: "cover"
                            }
                        }
                    })
        const encoded = btoa(imageRequest);
        const url = `https://d3tzg5ntrh3zgq.cloudfront.net/${encoded}`;
    return(
        <div className='review-display-div'>
            <div className="review-user-container">
                <div className="review-user-profile-pic " style={{backgroundImage: `url("${url}")`}}> {review.username[0]}</div>

            <div className="review-user">{review.username}  </div>

            </div>

        <div className="review-body-container">
            <div className="review-title">
            {review.title}
        <div className="review-star-display">
            {review.stars>0 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star not-checked" ></span>}
            {review.stars>1 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star not-checked" ></span>}
            {review.stars>2 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star not-checked" ></span>}
            {review.stars>3 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star not-checked" ></span>}
            {review.stars>4 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star not-checked" ></span>}

        </div>
            </div>
        <div className='review-body'>
            {review.body}
        </div>

        </div>
        </div>
    )
}
export default ReviewDisplay;
