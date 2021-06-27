import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import RestaurantReducer from './restaurant'
import userReducer from "./user"
import search from './search';
import photos from './photo';
import menuphotos from './menuphotos';
import reviews from './review';
import tags from './tags'
import booking from "./booking"

const rootReducer = combineReducers({
    session,
    restaurant: RestaurantReducer,
    user: userReducer,
    search,
    photos,
    menuphotos,
    reviews,
    tags,
    booking
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
