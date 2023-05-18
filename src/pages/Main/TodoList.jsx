import "./main.css";
import Navbar from "../../components/Navbar/Navbar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import AddModal from "../../components/Modal/AddModal";
import EditModal from "../../components/Modal/EditModal";
import { timeConvert } from "../../helpers";
import { useListContext } from "../../hooks/useListContext";
import { useListCRUD } from "../../hooks/useListCRUD";
import TodoLoader from "../../components/TodoLoader/TodoLoader";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

export default function TodayList() {
  const { list } = useListContext();
  const {
    toggleImportant,
    toggleCompleted,
    getTasks,
    deleteTask,
    isFetching
  } = useListCRUD();
  const [todayDate, setTodayDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const params = useParams();

  const categoryMap = {
    today: "Today List",
    planned: "Plans",
    priority: "Priority List",
    history: "History List"
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Do you really want to delete this task?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      confirmButtonColor: "green"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(_id);
      } else if (result.isDenied) {
        // Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    // SETTING THE CURRENT DATE
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1)?.toString().padStart(2, "0");
    const day = today.getDate()?.toString().padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);

    getTasks();
  }, []);

  const filteredItems = list.filter((item) => {
    // Items in current date
    if (params.category === "today")
      return (
        new Date(item.due).toLocaleDateString() ===
          new Date(todayDate).toLocaleDateString() && !item.completed
      );
    // All plans
    else if (params.category === "planned") return !item.completed;
    // Priority tasks (Important)
    else if (params.category === "priority")
      return item.important && !item.completed;

    return false;
  });

  return (
    <div className="main_page">
      {/* Navigation */}
      <Navbar active={params.category} />

      {/* Add Modal */}
      {params.category === "planned" && addModalVisibility ? (
        <AddModal onClose={() => setAddModalVisibility(false)} />
      ) : null}

      {selectedTask ? (
        <EditModal item={selectedTask} onClose={() => setSelectedTask(null)} />
      ) : null}

      {/* Heading */}
      <h4 className="heading center" style={{ justifyContent: "flex-start" }}>
        {categoryMap[params.category]}
        {/* Add icon if on planned todos page */}
        {params.category === "planned" ? (
          <IoIosAddCircle
            onClick={() => setAddModalVisibility(true)}
            style={{ color: "var(--c-secondary)", cursor: "pointer" }}
          />
        ) : null}
      </h4>

      {/* Main Content (Todos Table) */}
      <table className="main-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Due</th>
            <th>Time</th>
            <th style={{ textAlign: "center" }}>Important</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id}>
              <td>
                <div
                  className="center"
                  style={{
                    justifyContent: "flex-start",
                    whiteSpace: "nowrap",
                    overflowX: "auto",
                    maxWidth: 300
                  }}
                >
                  <input
                    onClick={() => toggleCompleted(item._id)}
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => console.log("")}
                    style={{ marginRight: "10px" }}
                  />
                  {item.taskname}
                </div>
              </td>
              <td
                style={{
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  maxWidth: 200
                }}
              >
                {item.description}
              </td>
              <td>{new Date(item.due).toLocaleDateString()}</td>
              <td>{timeConvert(item.time)}</td>
              {/* Add to favorites */}
              <td
                onClick={() => toggleImportant(item._id)}
                className="favorite"
              >
                {item.important ? <AiFillStar /> : <AiOutlineStar />}
              </td>
              {params.category === "planned" ? (
                <td className="action-btns">
                  <button
                    onClick={() => setSelectedTask(item)}
                    className="btn-success"
                  >
                    <MdModeEditOutline />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-danger"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* FOR MOBILE VIEW */}
      <div className="cards">
        {filteredItems.map((item) => (
          <div className="card center" key={item._id}>
            <div className="content">
              <h4>
                Task: <span>{item.taskname}</span>
              </h4>
              <h4>
                Description: <span>{item.description}</span>
              </h4>
              <h4>
                Due: <span>{new Date(item.due).toLocaleDateString()}</span>
              </h4>
              <h4>
                Time: <span>{timeConvert(item.time)}</span>
              </h4>
              <button
                className="btn-positive"
                onClick={() => toggleCompleted(item._id)}
              >
                Mark as Completed
              </button>
            </div>
            <div className="controls">
              <button
                onClick={() => toggleImportant(item._id)}
                className="favorite"
              >
                {item.important ? <AiFillStar /> : <AiOutlineStar />}
              </button>
              {params.category === "planned" ? (
                <>
                  <button
                    onClick={() => setSelectedTask(item)}
                    className="btn-success"
                  >
                    <MdModeEditOutline />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-danger"
                  >
                    <AiFillDelete />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {/* LOADER */}
      {isFetching ? <TodoLoader /> : null}
    </div>
  );
}
