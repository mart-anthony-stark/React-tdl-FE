import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

export default function useAuth() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  /**
   * Login
   * @param {*} {email, password}
   */
  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(json.msg);
      } else {
        toast.success("Successfully Logged In");

        //   Save jwt to localstorage
        localStorage.setItem("user", JSON.stringify(json));

        //   update auth context
        dispatch({ type: "LOGIN", payload: json });

        // Proceed to main page
        navigate("/todos/today");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong to the server. Please try again later");
      console.log(error);
    }
  };

  /**
   * Signup
   * @param {*} { name, email, password, dob }
   */
  const signup = async ({ name, email, password, dob }) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);

      // VALIDATION
      let valid = true;
      if (name === undefined || name.length === 0) {
        valid = false;
        toast.error("Name field is required. Please enter your name");
      }
      if (name === undefined || !isValidEmail) {
        valid = false;
        toast.error("Invalid Email.");
      }
      if (password === undefined || password.length < 8) {
        valid = false;
        toast.error("Password must be at least 8 characters long.");
      }

      if (!valid) {
        return;
      }
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, dob }),
        }
      );
      const json = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(json.msg);
      } else {
        toast.success("Successfully Created An Account");
        //   Save jwt to localstorage
        localStorage.setItem("user", JSON.stringify(json));

        //   update auth context
        dispatch({ type: "LOGIN", payload: json });

        // Proceed to main page
        navigate("/todos/today");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong to the server. Please try again later");
      console.log(error);
    }
  };

  const changePassword = async ({ currentPass, newPass }) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            currentPassword: currentPass,
            newPassword: newPass,
          }),
        }
      );
      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        toast.error(json.msg);
      } else {
        toast.success("Successfully Changed Password");
        navigate("/todos/today");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Logout - clears localStorage and user info in auth context
   */
  const logout = async () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/auth/login");
  };
  return {
    isLoading,
    login,
    signup,
    logout,
    changePassword,
  };
}
