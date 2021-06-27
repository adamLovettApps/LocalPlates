const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})

export const authenticate = () => async(dispatch) => {
    const response = await fetch('/api/auth/',{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    if (data.errors) {
        return data;
    }

    dispatch(setUser(data));
    return {};
}

export const login = (email, password) => async (dispatch) => {

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }

    dispatch(setUser(data));
    return {};
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
    return {}
};


export const signUp = (username, email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data));
    return {};
}

export const signUpRestaurant = (profile_photo , username, email, password, name, address, city, state, zipcode, phoneNumber, description) => async (dispatch) => {
    const response = await fetch("/api/auth/signupRestaurant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({profile_photo , username, email, password, name, address, city, state, zipcode, phoneNumber, description})
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data));
    return {};
}

const initialState = { user: null }

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null }
        default:
            return state;
    }
}
