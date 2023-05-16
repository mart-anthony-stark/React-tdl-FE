import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./changepass.css";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import FetchLoading from "../components/FetchLoading/FetchLoading";
import useResetPass from "../hooks/useResetPass";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useResetPass();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    let isValid = true;

    if (newPass.length < 8) {
      isValid = false;
      toast.error("Password must be at least 8 characters long.");
    }
    if (newPass !== confirmPass) {
      isValid = false;
      toast.error("New Passwords does not match");
    }

    if (isValid) {
      resetPassword(newPass);
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
