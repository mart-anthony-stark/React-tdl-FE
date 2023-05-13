import { createContext, useReducer } from "react";

export const ListContext = createContext();

export const listReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return {
        list: action.payload
      };
    case "ADD_TASK":
      return {
        list: [action.payload, ...state.list]
      };
    default:
      return state;
  }
};

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, {
    list: [
      {
        _id: 1,
        taskname: "Buy Milk",
        description: "SM, 2 Cans",
        due: "2023-05-12T13:55:44.079Z",
        time: "23:22",
        important: false,
        completed: false
      }
    ]
  });

  return (
    <ListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};
