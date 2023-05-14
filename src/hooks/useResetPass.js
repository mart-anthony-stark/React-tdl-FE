import { useState } from "react";
import { toast } from "react-toastify";

export default function useResetPass() {
  const [isLoading, setLoading] = useState();

  const sendResetCode = async (email) => {
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
          toast.success("Email was successfully send to your account!");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return {
    isLoading,
    sendResetCode,
  };
}
