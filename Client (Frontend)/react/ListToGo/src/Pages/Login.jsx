import React from "react";
import "../Styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Login = () => {
  const [Visibility, setVisibility] = useState("password");

  const VisibilityChange = () => {
    if (Visibility === "password") {
      setVisibility("text");
    } else if (Visibility === "text") {
      setVisibility("password");
    }
  };

  useEffect(() => {
    if (Visibility === "password") {
      gsap.to("#SeeEye", { opacity: 0, pointerEvents: "none" });
      gsap.to("#HiddenEye", { opacity: 1, pointerEvents: "all" });
    } else {
      gsap.to("#HiddenEye", { opacity: 0, pointerEvents: "none" });
      gsap.to("#SeeEye", { opacity: 1, pointerEvents: "all" });
    }
  }, [Visibility]);

  useEffect(() => {
    gsap.to(
      [".Bubble1", ".Bubble2", ".Bubble3"],
      {
        y: -90,
        opacity: 1,
        pointerEvents: "all",
        stagger: 0.2,
      },
      []
    );

    gsap.to(
      ".BubbleLabels",
      {
        opacity: 1,
        pointerEvents: "all",
        delay: 1,
      },
      []
    );
  });

  return (
    <div className="LoginBackground">
      <div className="AppHook">
        <h1 className="HookTitle">List ToGO</h1>
        <div className="HookSlogan">Achieve Success</div>
        <div className="HookDescription">
          List to Go is a fast, simple, and reliable to-do list app designed to
          help you manage your tasks and stay on top of your goals, no matter
          where you are. Whether you're at home, at work, or on the go, List to
          Go ensures that every task is in order and nothing gets forgotten.
        </div>
        <div className="HookSignUp">
          <h1 className="SignUpQuestion">Don't have an account ?</h1>
          <button className="HookSignUpBtn">Sign-up</button>
        </div>
      </div>
      <div className="ThreeBubbles">
        <div className="Bubble1">
          <span class="material-symbols-outlined">desktop_landscape</span>
        </div>
        <div className="Bubble2">
          <FontAwesomeIcon className="ExecuteIcon" icon={faCheck} />
        </div>
        <div className="Bubble3">
          <span class="material-symbols-outlined">celebration</span>
        </div>
        <div className="BubbleLabels">
          <h1 className="PlanBubble">Plan</h1>
          <h1 className="ExecuteBubble">Execute</h1>
          <h1 className="AchieveBubble">Achieve</h1>
        </div>
      </div>
      <div className="LoginSection">
        <div className="LogoBubble">
          <span class="material-symbols-outlined">add_task</span>
        </div>
        <div className="LoginCredentials">
          <div className="UsernameBubble">
            <div className="material-symbols-outlined">
              <span>account_circle</span>
            </div>
          </div>
          <input
            type="text"
            className="UsernameInput"
            placeholder="Username"
            required
          />
          <div className="PasswordBubble">
            <div className="material-symbols-outlined">
              <span>lock</span>
            </div>
          </div>
          <input
            type={Visibility}
            className="PasswordInput"
            placeholder="Password"
            required
          />
          <button className="EyeBubble" onClick={VisibilityChange}>
            <span className="material-symbols-outlined" id="HiddenEye">
              Visibility_off
            </span>
            <span className="material-symbols-outlined" id="SeeEye">
              Visibility
            </span>
          </button>
          <button className="SigninBtn">Sign-in</button>
          <button className="HelpBubble">
            <span className="material-symbols-outlined">question_mark</span>
          </button>
        </div>
        <button className="GoogleAccount">
          <div className="GoogleIcon">
            <FontAwesomeIcon icon={faGoogle} />
          </div>
          <h1 className="GoogleName">Google Account</h1>
        </button>
      </div>
      <div className="RegisterSection"></div>
    </div>
  );
};

export default Login;
