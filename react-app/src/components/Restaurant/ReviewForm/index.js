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
        const newComment = {
            title,
            body,
            stars,
            tree_id: restaurant.id,
            reviewer:sessionUser.id
        }
        await dispatch(addOneReview(newComment))
        console.log('NEW COOMENT BUILT FRONTEND', newComment);
    }
    return(
        <div>
            <form onSubmit={handleSubmit} className='review-form'>
                <label>Title</label>
                <input
                    className='form-element'
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Title'
                    name='title'
                />
                <label>How many stars would you rate your stay?</label>
                <select
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
                </select>
                <label>Leave your thoughts here</label>
                <textarea
                id='description'
                className='form-element'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                name='body'
                placeholder='Enter your description'
                ></textarea>
                <button id='submit-review' type='submit'>Submit Your Review</button>
            </form>
        </div>
    )
}
export default ReviewForm;
