import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

const Login = () => {
  const [Visibility, setVisibility] = useState("password");
  const [Mode, setMode] = useState("login");
  const [ForgetPassMode, setForgetPassMode] = useState("Hidden");
  const [OTPMode, setOTPMode] = useState("hidden");
  const [ChangePassMode, setChangePassMode] = useState("Hidden");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [RegUsername, setRegUsername] = useState("");
  const [RegPassword, setRegPassword] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (ForgetPassMode == "visible") {
      gsap.to(".PopupForgetPassword", {
        opacity: 1,
        pointerEvents: "all",
      });
    } else if (ForgetPassMode == "Hidden") {
      gsap.to(".PopupForgetPassword", {
        opacity: 0,
        pointerEvents: "none",
      });
    }
  }, [ForgetPassMode]);

  useEffect(() => {
    if (OTPMode == "hidden") {
      gsap.to(".OTPModePopup", {
        opacity: 0,
        pointerEvents: "none",
      });
    } else if (OTPMode == "visible") {
      gsap.to(".OTPModePopup", {
        opacity: 1,
        pointerEvents: "all",
      });
    }
  });

  useEffect(() => {
    if (ChangePassMode == "Hidden") {
      gsap.to(".ChangePassPopup", {
        opacity: 0,
        pointerEvents: "none",
      });
    } else if (ChangePassMode == "Visible") {
      gsap.to(".ChangePassPopup", {
        opacity: 1,
        pointerEvents: "all",
      });
    }
  }, [ChangePassMode]);

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

  const ForgetPasswordPopup = () => {
    if (ForgetPassMode == "Hidden") {
      setForgetPassMode("visible");
    } else if (ForgetPassMode == "visible") {
      setForgetPassMode("Hidden");
    }
  };

  const CloseOTPPopup = () => {
    if (OTPMode == "hidden") {
      setOTPMode("visible");
    } else if (OTPMode == "visible") {
      setOTPMode("hidden");
    }
  };

  const HandleLogin = () => {
    fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: Username,
        password: Password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response Data:", data);
        if (data.status === "Success") {
          navigate("/Main");
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const HandleRegister = () => {
    fetch("http://127.0.0.1:8000/registration/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        first_name: FirstName,
        last_name: LastName,
        email: Email,
        username: RegUsername,
        password: RegPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.log("Registration Success:", data);
          alert("Registration successful!");
        } else {
          console.error("Registration error:", data.error);
          alert("Registration failed: " + JSON.stringify(data.error));
        }
      })
      .catch((error) => {
        console.error("Request failed:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const HandleVerification = () => {
    fetch("http://127.0.0.1:8000/send-reset-code/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("Error:", error));
    setForgetPassMode("Hidden");
    setOTPMode("visible");
  };

  const HandleOTPVerification = () => {
    fetch("http://127.0.0.1:8000/verify-reset-code/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, code: enteredCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);

        if (data.success || data.message === "OTP verified successfully") {
          setOTPMode("Hidden");
          setChangePassMode("Visible");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const HandleChangePass = () => {
    fetch("http://127.0.0.1:8000/reset-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, new_password: newPassword }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("Error:", error));
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
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="LoginBtn" onClick={HandleLogin}>
              Login
            </button>
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
        <button className="HelpSection" onClick={ForgetPasswordPopup}>
          <span className="material-symbols-outlined">question_mark</span>
        </button>
        <div className="GoogleSection">
          <button className="GoogleApiBtn">
            <FontAwesomeIcon className="GoogleLogo" icon={faGoogle} />
            <h1 className="GoogleLabel">Google Account</h1>
          </button>
        </div>
      </div>
      <div className="RegistrationSection">
        <div className="LogoSection">
          <div className="LogoBubble">
            <span class="material-symbols-outlined">add_task</span>
          </div>
          <div className="CredentialsSection" id="SignUpCredentials">
            <div className="FirstLastNameSection">
              <input
                type="text"
                className="FirstName"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                className="LastName"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="EmailSection">
              <div className="material-symbols-outlined">
                <span>email</span>
              </div>
              <input
                type="email"
                className="EmailInput"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="UsernameSection">
              <div className="material-symbols-outlined">
                <span id="AC">account_circle</span>
              </div>
              <input
                type="text"
                className="UsernameInput"
                id="SignUpUsername"
                placeholder="Username"
                value={RegUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>
            <div className="PasswordSection" id="SignUpPasswordSection">
              <div className="material-symbols-outlined">
                <span id="LockSignup">lock</span>
              </div>
              <input
                type={Visibility}
                className="PasswordInput"
                placeholder="Password"
                id="SignUpPassword"
                value={RegPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="LoginBtn"
              id="RegisterBtn"
              onClick={HandleRegister}
            >
              Register
            </button>
            <button
              className="VisualSection"
              id="RegisterVisibiltySection"
              onClick={VisibilityShift}
            >
              <span className="material-symbols-outlined" id="HiddenEye">
                Visibility_off
              </span>
              <span className="material-symbols-outlined" id="SeeEye">
                Visibility
              </span>
            </button>
          </div>
        </div>
        <div className="GoogleSection">
          <button className="GoogleApiBtn">
            <FontAwesomeIcon className="GoogleLogo" icon={faGoogle} />
            <h1 className="GoogleLabel">Google Account</h1>
          </button>
        </div>
      </div>
      <div className="PopupForgetPassword">
        <button className="ClosePopupBtn" onClick={ForgetPasswordPopup}>
          <FontAwesomeIcon className="CloseLogo" icon={faXmark} />
        </button>
        <h1 className="ForgotPassword">Forgot Password ?</h1>
        <p className="ForgotExplanation">
          Enter your email below to recieve a code to reset your password
        </p>
        <input
          type="email"
          className="LostEmail"
          value={userEmail}
          onChange={(e) => setuserEmail(e.target.value)}
        />
        <button className="VerifyLostBtn" onClick={HandleVerification}>
          Verify
        </button>
      </div>
      <div className="OTPModePopup">
        <button className="CloseOTPPopup" onClick={CloseOTPPopup}>
          <FontAwesomeIcon className="CloseLogo" icon={faXmark} />
        </button>
        <h1 className="OTPModeTitle">Enter the OTP</h1>
        <p className="OTPModeExplanation">
          Enter the OTP sent to your email to reset your password
        </p>
        <input
          type="number"
          className="OTPModeInput"
          placeholder="Enter OTP"
          onChange={(e) => setEnteredCode(e.target.value)}
        />
        <button className="VerifyOTPBtn" onClick={HandleOTPVerification}>
          Verify
        </button>
      </div>
      <div className="ChangePassPopup">
        <button className="CloseChangePassPopup">
          <FontAwesomeIcon className="CloseLogo" icon={faXmark} />
        </button>
        <h1 className="ChangePassTitle">Change Password</h1>
        <p className="ChangePassExplanation">Enter your new password below</p>
        <input
          type="password"
          className="ChangePassInput"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="ChangePassBtn" onClick={HandleChangePass}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Login;
