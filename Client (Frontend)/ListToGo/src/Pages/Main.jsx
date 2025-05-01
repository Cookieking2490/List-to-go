import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faMagnifyingGlass,
  faDroplet,
  faRightFromBracket,
  faXmark,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const Main = () => {
  const navigate = useNavigate();
  const [TaskView, setTaskView] = useState("Hidden");
  const [SelectedTask, setSelectedTask] = useState(null);
  const [ColorMode, setColorMode] = useState("Default");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task_name: "Sample Task",
      status: "Not started",
      due_time: "2025-05-01",
      progress: 0,
      category: "Work",
      priority: "High",
    },
  ]);
  const [EditMode, setEditMode] = useState("Hidden");
  const [NewTaskPopup, setNewTaskPopup] = useState("Hidden");
  const [TaskName, setTaskName] = useState("");
  const [TaskStatus, setTaskStatus] = useState("");
  const [TaskDueDate, setTaskDueDate] = useState("");
  const [TaskCategory, setTaskCategory] = useState("");
  const [TaskPriority, setTaskPriority] = useState("");
  const [TaskProgress, setTaskProgress] = useState(0);

  useEffect(() => {
    if (ColorMode === "Dark") {
      gsap.to(".MainPageBackground", {
        backgroundColor: "#111111",
        color: "#ffffff",
      });
      gsap.to([".DecorOneInside", ".DecorTwoInside", ".DecorThreeInside"], {
        backgroundColor: "#111111",
      });
      gsap.to([".ToolsSection", ".TodoSection"], {
        backgroundColor: "#222222",
        color: "#ffffff",
      });
      gsap.to(
        [
          ".NewTaskSection",
          ".NewTask",
          ".CategoriesSection",
          ".CategoryFilterBtn",
          ".ColorChangeBtn",
          ".LogoutBtn",
          ".Aspect",
          ".ProgressAspect",
          ".CircularList",
          ".CompleteTask",
        ],
        {
          backgroundColor: "#111111",
          color: "#ffffff",
          outlineColor: "#ffffff",
        }
      );
      gsap.to(".SearchInput", {
        color: "#ffffff",
        outlineColor: "#ffffff",
      });
      gsap.to(".TaskItem", {
        borderBottom: "0.15vw solid #ffffff",
      });
    }
  }, [ColorMode]);

  useEffect(() => {
    if (NewTaskPopup === "Hidden") {
      gsap.to(".NewTaskPopup", {
        opacity: 0,
        pointerEvents: "none",
      });
    } else if (NewTaskPopup === "Show") {
      gsap.to(".NewTaskPopup", {
        opacity: 1,
        pointerEvents: "all",
      });
    }
  }, [NewTaskPopup]);

  useEffect(() => {
    if (EditMode === "Hidden") {
      gsap.to(".EditModeSection", {
        opacity: 0,
        pointerEvents: "none",
      });
    } else if (EditMode === "Show") {
      gsap.to(".EditModeSection", {
        opacity: 1,
        pointerEvents: "all",
      });
    }
  }, [EditMode]);

  useEffect(() => {
    if (TaskView === "Hidden") {
      gsap.to(".TaskViewSection", {
        opacity: 0,
        pointerEvents: "none",
      });
    } else if (TaskView === "Show") {
      gsap.to(".TaskViewSection", {
        opacity: 1,
        pointerEvents: "all",
      });
    }
  }, [TaskView]);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");

  //   if (userId) {
  //     fetch(`http://127.0.0.1:8000/task-list/${userId}/`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Fetched tasks for user:", data);
  //         setTasks(data);
  //         console.log("Updated tasks state:", tasks);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching tasks:", error);
  //       });
  //   } else {
  //     console.error(
  //       "User ID not found in localStorage. Redirecting to login..."
  //     );
  //     navigate("/");
  //   }
  // }, []);

  const HandleColorChange = () => {
    if (ColorMode === "Default") {
      setColorMode("Dark");
    } else if (ColorMode === "Dark") {
      setColorMode("Default");
    }
  };

  const NewTaskPopupOpacity = () => {
    setNewTaskPopup((prev) => (prev === "Show" ? "Hidden" : "Show"));
  };

  const ToggleTaskViewMode = () => {
    if (TaskView === "Hidden") {
      setTaskView("Show");
    }
  };

  const HandleLogout = () => {
    navigate("/");
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskView("Show");
  };

  const createTask = async (taskData, token) => {
    try {
      const response = await fetch("http://localhost:8000/api/todo/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Task created:", data);
      return data;
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const handleCreateTask = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or token not found in localStorage.");
      return;
    }

    const taskData = {
      name: TaskName,
      status: TaskStatus,
      DueDate: TaskDueDate,
      Category: TaskCategory,
      Priority: TaskPriority,
      progress: TaskProgress,
      user: userId,
    };

    try {
      const newTask = await createTask(taskData, token);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskPopup("Hidden");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="MainPageBackground">
      <div className="ToolsSection">
        <div className="NewTaskSection">
          <button className="NewTask" onClick={NewTaskPopupOpacity}>
            New Task
          </button>
          <FontAwesomeIcon icon={faPlus} className="PlusIcon" />
        </div>
        <div className="CategoriesSection">
          <select className="CategoryFilter" defaultValue="">
            <option value="">Category</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Health</option>
            <option>Finance</option>
            <option>Social</option>
            <option>Fitness</option>
            <option>Travel</option>
            <option>Errands</option>
            <option>Entertainment</option>
            <option>Events</option>
            <option>Other</option>
          </select>
        </div>
        <div className="SearchSection">
          <input type="text" className="SearchInput" placeholder="Search" />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="SearchIcon" />
        </div>
        <button className="ColorChangeBtn" onClick={HandleColorChange}>
          <FontAwesomeIcon icon={faDroplet} className="ColorIcon" />
        </button>
        <button className="LogoutBtn" onClick={HandleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="LogoutIcon" />
        </button>
      </div>

      <div className="TodoSection">
        <div className="InfoBarSection">
          <div className="Aspect">Name</div>
          <div className="Aspect">Status</div>
          <div className="Aspect">Due date</div>
          <div className="ProgressAspect">Progress</div>
        </div>

        <div className="ListSection">
          {tasks.map((task) => (
            <div key={task.id} className="TaskItem">
              <button className="CompleteTask"></button>
              <div
                className="CircularList"
                onClick={() => handleTaskClick(task)}
              >
                <div className="TaskName">{task.task_name}</div>
                <div className="TaskStatus">{task.status}</div>
                <div className="TaskDueDate">
                  {new Date(task.due_time).toLocaleDateString()}
                </div>{" "}
                <input
                  type="range"
                  className="TaskProgress"
                  value={task.progress}
                  readOnly
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="DecorSectionOne">
        <div className="DecorOne">
          <div className="DecorOneInside"></div>
        </div>
        <div className="DecorTwo">
          <div className="DecorTwoInside"></div>
        </div>
        <div className="DecorThree">
          <div className="DecorThreeInside"></div>
        </div>
      </div>
      <div className="DecorSectionTwo">
        <div className="DecorOne">
          <div className="DecorOneInside"></div>
        </div>
        <div className="DecorTwo">
          <div className="DecorTwoInside"></div>
        </div>
        <div className="DecorThree">
          <div className="DecorThreeInside"></div>
        </div>
      </div>
      <div className="DecorSectionThree"></div>

      <div className="NewTaskPopup">
        <button className="ClosePopupBtn" onClick={NewTaskPopupOpacity}>
          <FontAwesomeIcon icon={faXmark} className="ClosePopupIcon" />
        </button>
        <h1 className="TaskNamePopup">Task Name</h1>
        <input
          type="text"
          className="TaskNameInput"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <h1 className="TaskStatusPopup">Task Status</h1>
        <select
          className="TaskStatusSelect"
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option>On hold</option>
          <option>Not started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <h1 className="TaskDueDatePopup">Due date</h1>
        <input
          type="date"
          className="TaskDueDateInput"
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <h1 className="CategoryPopup">Category</h1>
        <select
          className="CategorySelect"
          onChange={(e) => setTaskCategory(e.target.value)}
        >
          <option>Work</option>
          <option>Personal</option>
          <option>Health</option>
          <option>Finance</option>
          <option>Social</option>
          <option>Fitness</option>
          <option>Travel</option>
          <option>Errands</option>
          <option>Entertainment</option>
          <option>Events</option>
          <option>Other</option>
        </select>
        <h1 className="PriorityPopup">Priority</h1>
        <select
          className="PrioritySelect"
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <h1 className="ProgressPopup">Progress</h1>
        <input
          type="number"
          className="ProgressInput"
          onChange={(e) => setTaskProgress(e.target.value)}
          min={0}
          max={100}
        />
        <button className="CreateTaskBtn" onClick={handleCreateTask}>
          Create Task
        </button>
      </div>

      {SelectedTask && (
        <div className="TaskViewSection">
          <button className="EditViewBtn" onClick={() => setEditMode("Show")}>
            <FontAwesomeIcon icon={faPen} className="EditViewIcon" />
          </button>
          <button className="DeleteViewBtn">
            <FontAwesomeIcon icon={faTrashCan} className="DeleteEditIcon" />
          </button>
          <button
            className="CloseViewBtn"
            onClick={() => setTaskView("Hidden")}
          >
            <FontAwesomeIcon icon={faXmark} className="CloseViewIcon" />
          </button>
          <h1 className="TaskNameView">Task Name: {SelectedTask.task_name}</h1>
          <p className="TaskPriorityView">
            Task Priority: {SelectedTask.priority}
          </p>
          <p className="TaskStatusView">Task Status: {SelectedTask.status}</p>
          <p className="TaskDueDateView">Due Date: {SelectedTask.due_time}</p>
          <p className="TaskCategoryView">Category: {SelectedTask.category}</p>
          <p className="TaskProgressView">
            Task Progress: {SelectedTask.progress}
          </p>
        </div>
      )}
      <div className="EditModeSection">
        <button className="CloseEditBtn" onClick={() => setEditMode("Hidden")}>
          <FontAwesomeIcon icon={faXmark} className="CloseEditIcon" />
        </button>
        <h1 className="TaskNameEdit">Task Name</h1>
        <input type="text" className="TaskNameInput" />
        <h1 className="TaskStatusEdit">Task Status</h1>
        <select className="TaskStatusSelect">
          <option>On hold</option>
          <option>Not started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <h1 className="TaskDueDateEdit">Due date</h1>
        <input type="date" className="TaskDueDateInput" />
        <h1 className="CategoryEdit">Category</h1>
        <select className="CategorySelect">
          <option>Work</option>
          <option>Personal</option>
          <option>Health</option>
          <option>Finance</option>
          <option>Social</option>
          <option>Fitness</option>
          <option>Travel</option>
          <option>Errands</option>
          <option>Entertainment</option>
          <option>Events</option>
          <option>Other</option>
        </select>
        <h1 className="PriorityEdit">Priority</h1>
        <select className="PrioritySelect">
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button className="UpdateTaskBtn">Update Task</button>
      </div>
    </div>
  );
};

export default Main;
