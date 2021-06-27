const SET_PHOTOS = "photo/set_photos"

const setPhotos = (data) => ({
    type: SET_PHOTOS,
    payload: data
})


export const getRestaurantPhotos=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/photos/${id}`);

    if (response.ok){
        const data = await response.json();
        dispatch(setPhotos(data))
        console.log(data);
        return;
    }
}

export const removeRestaurantPhoto = (id, restaurantID) => async(dispatch) => {
    const response = fetch(`/api/restaurants/photos/remove/${id}`);

    dispatch(getRestaurantPhotos(restaurantID));
}

export const addRestaurantPhoto = (id, url) => async(dispatch) => {
    url = url.url
    console.log(url)
    url = url.substring(37);
    const response = fetch(`/api/restaurants/photos/add/${id}/${url}`);

    dispatch(getRestaurantPhotos(id));
}

const initialState = {photos : {}}
export default function reducer(state = initialState, action){
    switch (action.type) {
        case SET_PHOTOS:
            return {
                photos: action.payload
            }
        default:
            return state;
    }
}

