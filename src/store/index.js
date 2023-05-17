import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import favorites from "./favorites";
import nearbyPlaces from "./nearbyplaces";
import register from "./register";

const reducer = combineReducers({
  auth,
  register,
  nearbyPlaces,
  favorites,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./favorites";
export * from "./nearbyplaces";
