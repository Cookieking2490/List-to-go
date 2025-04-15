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
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const Main = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Buy groceries",
      status: "In Progress",
      dueDate: "2025-04-15",
      progress: 30,
    },
    {
      id: 2,
      name: "Project",
      status: "Completed",
      dueDate: "2025-04-10",
      progress: 100,
    },
    {
      id: 3,
      name: "Gym session",
      status: "Not started",
      dueDate: "2025-04-20",
      progress: 0,
    },
    {
      id: 4,
      name: "Read a book",
      status: "In Progress",
      dueDate: "2025-04-25",
      progress: 50,
    },
    {
      id: 5,
      name: "Clean the house",
      status: "Not started",
      dueDate: "2025-04-30",
      progress: 0,
    },
    {
      id: 6,
      name: "Finish homework",
      status: "In Progress",
      dueDate: "2025-04-18",
      progress: 70,
    },
    {
      id: 7,
      name: "Plan a trip",
      status: "Not started",
      dueDate: "2025-05-01",
      progress: 0,
    },
    {
      id: 8,
      name: "Attend workshop",
      status: "Completed",
      dueDate: "2025-04-12",
      progress: 100,
    },
    {
      id: 9,
      name: "Cook dinner",
      status: "In Progress",
      dueDate: "2025-04-16",
      progress: 40,
    },
    {
      id: 10,
      name: "Write a blog post",
      status: "Not started",
      dueDate: "2025-04-28",
      progress: 0,
    },
  ]);
  const [NewTaskPopup, setNewTaskPopup] = useState("Hidden");

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
  });

  const NewTaskPopupOpacity = () => {
    if (NewTaskPopup === "Show") {
      setNewTaskPopup("Hidden");
    } else if (NewTaskPopup === "Hidden") {
      setNewTaskPopup("Show");
    }
  };

  const HandleLogout = () => {
    navigate("/");
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
        <button className="ColorChangeBtn">
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
              <div className="CircularList">
                <div className="TaskName">{task.name}</div>
                <div className="TaskStatus">{task.status}</div>
                <div className="TaskDueDate">{task.dueDate}</div>
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
          <option value="">On hold</option>
          <option value="">Not started</option>
          <option value="">In Progress</option>
          <option value="">Completed</option>
        </select>
        <h1 className="TaskDueDatePopup">Due date</h1>
        <input type="date" className="TaskDueDateInput" />
        <h1 className="CategoryPopup">Category</h1>
        <select className="CategorySelect">
          <option value="">Work</option>
          <option value="">Personal</option>
          <option value="">Educational</option>
          <option value="">Health</option>
          <option value="">Finance</option>
          <option value="">Social</option>
          <option value="">Hobbies</option>
          <option value="">Fitness</option>
          <option value="">Travel</option>
          <option value="">Family</option>
          <option value="">Shopping</option>
          <option value="">Errands</option>
          <option value="">Spiritual</option>
          <option value="">Entertainment</option>
          <option value="">Creative</option>
          <option value="">Volunteer</option>
          <option value="">Career Development</option>
          <option value="">Events</option>
          <option value="">Miscellaneous</option>
          <option value="">other</option>
        </select>
        <h1 className="PriorityPopup">Priority</h1>
        <select className="PrioritySelect">
          <option value="">High</option>
          <option value="">Medium</option>
          <option value="">Low</option>
        </select>
        <h1 className="ProgressPopup">Progress</h1>
        <input type="number" className="ProgressInput" />
        <button className="CreateTaskBtn">Create Task</button>
      </div>
    </div>
  );
};

export default Main;
