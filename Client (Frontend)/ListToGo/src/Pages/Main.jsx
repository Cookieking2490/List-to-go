import React, { useState } from "react";
import "../Styles/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faMagnifyingGlass,
  faDroplet,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
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

  return (
    <div className="MainPageBackground">
      <div className="ToolsSection">
        <div className="NewTaskSection">
          <button className="NewTask">New Task</button>
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
        <button className="LogoutBtn">
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
    </div>
  );
};

export default Main;
