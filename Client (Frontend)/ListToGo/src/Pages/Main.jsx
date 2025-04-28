import React, { useState, useEffect, use } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { GasMeterSharp } from "@mui/icons-material";

const Main = () => {
  const navigate = useNavigate();
  const [TaskView, setTaskView] = useState("Hidden");
  const [SelectedTask, setSelectedTask] = useState(null);
  const [ColorMode, setColorMode] = useState("Default");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Buy groceries",
      Priority: "Low",
      status: "In Progress",
      DueDate: "2025-04-15",
      Category: "Personal",
      progress: 30,
    },
    {
      id: 2,
      name: "Project",
      Priority: "High",
      status: "Completed",
      DueDate: "2025-04-10",
      Category: "Work",
      progress: 100,
    },
  ]);
  const [NewTaskPopup, setNewTaskPopup] = useState("Hidden");

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
          <button className="CategoryFilterBtn">Category</button>
          <FontAwesomeIcon icon={faFilter} className="FilterIcon" />
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
                <div className="TaskName">{task.name}</div>
                <div className="TaskStatus">{task.status}</div>
                <div className="TaskDueDate">{task.DueDate}</div>{" "}
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
        <input type="text" className="TaskNameInput" />
        <h1 className="TaskStatusPopup">Task Status</h1>
        <select className="TaskStatusSelect">
          <option>On hold</option>
          <option>Not started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <h1 className="TaskDueDatePopup">Due date</h1>
        <input type="date" className="TaskDueDateInput" />
        <h1 className="CategoryPopup">Category</h1>
        <select className="CategorySelect">
          <option>Work</option>
          <option>Personal</option>
          <option>Educational</option>
          <option>Health</option>
          <option>Finance</option>
          <option>Social</option>
          <option>Hobbies</option>
          <option>Fitness</option>
          <option>Travel</option>
          <option>Family</option>
          <option>Shopping</option>
          <option>Errands</option>
          <option>Spiritual</option>
          <option>Entertainment</option>
          <option>Creative</option>
          <option>Volunteer</option>
          <option>Career Development</option>
          <option>Events</option>
          <option>Miscellaneous</option>
          <option>Other</option>
        </select>
        <h1 className="PriorityPopup">Priority</h1>
        <select className="PrioritySelect">
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <h1 className="ProgressPopup">Progress</h1>
        <input type="number" className="ProgressInput" />
        <button className="CreateTaskBtn">Create Task</button>
      </div>

      {SelectedTask && (
        <div className="TaskViewSection">
          <button
            className="CloseViewBtn"
            onClick={() => setTaskView("Hidden")}
          >
            <FontAwesomeIcon icon={faXmark} className="CloseViewIcon" />
          </button>
          <h1 className="TaskNameView">Task Name: {SelectedTask.name}</h1>
          <p className="TaskPriorityView">
            Task Priority: {SelectedTask.Priority}
          </p>
          <p className="TaskStatusView">Task Status: {SelectedTask.status}</p>
          <p className="TaskDueDateView">Due Date: {SelectedTask.DueDate}</p>
          <p className="TaskCategoryView">Category: {SelectedTask.Category}</p>
          <p className="TaskProgressView">
            Task Progress: {SelectedTask.progress}
          </p>
        </div>
      )}
    </div>
  );
};

export default Main;
