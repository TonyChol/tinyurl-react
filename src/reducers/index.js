import { combineReducers } from 'redux'

const initialState = {
    fetching: false,
    fetched: false,
    url: '',
    validated: false,
    shorten: '',
};

const reducer = function(state = initialState, action) {
    switch(action.type) {
        case "FETCH_SHORTEN_START": {
            return {
                ...state,
                fetching: true
            }
        }
        case "FETCH_SHORTEN_ERROR": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case "FETCH_SHORTEN_SUCCESS": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                shorten: action.payload.shorten,
                url: action.payload.url
            }
        }
        default:
            return state;
    }
};

export default combineReducers({
    url: reducer,
})
