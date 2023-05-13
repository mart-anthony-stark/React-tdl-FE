import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./changepass.css";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log({ currentPass, newPass, confirmPass });
  };
  return (
    <div className="change_password center col">
      <h1>Change Password</h1>
      <form onSubmit={handleChangePassword}>
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
          <button className="btn-positive">Save</button>
        </div>
      </form>
    </div>
  );
}
