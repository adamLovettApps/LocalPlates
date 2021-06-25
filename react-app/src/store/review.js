const SET_REVIEWS = "review/set_reviews"
const ADD_REVIEW = "review/add_review"

const setReviews = (data) => ({
    type: SET_REVIEWS,
    payload: data
})

const addReview = (data) => ({
    type: ADD_REVIEW,
    payload: data
})

export const getReviews=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/reviews/${id}`);

    if (response.ok){
        const data = await response.json();
        dispatch(setReviews(data))
        return;
    }
}

export const addOneReview = (restaurant_id, user_id, body, stars, title) => async(dispatch) => {

    const response = await fetch("/api/restaurants/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            restaurant_id,
            user_id,
            body,
            stars,
            title
        }),
    });

    const data = await response.json();
    if (data.errors) {
        return data;
    }

    dispatch(addReview(data));
    return {};
}

const initialState = {reviews: {}}
export default function reducer(state = initialState, action){
    switch (action.type) {
        case SET_REVIEWS:
            return {
                reviews: action.payload
            }
        case ADD_REVIEW:
            return {
                reviews: action.payload
            }
        default:
            return state;
    }
}
