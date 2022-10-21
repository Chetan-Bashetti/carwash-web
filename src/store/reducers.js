import { combineReducers } from "redux";
import todosReducers from "../redux/Reducers";

const rootReducer = combineReducers({
  todosReducers,
});

export default rootReducer;
