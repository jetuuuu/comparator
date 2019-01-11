import { createStore, combineReducers } from 'redux';
import { result, functions } from "./reducers";

window.store = createStore(combineReducers({result, functions}));