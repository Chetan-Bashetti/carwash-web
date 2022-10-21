import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const reducer = combineReducers({
  reducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
