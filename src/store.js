import "babel-polyfill";

import { createStore, combineReducers } from "redux";
import { result, functions, points, experiments, libraries } from "./reducers";

window.store = createStore(
  combineReducers({ result, functions, points, experiments, libraries })
);
