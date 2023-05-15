import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoLoader from "../../components/TodoLoader/TodoLoader";
import { timeConvert } from "../../helpers";
import { useListCRUD } from "../../hooks/useListCRUD";
import { useListContext } from "../../hooks/useListContext";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

export default function History() {
  const { history } = useListContext();
  const { isFetching, getHistory, deleteHistoryItem } = useListCRUD();

  useEffect(() => {
    getHistory();
  }, []);

  const filteredItems = history.filter((item) => {
    return item.completed;
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Do you really want to delete this task?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      confirmButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHistoryItem(_id);
      } else if (result.isDenied) {
      }
    });
  };
  return (
    <div className="main_page">
      <Navbar active="history" />

      <h4 className="heading center" style={{ justifyContent: "flex-start" }}>
        History
      </h4>
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
              <td>Completed</td>
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

      {/* LOADER */}
      {isFetching ? <TodoLoader /> : null}
    </div>
  );
}
