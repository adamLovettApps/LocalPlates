const SET_USER = "user/SET_USER";
const EDIT_USER = 'user/EDIT_USER';


const setUser = (user) => ({
    type: SET_USER,
    user: user
})

const setEditedUser = (user) => ({
    type: EDIT_USER,
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

export const editUser = (user) => async (dispatch) => {
    const response = await fetch(`/api/user/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if (response.ok) {
        const user_data = await response.json()
        if (user_data.errors.length) {
            return user_data;
        }
        dispatch(setEditedUser(user_data))
    }
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        case EDIT_USER:
            return action.user
        default:
            return state;
    }
}
