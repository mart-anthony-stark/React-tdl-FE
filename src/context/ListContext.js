import { createContext, useReducer } from "react";

export const ListContext = createContext();

export const listReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        ...state,
        list: action.payload,
      };
    case "ADD_TASK":
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case "SET_HISTORY":
      return {
        ...state,
        history: action.payload,
      };
    default:
      return state;
  }
};

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, {
    list: [],
    history: [],
  });

  return (
    <ListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};
