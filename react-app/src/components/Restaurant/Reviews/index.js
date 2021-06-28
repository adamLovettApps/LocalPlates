import { useParams , useHistory} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../../store/review';
import ReviewForm from '../ReviewForm'
import ReviewDisplay from '../ReviewDisplay'
import './Reviews.css'
function Reviews({restaurant}){
    const dispatch = useDispatch();
    const history = useHistory();
    const allReviews =  Object.values(useSelector((state)=>Object.values(state.reviews))[0]);
    const sessionUser = useSelector(state => state.session.user)
    const { id } = useParams();


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
        if (!sessionUser){
            history.push("/login")
        }
        if (showReviewForm){
            setShowReviewForm(false);
        }else{
            setShowReviewForm(true);
        }
    };
    console.log("ALLL REVIEWS ARE RIGHT HERE",allReviews)
    return (
        <>
            <div className='review-container'>
                <div className="review-container-header">
                        Reviews
                    </div>
                    <hr className="review-container-divider"></hr>
                    <button onClick={toggleForm} className='write-review-btn'>Post a Review</button>

                    <div className="contents-of-reviews">

                    {showReviewForm && <ReviewForm toggleForm={toggleForm}restaurant={restaurant}/>}

                    {allReviews.length>0 && allReviews.map((review,index)=>(
                        <ReviewDisplay key={index} review={review} />
                    ))}
                    </div>
            </div>
        </>
    )
}
export default Reviews;
