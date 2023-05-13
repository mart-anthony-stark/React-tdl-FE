import { Link } from "react-router-dom";
import "./auth.css";

export default function ForgotPassword() {
  return (
    <div className="forgot_password center col">
      <h1>Forgot Password</h1>
      <div>
        Enter the email address associated with your
        <br /> account and we'll send you a link to reset
        <br /> your password.
      </div>

      <form>
        <div className="grp center col">
          <label>EMAIL</label>
          <input type="text" />
          <button>SEND</button>
        </div>
      </form>
      <Link to={-1}>Back</Link>
    </div>
  );
}
