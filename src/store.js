import { createStore, combineReducers } from "redux";
import { result, functions, points, experiments } from "./reducers";

window.store = createStore(
  combineReducers({ result, functions, points, experiments })
);
