const SET_ALL_RESTAURANTS = "session/SET_ALL_RESTAURANTS"

export const getRestaurants=()=> async(dispatch)=>{
    const response = await fetch('/api/restaurants/all');
    const restaurants = await response.json();
    dispatch(setRestaurants(restaurants));
}

//this will need to be changed in order to specialize for different tags
const setRestaurants=(restaurants)=>({
    type: SET_ALL_RESTAURANTS,
    restaurants

})

const initialState = {restaurants: {}}
const RestaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_RESTAURANTS:
            return
        default:
            return state;
    }

}

export default RestaurantReducer;
