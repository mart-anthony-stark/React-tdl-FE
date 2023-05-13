import "./auth.css";
import bg_image from "../../assets/bg_image.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

export default function App() {
  const { isLoading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="login_page">
      <div className="left center">
        <img src={bg_image} alt="todolist" />
      </div>
      <div className="right center">
        <h1>Welcome to</h1>
        <h1>To Do List</h1>

        <form onSubmit={handleLogin} className="center col">
          <div className="grp center col">
            <label>EMAIL</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="johndoe@gmail.com"
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

          <Link to="/auth/forgot-password">Forgot password?</Link>

          <button>LOGIN</button>

          <span>
            Don't have an account? <Link to="/auth/register">Register now</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
