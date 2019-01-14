import { createStore, combineReducers, applyMiddleware } from "redux";
import { result, functions, points, experiments } from "./reducers";

const Push = require("push.js");

const notifyMiddleware = store => next => action => {
  if (action.type.endsWith("_result")) {
    Push.create("Experiment finished!");
  }
  next(action);
};

window.store = createStore(
  combineReducers({ result, functions, points, experiments }),
  applyMiddleware(notifyMiddleware)
);
