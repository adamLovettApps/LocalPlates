const SET_USER = "user/SET_USER";

const setUser = (user) => ({
    type: SET_USER,
    user
})

export const getUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`)
    if (response.ok) {
        const user_data = await response.json()
        
        if (user_data.errors) {
            return user_data;
        }
        setUser(user_data)
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            state = action.user
            return state;
        default:
            return state;
    }
}
