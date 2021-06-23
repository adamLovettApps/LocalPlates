const GET_ALL_RESTAURANTS = "restaurants/GET_all"
const GET_ONE_RESTAURANT = "restaurants/GET_ONE_RESTAURANT"
const GET_Italian="restaurants/GET_italian"
const GET_Indian="restaurants/GET_Indian"
const GET_Mexican="restaurants/GET_Mexican"
const GET_Sushi="restaurants/GET_Sushi"
const GET_Burgers="restaurants/GET_Burgers"
const GET_Vegetarian="restaurants/GET_Vegetarian"
const GET_Barbecue="restaurants/GET_Barbecue"
const GET_Pizza="restaurants/GET_Pizza"
const GET_Outdoor="restaurants/GET_Outdoor"
const GET_Delivery="restaurants/GET_Delivery"

export const getRestaurants=(tagType)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/tag_select/${tagType}`);
    const restaurants = await response.json();
    console.log(restaurants);
    dispatch(setRestaurants(restaurants, tagType));
}

const setRestaurants=(restaurants,tagType)=>({
    type: `restaurants/GET_${tagType}`,
    restaurants
})


export const getOneRestaurant=(id)=> async(dispatch)=>{
    console.log(">>>>>>>>>>>>>>>>Heeeeeeeeee")
    const response = await fetch(`/api/restaurants/${id}`);
    if (response.ok){
        const data = await response.json();
        dispatch(setOneRestaurant(data))
        return data;
    }
}


const setOneRestaurant = (data) => ({
    type: GET_ONE_RESTAURANT,
    restaurant_data: data.data,
    restaurant: data.restaurant
})


const initialState = {restaurants: {}, italian:{}, indian:{}, mexican:{},sushi:{},
burgers:{},vegetarian:{}, barbecue:{}, pizza:{}, outdoor:{}, delivery:{}, restaurant: {}, restaurant_data: {}}
const RestaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_Italian:
            let all_italian = {};
            for (let key in action.restaurants){
                all_italian[key] = action.restaurants[key]
            }
            console.log('INSIDE REDUCER', all_italian)
            return {
                ...state, italian: all_italian
            }
        case GET_Indian:
            let all_indian = {};
            for (let key in action.restaurants){
                all_indian[key] = action.restaurants[key]
            }
            return {
                ...state, indian: all_indian
            }
        case GET_Mexican:
            let all_mexican = {};
            for (let key in action.restaurants){
                all_mexican[key] = action.restaurants[key]
            }
            return {
                ...state, mexican: all_mexican
            }
        case GET_Sushi:
            let all_sushi = {};
            for (let key in action.restaurants){
                all_sushi[key] = action.restaurants[key]
            }
            return {
                ...state, sushi: all_sushi
            }
        case GET_Burgers:
            let all_burgers = {};
            for (let key in action.restaurants){
                all_burgers[key] = action.restaurants[key]
            }
            return {
                ...state, burgers: all_burgers
            }
        case GET_Vegetarian:
            let all_vegetarian = {};
            for (let key in action.restaurants){
                all_vegetarian[key] = action.restaurants[key]
            }
            return {
                ...state, vegetarian: all_vegetarian
            }
        case GET_Barbecue:
            let all_barbecue = {};
            for (let key in action.restaurants){
                all_barbecue[key] = action.restaurants[key]
            }
            return {
                ...state, barbecue: all_barbecue
            }
        case GET_Pizza:
            let all_pizza = {};
            for (let key in action.restaurants){
                all_pizza[key] = action.restaurants[key]
            }
            return {
                ...state, pizza: all_pizza
            }
        case GET_Outdoor:
            let all_outdoor = {};
            for (let key in action.restaurants){
                all_outdoor[key] = action.restaurants[key]
            }
            return {
                ...state, outdoor: all_outdoor
            }
        case GET_Delivery:
            let all_delivery = {};
            for (let key in action.restaurants){
                all_delivery[key] = action.restaurants[key]
            }
            return {
                ...state, delivery: all_delivery
            }

        case GET_ALL_RESTAURANTS:
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
