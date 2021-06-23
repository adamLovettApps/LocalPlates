import React, { useState, useEffect } from "react";
import "./StarRating.css"
function StarRating({rating,reviewNum}){
    return(
        <div className = 'rating-span'>
            {rating>0 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>1 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>2 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>3 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>4 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            <div className ="star-rating-num"> {rating} Stars: {reviewNum} Reviews</div>
        </div>

    )
}
export default StarRating;
