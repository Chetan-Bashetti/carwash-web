import { MYTODOS } from "../Constants";

const initialState = {
  todos: [],
};

const todosReducers = function (state = initialState, action) {
  switch (action.type) {
    case MYTODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default todosReducers;
