import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../../store/review';
import ReviewForm from '../ReviewForm'
import ReviewDisplay from '../ReviewDisplay'
import './Reviews.css'
function Reviews({restaurant}){
    const dispatch = useDispatch();
    const allReviews =  Object.values(useSelector((state)=>Object.values(state.reviews))[0]);
    const { id } = useParams();
    console.log('THIS SHOULD BE EVERY REVIEW', allReviews)

    const [loaded, setLoaded] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    useEffect(() => {
        (async () => {
            await dispatch(getReviews(id))
            setLoaded(true);
        })();
    }, [dispatch])
    if (!loaded) {
        return null;
    }
    const toggleForm= () => {
        if (showReviewForm){
            setShowReviewForm(false);
        }else{
            setShowReviewForm(true);
        }
    };
    return (
        <>
            <div className='review-container'>
                    <button onClick={toggleForm}>Post a Review</button>
                    {showReviewForm && <ReviewForm restaurant={restaurant} />}
                    {allReviews.length>0 && allReviews.map((review,index)=>(
                        <ReviewDisplay key={index} review={review} />
                    ))}
            </div>
        </>
    )
}
export default Reviews;
