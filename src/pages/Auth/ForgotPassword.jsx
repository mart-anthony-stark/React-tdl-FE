import { Link } from "react-router-dom";
import "./auth.css";
import useResetPass from "../../hooks/useResetPass";
import { useState } from "react";

export default function ForgotPassword() {
  const { isLoading, sendResetCode } = useResetPass();
  const [email, setEmail] = useState();

  const handleSendMail = (e) => {
    e.preventDefault();
    sendResetCode(email);
  };
  return (
    <div className="forgot_password center col">
      <h1>Forgot Password</h1>
      <div>
        Enter the email address associated with your
        <br /> account and we'll send you a link to reset
        <br /> your password.
      </div>

      <form onSubmit={handleSendMail}>
        <div className="grp center col">
          <label>EMAIL</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <button>SEND</button>
        </div>
      </form>
      <Link to={-1}>Back</Link>
    </div>
  );
}
