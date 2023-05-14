import { createContext, useReducer } from "react";

export const ListContext = createContext();

export const listReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        list: action.payload,
      };
    case "ADD_TASK":
      return {
        list: [action.payload, ...state.list],
      };
    default:
      return state;
  }
};

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, {
    list: [],
  });

  return (
    <ListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};
