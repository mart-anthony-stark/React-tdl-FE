import { useState } from "react";
import { useListCRUD } from "../../hooks/useListCRUD";
import "./modal.css";

export default function EditModal({ item, onClose }) {
  const [taskname, setTaskname] = useState(item.taskname);
  const [description, setDescription] = useState(item.description);
  const [due, setDue] = useState(item.due?.slice(0, 10));
  const [time, setTime] = useState(item.time);
  const { editTask, } = useListCRUD();

  return (
    <div className="add_modal">
      <h2>Edit task</h2>

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
          onClick={() =>
            editTask(
              { _id: item._id, taskname, description, due, time },
              onClose
            )
          }
          className="btn-positive"
        >
          Save
        </button>
      </div>
    </div>
  );
}
