const SET_RESULTS = "search/set_results";

const setResults = (results) => ({
    type: SET_RESULTS,
    payload: results
})

export const getSearchResults = (ip, searchString) => async(dispatch) => {
    ip = ip.ip;
    const response = await fetch(`/api/search/${searchString}/${ip}`);
    const results = await response.json();
    Object.keys(results).forEach(result => {
        console.log(results[result].tags)
        results[result].tags = Object.keys(results[result].tags).map(key => `${results[result].tags[key]} `)
    })
    dispatch(setResults(results));
}

const initialState = { allResults: {}, currentResults: {} }


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_RESULTS:
            return { allResults: action.payload, currentResults: action.payload };
        default: 
            return state;
    }
}