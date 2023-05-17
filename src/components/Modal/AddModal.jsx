import { useState } from "react";
import { useListCRUD } from "../../hooks/useListCRUD";
import "./modal.css";
import FetchLoading from "../FetchLoading/FetchLoading";

export default function AddModal({ onClose }) {
  const [taskname, setTaskname] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const [time, setTime] = useState("");
  const { addTask, isFetching } = useListCRUD();

  return (
    <div className="add_modal">
      {isFetching ? <FetchLoading /> : null}
      <h2>Add a task</h2>

      <table>
        <tbody>
          <tr>
            <td className="label">To Do</td>
            <td>
              <input
                value={taskname}
                onChange={(e) => setTaskname(e.target.value)}
                type="text"
                placeholder="Type here..."
              />
            </td>
          </tr>
          <tr>
            <td className="label">Description</td>
            <td>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Type here..."
              />
            </td>
          </tr>
          <tr>
            <td className="label">Due</td>
            <td>
              <input
                value={due}
                onChange={(e) => setDue(e.target.value)}
                type="date"
                placeholder="Type here..."
              />
            </td>
          </tr>
          <tr>
            <td className="label">Time</td>
            <td>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
                placeholder="Type here..."
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="buttons center">
        <button onClick={onClose} className="btn-neutral">
          Cancel
        </button>
        <button
          onClick={() => addTask({ taskname, description, due, time }, onClose)}
          className="btn-positive"
        >
          Save
        </button>
      </div>
    </div>
  );
}
