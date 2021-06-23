const SET_RESULTS = "search/set_results";

const setResults = (results) => ({
    type: SET_RESULTS,
    payload: results
})

export const getSearchResults = (ip, searchString) => async(dispatch) => {
    console.log("THIS IS THE IP:", ip)
    ip = ip.ip;
    const response = await fetch(`/api/search/${searchString}/${ip}`);
    const results = await response.json();
    console.log(results);
    dispatch(setResults(results));
}

const initialState = { results: null }


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_RESULTS:
            return { results: action.payload };
        default: 
            return state;
    }
}