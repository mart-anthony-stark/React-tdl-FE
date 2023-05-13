import "./styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import TodoList from "./pages/Main/TodoList.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./pages/ChangePassword";
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import LoadingScreen from "./components/Loading/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user: loggedUser, dispatch } = useAuthContext();

  const checkLogged = async () => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/logged`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.token) {
        // LOGGED IN
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
      } else {
        // Not Logged In
        toast.error("You must log in first.");
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      localStorage.clear();
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkLogged();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/todos/:category"
          element={loggedUser ? <TodoList /> : <Navigate to="/auth/login" />}
        />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}
