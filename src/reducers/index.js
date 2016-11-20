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
            break;
        }
        case "FETCH_SHORTEN_ERROR": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        }
        case "FETCH_SHORTEN_SUCCESS": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                shorten: action.payload.shorten,
                url: action.payload.url
            }
            break;
        }
        default:
            return state;
            break;
    }
};

export default combineReducers({
    url: reducer,
})
