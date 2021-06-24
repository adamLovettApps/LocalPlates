

const SET_ALL_RESTAURANTS = "session/SET_ALL_RESTAURANTS"
const GET_ONE_RESTAURANT = "restaurants/GET_ONE_RESTAURANT"
const ADD_REVIEW = "restaurants/ADD_REVIEW"
const EDIT_REVIEW = "restaurants/EDIT_REVIEW"
const DELETE_REVIEW = "restaurants/DELETE_REVIEW"

export const getRestaurants=(ip)=> async(dispatch)=>{
    console.log("IP!!!!", ip.ip);
    ip = ip.ip;
    const response = await fetch(`/api/restaurants/all/${ip}`);
    const restaurants = await response.json();
    dispatch(setRestaurants(restaurants));
}

export const getOneRestaurant=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setOneRestaurant(data))
    }
}

export const addReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${review.restaurant_id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(setReview(data))
    }
}

//this will need to be changed in order to specialize for different tags
const setRestaurants = (restaurants) => ({
    type: SET_ALL_RESTAURANTS,
    restaurants: restaurants
})

const setOneRestaurant = (data) => ({
    type: GET_ONE_RESTAURANT,
    restaurant_data: data.data,
    restaurant: data.restaurant
})

const setReview = (review) => ({
    type: ADD_REVIEW,
    review: review
})

const initialState = { restaurants: {}, restaurant: {}, restaurant_data: {} }
const RestaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_RESTAURANTS:
            let all_restaurants = {}
            for (let key in action.restaurants) {
                all_restaurants[key] = action.restaurants[key]
            }

            return {
                ...state, restaurants: all_restaurants
            }
            break
        case GET_ONE_RESTAURANT:
            let restaurant_datas = {}
            for (let key in action.restaurant_data) {
                restaurant_datas[key] = action.restaurant_data[key]
            }
            return {
                ...state, restaurant: action.restaurant, restaurant_data: restaurant_datas
            }
            break
        default:
            return state;
    }

}

export default RestaurantReducer;
