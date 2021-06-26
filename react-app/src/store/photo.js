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
        return;
    }
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

