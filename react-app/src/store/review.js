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
    console.log("INSIDE REVIEW STORE",restaurant_id, user_id, body, stars, title)
    const response = await fetch("/api/restaurants/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            restaurant_id:restaurant_id,
            user_id:user_id,
            title:title,
            body:body,
            stars:stars,
            image:' '
        }),
    });

    const data = await response.json();
    dispatch(getReviews(restaurant_id));
    if (data.errors) {
        return data;
    }

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
