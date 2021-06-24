const SET_MENU_PHOTOS = "menuphotos/set_menu_photos"

const setMenuPhotos = (data) => ({
    type: SET_MENU_PHOTOS,
    payload: data
})

export const getRestaurantMenuPhotos=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/menuphotos/${id}`);

    if (response.ok){
        const data = await response.json();
        dispatch(setMenuPhotos(data))
        return;
    }
}

const initialState = {menuphotos : []}
export default function reducer(state = initialState, action){
    switch (action.type) {
        case SET_MENU_PHOTOS:
            return {
                menuphotos: action.payload
            }
        default:
            return state;
    }
}