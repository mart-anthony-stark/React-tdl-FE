import { useContext } from "react";
import { ListContext } from "../context/ListContext";

export const useListContext = () => {
  const context = useContext(ListContext);

  if (!context) {
    throw Error("useListContext must be used inside an ListContextProvider");
  }

  return context;
};
