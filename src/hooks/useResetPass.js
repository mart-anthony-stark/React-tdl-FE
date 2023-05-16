import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export default function useResetPass() {
  const [isLoading, setLoading] = useState();
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const sendResetCode = async (email, callback) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      toast.error("Invalid email.");
    } else {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/resetcode?email=${email}`
        );
        const json = await res.json();
        setLoading(false);
        if (!res.ok) {
          toast.error(json.msg);
        } else {
          toast.success("Email was successfully sent to your account!");
          callback();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const sendVerifyCode = async ({ email, code }, callback) => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);

      if (!isValidEmail) {
        toast.error("Invalid email.");
      } else {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/resetcode/verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
          }
        );
        const json = await res.json();
        setLoading(false);
        console.log(json);
        if (!res.ok) {
          toast.error(json.msg);
        } else {
          toast.success("You can now reset your password");

          //   Save jwt to localstorage
          localStorage.setItem("user", JSON.stringify(json));

          //   update auth context
          dispatch({ type: "LOGIN", payload: json });
          navigate("/reset-password");
          // Next middleware
          callback && callback();
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const resetPassword = async (newPassword, callback) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/resetcode/reset`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            newPassword,
          }),
        }
      );
      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        toast.error(json.msg);
      } else {
        toast.success("Successfully Changed Password");
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  return {
    isLoading,
    sendResetCode,
    sendVerifyCode,
    resetPassword,
  };
}
