import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import places from './places'
import nearbyPlaces from './nearbyplaces';

const reducer = combineReducers({
  auth,
  places,
  nearbyPlaces
});


const store = createStore(reducer, applyMiddleware(thunk, logger));

console.log(reducer, store)

export default store;

export * from './auth';
export * from './places';
export * from './nearbyplaces'
