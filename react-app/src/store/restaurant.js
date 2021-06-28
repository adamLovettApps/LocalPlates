const GET_ALL_RESTAURANTS = "restaurants/GET_all"
const GET_ONE_RESTAURANT = "restaurants/GET_ONE_RESTAURANT"
const GET_Italian="restaurants/GET_italian"
const GET_Indian="restaurants/GET_indian"
const GET_Hispanic="restaurants/GET_hispanic"
const GET_Sushi="restaurants/GET_sushi"
const GET_Burgers="restaurants/GET_burgers"
const GET_Vegetarian="restaurants/GET_vegetarian"
const GET_Barbecue="restaurants/GET_barbecue"
const GET_Pizza="restaurants/GET_pizza"
const GET_Outdoor="restaurants/GET_outdoor"
const GET_Delivery="restaurants/GET_delivery"
const GET_Asian="restaurants/GET_asian"
const ADD_REVIEW="restaurants/ADD_review"


export const getRestaurants=(tagType, ip)=> async(dispatch)=>{
    ip = ip.ip;
    const response = await fetch(`/api/restaurants/tag_select/${tagType}/${ip}`);
    const restaurants = await response.json();

    dispatch(setRestaurants(restaurants, tagType));
}

export const getRestaurantsByLocation=(ip)=> async(dispatch)=>{
    ip = ip.ip;
    const response = await fetch(`/api/restaurants/all/${ip}`);
    const restaurants = await response.json();

    dispatch(setRestaurants(restaurants));
}

const setRestaurants=(restaurants,tagType)=>({
    type: `restaurants/GET_${tagType}`,
    restaurants
})


export const getOneRestaurant=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/${id}`);
    if (response.ok){
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


const setOneRestaurant = (data) => ({
    type: GET_ONE_RESTAURANT,
    payload: data
})

const setReview = (review) => ({
    type: ADD_REVIEW,
    review: review
})


const initialState = {restaurants: {}, italian:{}, indian:{}, hispanic:{},sushi:{},
burgers:{},vegetarian:{}, barbecue:{}, pizza:{}, outdoor:{}, delivery:{}, restaurant: {}, asian:{}, restaurant_data: {}}

const RestaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_Italian:
            let all_italian = {};
            for (let key in action.restaurants){
                all_italian[key] = action.restaurants[key]
            }

            return {
                ...state, italian: all_italian
            }
        case GET_Asian:
            let all_asian = {};
            for (let key in action.restaurants){
                all_asian[key] = action.restaurants[key]
            }

            return {
                ...state, asian: all_asian
            }
        case GET_Indian:
            let all_indian = {};
            for (let key in action.restaurants){
                all_indian[key] = action.restaurants[key]
            }
            return {
                ...state, indian: all_indian
            }
        case GET_Hispanic:
            let all_hispanic = {};
            for (let key in action.restaurants){
                all_hispanic[key] = action.restaurants[key]
            }
            return {
                ...state, hispanic: all_hispanic
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
            for (let key in action.restaurants) {
                all_restaurants[key] = action.restaurants[key]
            }

            return {
                ...state, restaurants: all_restaurants
            }
        case GET_ONE_RESTAURANT:
            return {
                ...state, restaurant: action.payload
            }
            break
        default:
            return state;
    }
}

export default RestaurantReducer;
