const SET_ALL_RESTAURANTS = "session/SET_ALL_RESTAURANTS"

export const getRestaurants=()=> async(dispatch)=>{
    const response = await fetch('/api/restaurants/all');
    const restaurants = await response.json();
    console.log(restaurants);
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
            let all_restaurants = {}
            for (let key in action.restaurants){
                all_restaurants[key] = action.restaurants[key]
            }

            return {
                ...state, restaurants : all_restaurants
            }
        default:
            return state;
    }

}

export default RestaurantReducer;
