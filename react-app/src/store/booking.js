const SET_ACCEPTED_BOOKINGS = "booking/set_accepted_bookings";
const SET_PENDING_BOOKINGS = "booking/set_pending_bookings";
const SET_CANCELLED_BOOKINGS = "booking/set_cancelled_bookings";

const setAccepted = (data) => ({
    type: SET_ACCEPTED_BOOKINGS,
    payload: data
})

const setPending = (data) => ({
    type: SET_PENDING_BOOKINGS,
    payload: data
})

const setCancelled = (data) => ({
    type: SET_CANCELLED_BOOKINGS,
    payload: data
})

export const getAcceptedBookings = id => async(dispatch) => {
    const response = await fetch(`/api/booking/accepted/${id}`);

    if (response.ok) {
        const accepted = await response.json();
        console.log("ACCEPTED BOOKINGS",accepted)
        dispatch(setAccepted(accepted));
        return;
    }
    return;
}

export const getPendingBookings = id => async(dispatch) => {
    const response = await fetch(`/api/booking/pending/${id}`);

    if (response.ok) {
        const pending = await response.json();
        dispatch(setPending(pending));
        return;
    }
    return;
}

export const getCancelledBookings = id => async(dispatch) => {
    const response = await fetch(`/api/booking/cancelled/${id}`);

    if (response.ok) {
        const cancelled = await response.json();
        dispatch(setCancelled(cancelled));
        return;
    }
    return;
}

export const updateBooking = (bookingId, status, id) => async(dispatch) => {
    const response = await fetch(`/api/booking/${bookingId}/${status}`);

    if (response.ok) {
        dispatch(getAcceptedBookings(id));
        dispatch(getPendingBookings(id));
        dispatch(getCancelledBookings(id));

    }
    return;
}


const initialState = {accepted: {}, pending: {}, cancelled: {}}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SET_ACCEPTED_BOOKINGS:
            return {
                ...state,
                accepted: action.payload
            }
        case SET_PENDING_BOOKINGS:
            return {
                ...state,
                pending: action.payload
            }
        case SET_CANCELLED_BOOKINGS:
            return {
                ...state,
                cancelled: action.payload
            }
        default: return state;
    }
}
