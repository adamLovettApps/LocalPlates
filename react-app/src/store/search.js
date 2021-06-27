const SET_RESULTS = "search/set_results";
const SET_SELECTION = "search/set_selection";
const RESTORE_SELECTION = "search/restore_selection";

const setResults = (results) => ({
    type: SET_RESULTS,
    payload: results
})

const setSelection = choices => ({
    type: SET_SELECTION,
    payload: choices
})

const restoreSelection = () => ({
    type: RESTORE_SELECTION
})

export const getSearchResults = (ip, searchString) => async(dispatch) => {
    ip = ip.ip;
    const response = await fetch(`/api/search/${searchString}/${ip}`);
    const results = await response.json();
    console.log(results)
    Object.keys(results).forEach(result => {
        results[result].tags = Object.keys(results[result].tags).map(key => `${results[result].tags[key]} `)
    })
    let reorder = {}
    Object.keys(results).forEach(result => {
        let num = results[result].order
        console.log(num)
        reorder[num]  = results[result]
    })
    console.log('SEARCH RESULTS DATA', reorder)
    dispatch(setResults(reorder));
}

export const getCurrentSelection = (choices) => async(dispatch) => {
    if (choices.length === 0) {
        dispatch(restoreSelection());
    }
    else {
        dispatch(setSelection(choices));
    }

}

const initialState = { allResults: {}, currentResults: {} }


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_RESULTS:
            return { allResults: action.payload, currentResults: action.payload };
        case RESTORE_SELECTION:
            return { allResults: state.allResults, currentResults: state.allResults}
        case SET_SELECTION:
            let newState = {};
            Object.keys(state.allResults).forEach((key) => {

                for (let i = 0; i < state.allResults[key].tags.length; i++) {
                    for (let j = 0; j < action.payload.length; j++) {
                        console.log(state.allResults[key].tags[i], action.payload[j]);
                        if (state.allResults[key].tags[i].trim() === action.payload[j].trim()) {
                            newState[key] = state.allResults[key]
                        }
                    }

                }

            })

            console.log(newState);
            console.log("PAYLOAD", action.payload);
            return { ...state, currentResults: newState};
        default:
            return state;
    }
}
