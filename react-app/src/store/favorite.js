const SET_FAVORITES = "favorite/SET_FAVORITES";
const ADD_FAVORITE = "favorite/ADD_FAVORITE";

const setFavorites = (favorites) => ({
    type: SET_FAVORITES,
    payload: favorites
})

const getAllFavorites = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/getfavorites/${id}`);

    if (response.ok){
        const data = await response.json();
        dispatch(setFavorites(data))
        return data;
    }
}

const initialState = {favorites: {}}

export default function reducer(state = initialState, action) => {
    switch(action.type) {
        case SET_FAVORITES:
            return {
                favorites: action.payload
            }
        default:
            return state;
    }
}