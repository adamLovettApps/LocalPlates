import React, { useState, useEffect } from "react";
import "./StarRating.css"
function StarRating({rating}){
    return(
        <div>
            {rating>0 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>1 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>2 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>3 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
            {rating>4 ?<span className="fa fa-star checked star" ></span> : <span className="fa fa-star not-checked star" ></span>}
        </div>

    )
}
export default StarRating;
