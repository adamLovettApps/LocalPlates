import './ReviewDisplay.css'
import React, { useEffect, useState } from "react";
function ReviewDisplay({review}){
    return(
        <div className='review-display-div'>
            <div>
            Title: {review.title}
            </div>
        <div>
            {review.body}
        </div>
        <div>
            {review.stars>0 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star" ></span>}
            {review.stars>1 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star" ></span>}
            {review.stars>2 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star" ></span>}
            {review.stars>3 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star" ></span>}
            {review.stars>4 ?<span className="fa fa-star checked" ></span> : <span className="fa fa-star" ></span>}

        </div>
        </div>
    )
}
export default ReviewDisplay;
