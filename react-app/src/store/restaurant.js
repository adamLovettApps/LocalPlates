const GET_RESTAURANT = "restaurants/GET_RESTAURANT"


export const getRestaurant=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/${id}`);

    if (response.ok){
        const restaurant = await response.json();
        console.log(restaurant)
        dispatch(setRestaurant(restaurant))
        return restaurant
    }
}

const setRestaurant = (restaurant) => ({
    type: GET_RESTAURANT,
    restaurant: restaurant
})

const initialState = {}
const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESTAURANT: {
            return action.restaurant;
        }
        default:
            return state;
    }
}

export default restaurantReducer;
