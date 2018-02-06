import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import main from "./reducers/mainReducers";

export default createStore(
    combineReducers({
        main
    }),
    {},
    applyMiddleware(logger(), thunk, promise())
);