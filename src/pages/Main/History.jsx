import Navbar from "../../components/Navbar/Navbar";
import { timeConvert } from "../../helpers";
import { useListContext } from "../../hooks/useListContext";
import { AiFillDelete } from "react-icons/ai";

export default function History() {
  const { list } = useListContext();

  const filteredItems = list.filter((item) => {
    return item.completed;
  });

  const handleDelete = (_id) => {};
  return (
    <div className="main_page">
      <Navbar active="history" />
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Due</th>
            <th>Time</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id}>
              <td>{item.taskname}</td>
              <td>{item.description}</td>
              <td>{new Date(item.due).toLocaleDateString()}</td>
              <td>{timeConvert(item.time)}</td>
              <td>completed</td>
              <td className="action-btns">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn-danger"
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
