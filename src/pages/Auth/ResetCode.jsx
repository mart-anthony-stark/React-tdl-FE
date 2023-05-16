import { Link, useParams } from "react-router-dom";
import "./auth.css";
import useResetPass from "../../hooks/useResetPass";
import { useEffect, useRef, useState } from "react";
import FetchLoading from "../../components/FetchLoading/FetchLoading";
import PinInput from "../../components/PinInput";

export default function ResetCode() {
  const { isLoading, sendResetCode } = useResetPass();
  const { email } = useParams();
  const [isResendActive, setIsResendActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timer === 0) {
      setIsResendActive(true);
    } else {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleClick = () => {
    if (isResendActive) {
      // Perform action when the button is clicked
      sendResetCode(email, () => {
        setIsClicked(true);
        setIsResendActive(false);
        setTimer(30);
      });
    }
  };

  return (
    <div className="forgot_password center col">
      {isLoading ? <FetchLoading /> : null}
      <h1>Enter Password Reset Code</h1>
      <div>Enter the 6-digit code that was sent to your email</div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grp center col">
          <PinInput />
        </div>
      </form>

      <button
        className="btn-positive"
        onClick={handleClick}
        disabled={!isResendActive}
        style={{ marginBottom: 15 }}
      >
        {isResendActive ? "Resend Email" : `Resend Email in (${timer}s)`}
      </button>

      <Link to={-1}>Back</Link>
    </div>
  );
}
