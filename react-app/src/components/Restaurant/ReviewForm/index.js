import { useDispatch,useSelector } from 'react-redux';
import React, { useState,useEffect } from 'react';
import { addOneReview} from '../../../store/review';
import './ReviewForm.css'
function ReviewForm({restaurant}){
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [stars, setStars] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ATTEMPT TO POST REVIEW: ", restaurant.id, sessionUser.id, body, stars, title)
        await dispatch(addOneReview(restaurant.id, sessionUser.id, body, stars, title))
    }
    return(
        <div>
            <form onSubmit={handleSubmit} className='review-form'>
                <input
                    className='review-form-title'
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Title'
                    name='title'
                />
                <div className="how-was-your-food">How was your food?</div>


                {/* <select
                    className='form-element'
                    onChange={(e)=>{
                        setStars(e.target.value)
                    }}
                    value={stars}
                    >
                        <option hidden disabled default value>How many stars would you rate your stay?</option>
                        <option key={1} value={1}>1</option>
                        <option key={2} value={2}>2</option>
                        <option key={3} value={3}>3</option>
                        <option key={4} value={4}>4</option>
                        <option key={5} value={5}>5</option>
                </select> */}

                <div className = "form-ratings">
                        {stars>0 ?<span onClick={()=>setStars(1)} className="fa fa-star checked star" style={{fontSize:'20px'}}></span> : <span  onClick={()=>setStars(1)} style={{fontSize:'20px'}} className="fa fa-star not-checked star" ></span>}
                        {stars>1 ?<span onClick={()=>setStars(2)}className="fa fa-star checked star" style={{fontSize:'20px'}}></span> : <span  onClick={()=>setStars(2)}style={{fontSize:'20px'}} className="fa fa-star not-checked star" ></span>}
                        {stars>2 ?<span onClick={()=>setStars(3)} className="fa fa-star checked star" style={{fontSize:'20px'}}></span> : <span onClick={()=>setStars(3)}style={{fontSize:'20px'}} className="fa fa-star not-checked star" ></span>}
                        {stars>3 ?<span onClick={()=>setStars(4)} className="fa fa-star checked star" style={{fontSize:'20px'}}></span> : <span onClick={()=>setStars(4)}style={{fontSize:'20px'}}className="fa fa-star not-checked star" ></span>}
                        {stars>4 ?<span onClick={()=>setStars(5)} className="fa fa-star checked star" style={{fontSize:'20px'}}></span> : <span onClick={()=>setStars(5)}style={{fontSize:'20px'}} className="fa fa-star not-checked star" ></span>}
                </div>
                <textarea
                id='description'
                className='review-form-body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                name='body'
                placeholder='Leave your thoughts here...'
                ></textarea>
                <button className='submit-review' type='submit'>Submit Your Review</button>
            </form>
        </div>
    )
}
export default ReviewForm;
