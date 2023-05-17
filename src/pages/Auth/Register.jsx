import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import FetchLoading from "../../components/FetchLoading/FetchLoading";

export default function Register() {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ name, email, password, dob });
  };

  return (
    <div className="register_page center col">
      {isLoading ? <FetchLoading text="Creating an Account" /> : null}
      <h1>Create Account</h1>
      <span>
        Already Registered? <Link to="/auth/login">Login</Link>
      </span>

      <form onSubmit={handleSignup} className="center col">
        <div className="grp center col">
          <label>NAME</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className="grp center col">
          <label>EMAIL</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
        <div className="grp center col">
          <label>PASSWORD</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="grp center col">
          <label>DATE OF BIRTH</label>
          <input
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            type="date"
          />
        </div>
        <button>SIGN UP</button>
      </form>
    </div>
  );
}
