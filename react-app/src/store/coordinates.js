const GET_COORDINATES = "coordinates/get_coordinates";


const getCoords = (data) => ({
    type: GET_COORDINATES,
    payload: data
})


export const getRestCoordinates = id => async(dispatch) => {
    const response = await fetch(`/api/restaurants/getcoordinates/${id}`)
    const coords = await response.json();
    console.log("HERE!~~~")
    dispatch(getCoords(coords))
    return;
}

const initialState = {coodinates: null}

export default function reducer(state=initialState, action){
    switch(action.type) {
        case GET_COORDINATES: 
            return {
                coordinates: action.payload
            }
        default: return state;
    }
} 