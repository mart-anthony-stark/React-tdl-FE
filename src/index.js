import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ListContextProvider } from "./context/ListContext";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <ListContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ListContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
