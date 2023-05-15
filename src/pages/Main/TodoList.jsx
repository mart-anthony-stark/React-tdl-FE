import "./main.css";
import Navbar from "../../components/Navbar/Navbar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import AddModal from "../../components/Modal/AddModal";
import { timeConvert } from "../../helpers";
import { useListContext } from "../../hooks/useListContext";
import { useListCRUD } from "../../hooks/useListCRUD";
import TodoLoader from "../../components/TodoLoader/TodoLoader";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

export default function TodayList() {
  const { list } = useListContext();
  const { toggleImportant, toggleCompleted, getTasks, deleteTask, isFetching } =
    useListCRUD();
  const [todayDate, setTodayDate] = useState("");
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const params = useParams();

  const categoryMap = {
    today: "Today List",
    planned: "Plans",
    priority: "Priority List",
    history: "History List",
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Do you really want to delete this task?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      confirmButtonColor: "green",
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
        new Date(todayDate).toLocaleDateString()
      );
    // All plans
    else if (params.category === "planned") return true;
    // Priority tasks (Important)
    else if (params.category === "priority") return item.important;

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
      <table>
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
                  style={{ justifyContent: "flex-start" }}
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
              <td>{item.description}</td>
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
                  <button className="btn-danger">
                    <MdModeEditOutline />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-success"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>

      {/* LOADER */}
      {isFetching ? <TodoLoader /> : null}
    </div>
  );
}
