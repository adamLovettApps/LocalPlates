const SET_TAGS = "tags/set_tags"

const setTags = tags => ({
    type: SET_TAGS,
    payload: tags
})

export const getRestaurantTags=(id)=> async(dispatch)=>{
    const response = await fetch(`/api/restaurants/tags/${id}`);

    if (response.ok){
        const data = await response.json();
        dispatch(setTags(data))
        return data;
    }
}

const initialState = {tags: {}}
export default function reducer(state = initialState, action){
    switch (action.type) {
        case SET_TAGS:
            return {
                tags: action.payload
            }
        default:
            return state;
    }
}