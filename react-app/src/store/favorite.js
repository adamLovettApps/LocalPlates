const SET_FAVORITES = "favorite/SET_FAVORITES";
const SET_FAVORITES_NO_IP = "favorites/SET_FAVORITES_NO_IP"
const ADD_FAVORITE = "favorite/ADD_FAVORITE";

const setFavorites = (favorites) => ({
    type: SET_FAVORITES,
    payload: favorites
})

const setFavoritesNoIp = (favorites) => ({
    type: SET_FAVORITES_NO_IP,
    payload: favorites
})

export const getAllFavorites = (id,ip) => async (dispatch) => {
    ip = ip.ip
    const response = await fetch(`/api/users/getfavorites/${id}/${ip}`);

    if (response.ok){
        const data = await response.json();
        dispatch(setFavorites(data))
        return data;
    }
}

export const getAllFavoritesNoIP = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/getfavoritesNoIp/${id}`);
    if (response.ok){
        const data = await response.json();
        dispatch(setFavoritesNoIp(data))
        return data;
    }
}

export const setFavorite = (userId, restaurantId, status) => async (dispatch) => {
    const response = await fetch(`/api/users/setFavorite/${userId}/${restaurantId}/${status}`);
    dispatch(getAllFavoritesNoIP(userId));
    // if (response.ok){
    //     const res2 = await await fetch(`/api/users/getfavorites/${userId}/${ip}`);
    //     let data = res2.json();
    //     dispatch(setFavorites(data))
    //     return data;
    // }
    return;
}

const initialState = {favorites: [], favoritesNoIp: {}}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_FAVORITES:
            let favArr= []
            for(let key in action.payload) {
                favArr.push(action.payload[key])
            }
            return {
                ...state, 
                favorites: favArr
            }
        case SET_FAVORITES_NO_IP:
            return {
                ...state,
                favoritesNoIp: action.payload
            }
        default:
            return state;
    }
}
