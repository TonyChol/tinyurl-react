// Vendor
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"

import reducer from "./reducers"

const logger = (store) => (next) => (action) => {
    console.log("Action fired: ", action);
    next(action);
};

const middleware = applyMiddleware(thunk, logger)

export default createStore(reducer, middleware)