const SET_USER = "user/SET_USER";

const setUser = (user) => ({
    type: SET_USER,
    user: user
})

export const getUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}`)
    if (response.ok) {
        const user_data = await response.json()
        if (user_data.errors) {
            return user_data;
        }
        dispatch(setUser(user_data))
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state;
    }
}
