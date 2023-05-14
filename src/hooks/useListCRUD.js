import { useListContext } from "./useListContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "./useAuthContext";

export const useListCRUD = () => {
  const { list, dispatch } = useListContext();
  const { user } = useAuthContext();

  const getTasks = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/todo`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      dispatch({ type: "SET_LIST", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Toggle event for important task
   * @param {*} _id
   */
  const toggleImportant = async (_id) => {
    let newState = null;
    const newList = list.map((item) => {
      if (item._id === _id) {
        newState = !item.important;
        item.important = !item.important;
      }
      return item;
    });
    dispatch({ type: "SET_LIST", payload: newList });

    try {
      // DB Work
      const res = await fetch(`${process.env.REACT_APP_API_URL}/todo/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ important: newState }),
      });

      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Toggle event for completed task
   * @param {*} _id
   */
  const toggleCompleted = async (_id) => {
    let newState = null;
    const newList = list.map((item) => {
      if (item._id === _id) {
        newState = !item.completed;
        item.completed = !item.completed;
      }
      return item;
    });
    dispatch({ type: "SET_LIST", payload: newList });

    try {
      // DB Work
      const res = await fetch(`${process.env.REACT_APP_API_URL}/todo/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ completed: newState }),
      });

      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Saving new task to database
   * @param {*} e - Event
   */
  const addTask = async ({ taskname, description, due, time }, callback) => {
    try {
      let isValid = true;
      // validation
      if (taskname === null || taskname.length === 0) {
        toast.error("Task name is not set");
        isValid = false;
      }
      if (description === null || description.length === 0) {
        toast.error("Description is not set");
        isValid = false;
      }
      if (due === null || due === "") {
        toast.error("Due date is not set");
        isValid = false;
      }
      if (time === null || time === "") {
        toast.error("Due time is not set");
        isValid = false;
      }

      if (isValid) {
        let newTask = {
          _id: uuidv4(),
          taskname,
          description,
          due: new Date(due).toISOString(),
          time,
          important: false,
          completed: false,
        };
        dispatch({ type: "ADD_TASK", payload: newTask });
        newTask._id = undefined;
        // DB WORK
        const res = await fetch(`${process.env.REACT_APP_API_URL}/todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(newTask),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.success("Something went wrong to the server.");
          return;
        }

        callback();
        toast.success("Successfully added new to do.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { toggleImportant, toggleCompleted, addTask, getTasks };
};
