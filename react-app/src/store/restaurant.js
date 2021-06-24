const SET_ALL_RESTAURANTS = "session/SET_ALL_RESTAURANTS"
const GET_ONE_RESTAURANT = "restaurants/GET_ONE_RESTAURANT"

export const getRestaurants=(ip)=> async(dispatch)=>{
    ip = ip.ip;
    const response = await fetch(`/api/restaurants/all/${ip}`);
    const restaurants = await response.json();
    console.log("RESTAURANTS", restaurants)
    dispatch(setRestaurants(restaurants));
}

export const getOneRestaurant=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/${id}`);

    if (response.ok){
        const data = await response.json();
        dispatch(setOneRestaurant(data))
        return data;
    }
}

//this will need to be changed in order to specialize for different tags
const setRestaurants=(restaurants)=>({
    type: SET_ALL_RESTAURANTS,
    restaurants
})

const setOneRestaurant = (data) => ({
    type: GET_ONE_RESTAURANT,
    restaurant_data: data.data,
    restaurant: data.restaurant
})


const initialState = {restaurants: {}, restaurant: {}, restaurant_data: {}}
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
        case GET_ONE_RESTAURANT:
            let restaurant_datas = {}
            let one_restaurant = action.restaurant
            for (let key in action.restaurant_data){
                restaurant_datas[key] = action.restaurant_data[key]
            }

            return {
                ...state, restaurant: one_restaurant, restaurant_data: restaurant_datas
            }
        default:
            return state;
    }

}

export default RestaurantReducer;
