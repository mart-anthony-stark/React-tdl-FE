import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { TbCircleKey } from "react-icons/tb";
import { IoLogOutSharp } from "react-icons/io5";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Navbar(props) {
  const [profileMenuVisibility, setProfileMenuVisibility] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuthContext();

  return (
    <div className="navbar center">
      <Link
        to="/todos/today"
        className={`${props.active === "today" ? "active" : ""}`}
      >
        TODAY
      </Link>
      <Link
        className={`${props.active === "planned" ? "active" : ""}`}
        to="/todos/planned"
      >
        PLANNED
      </Link>
      <Link
        className={`${props.active === "priority" ? "active" : ""}`}
        to="/todos/priority"
      >
        PRIORITY
      </Link>
      <Link
        className={`${props.active === "history" ? "active" : ""}`}
        to="/history"
      >
        HISTORY
      </Link>
      <button
        onClick={() => setProfileMenuVisibility(!profileMenuVisibility)}
        className={`profile ${profileMenuVisibility ? "active" : ""}`}
      >
        <HiOutlineUserCircle />
      </button>
      {profileMenuVisibility ? (
        <div className="menu">
          <div className="menu_item center">
            <div className="icon center">
              <FaUserCircle />
            </div>
            <label>{user.user?.name}</label>
          </div>
          <div
            onClick={() => navigate("/change-password")}
            className="menu_item center"
          >
            <div className="icon center">
              <TbCircleKey />
            </div>
            <label>Change Password</label>
          </div>
          <div onClick={logout} className="menu_item center">
            <div className="icon center">
              <IoLogOutSharp />
            </div>
            <label>Log out</label>
          </div>
        </div>
      ) : null}
    </div>
  );
}
