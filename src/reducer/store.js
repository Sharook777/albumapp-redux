import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import albumReducer from "./albumReducer";
import photoReducer from "./photoReducer";

const store = createStore(
  combineReducers({
    albumApp: albumReducer,
    photoApp: photoReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
