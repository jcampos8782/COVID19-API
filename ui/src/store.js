import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

export default function configureStore(initialState={}) {
    return createStore(
        combineReducers(reducers),
        initialState,
        applyMiddleware(thunk)
    );
}