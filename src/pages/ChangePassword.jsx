import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./changepass.css";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import FetchLoading from "../components/FetchLoading/FetchLoading";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changePassword, isLoading } = useAuth();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    let isValid = true;
    if (currentPass.length === 0) {
      isValid = false;
      toast.error("Please input your current password first.");
    }

    if (newPass.length < 8) {
      isValid = false;
      toast.error("Password must be at least 8 characters long.");
    }
    if (newPass !== confirmPass) {
      isValid = false;
      toast.error("New Passwords does not match");
    }

    if (isValid) {
      changePassword({ currentPass, newPass });
    }
  };

  return (
    <div className="change_password center col">
      {isLoading ? <FetchLoading /> : null}
      <h1>Change Password</h1>
      <div>
        <table>
          <tbody>
            <tr>
              <td className="labels">Current Password</td>
              <td>
                <input
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  type="password"
                />
              </td>
            </tr>
            <tr>
              <td className="labels">New Password</td>
              <input
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                type="password"
              />
            </tr>
            <tr>
              <td className="labels">Confirm new Password</td>
              <input
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                type="password"
              />
            </tr>
          </tbody>
        </table>
        <div className="buttons center">
          <button
            onClick={() => navigate("/todos/today")}
            className="btn-neutral"
          >
            Cancel
          </button>
          <button onClick={handleChangePassword} className="btn-positive">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
