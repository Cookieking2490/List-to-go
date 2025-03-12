import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import gsap from "gsap";

const Login = () => {
  const [Visibility, setVisibility] = useState("password");
  const [Mode, setMode] = useState("login");

  useEffect(() => {
    gsap.fromTo(
      ".LoginHook",
      { x: -100, opacity: 0 },
      { duration: 1, x: 0, opacity: 1 }
    );

    gsap.fromTo(
      ".LoginSection",
      { x: 100, opacity: 0 },
      { duration: 1, x: 0, opacity: 1 }
    );

    gsap.fromTo(
      [".Bubble1", ".Bubble2", ".Bubble3"],
      { y: 100, opacity: 0 },
      { duration: 0.5, y: 0, opacity: 1, stagger: 0.5 }
    );

    gsap.to(".LabelsSection", { opacity: 1, duration: 1, delay: 1.5 });
  }, []);

  useEffect(() => {
    if (Visibility == "text") {
      gsap.to("#SeeEye", { opacity: 1, duration: 0.5 });
      gsap.to("#HiddenEye", { opacity: 0, duration: 0.5 });
    } else if (Visibility == "password") {
      gsap.to("#HiddenEye", { opacity: 1, duration: 0.5 });
      gsap.to("#SeeEye", { opacity: 0, duration: 0.5 });
    }
  }, [Visibility]);

  useEffect(() => {
    if (Mode == "login") {
      gsap.to(".LoginSection", {
        x: 0,
        opacity: 1,
        pointerEvents: "all",
        duration: 1,
      });
      gsap.to(".HookQuestion", {
        opacity: 1,
        pointerEvents: "all",
        duration: 1,
      });
      gsap.to(".HookQuestionSignUp", {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
      });

      gsap.to(".HookSignUpBtn", {
        opacity: 1,
        pointerEvents: "all",
        duration: 1,
      });
      gsap.to(".HookLoginBtn", {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
      });

      gsap.to(".RegistrationSection", {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
      });
    } else if (Mode == "signup") {
      gsap.to(".LoginSection", {
        x: 100,
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
      });
      gsap.to(".HookQuestion", {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
      });
      gsap.to(".HookQuestionSignUp", {
        opacity: 1,
        pointerEvents: "all",
        duration: 1,
      });

      gsap.to(".HookSignUpBtn", {
        opacity: 0,
        pointerEvents: "none",
        duration: 1,
      });
      gsap.to(".HookLoginBtn", {
        opacity: 1,
        pointerEvents: "all",
        duration: 1,
      });

      gsap.to(".RegistrationSection", {
        opacity: 1,
        pointerEvents: "all",
        duration: 1,
      });
    }
  }, [Mode]);

  const VisibilityShift = () => {
    if (Visibility == "text") {
      setVisibility("password");
    } else if (Visibility == "password") {
      setVisibility("text");
    }
  };

  const ModeShift = () => {
    if (Mode == "login") {
      setMode("signup");
    } else if (Mode == "signup") {
      setMode("login");
    }
  };

  return (
    <div className="LoginBackGround">
      <div className="LoginHook">
        <h1 className="HookTitle">List ToGo</h1>
        <h2 className="HookSlogan">Achieve Success</h2>
        <div className="HookDescriptionSection">
          <p className="HookDescription">
            List to Go is a fast, simple, and reliable to-do list app designed
            to help you manage your tasks and stay on top of your goals, no
            matter where you are. Whether you're at home, at work, or on the go,
            List to Go ensures that every task is in order and nothing gets
            forgotten.
          </p>
        </div>
        <div className="HookSignUp">
          <h2 className="HookQuestion">Don't have an account ?</h2>
          <h2 className="HookQuestionSignUp">Have an account ?</h2>
          <button className="HookSignUpBtn" onClick={ModeShift}>
            Sign-up
          </button>
          <button className="HookLoginBtn" onClick={ModeShift}>
            Login
          </button>
        </div>
      </div>
      <div className="BubbleSection">
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
        </div>
        <div className="LabelsSection">
          <h1 className="PlanLabel">Plan</h1>
          <h1 className="ExecuteLabel">Execute</h1>
          <h1 className="AchieveLabel">Achieve</h1>
        </div>
      </div>
      <div className="LoginSection">
        <div className="LogoSection">
          <div className="LogoBubble">
            <span class="material-symbols-outlined">add_task</span>
          </div>
          <div className="CredentialsSection">
            <div className="UsernameSection">
              <div className="material-symbols-outlined">
                <span>account_circle</span>
              </div>
              <input
                type="text"
                className="UsernameInput"
                placeholder="Username"
                required
              />
            </div>
            <div className="PasswordSection">
              <div className="material-symbols-outlined">
                <span>lock</span>
              </div>
              <input
                type={Visibility}
                className="PasswordInput"
                placeholder="Password"
                required
              />
            </div>
            <button className="LoginBtn">Login</button>
          </div>
        </div>
        <button className="VisualSection" onClick={VisibilityShift}>
          <span className="material-symbols-outlined" id="HiddenEye">
            Visibility_off
          </span>
          <span className="material-symbols-outlined" id="SeeEye">
            Visibility
          </span>
        </button>
        <div className="HelpSection">
          <span className="material-symbols-outlined">question_mark</span>
        </div>
        <div className="GoogleSection">
          <button className="GoogleApiBtn">
            <FontAwesomeIcon className="GoogleLogo" icon={faGoogle} />
            <h1 className="GoogleLabel">Google Account</h1>
          </button>
        </div>
      </div>
      <div className="RegistrationSection"></div>
    </div>
  );
};

export default Login;
