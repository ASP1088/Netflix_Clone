import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons from React Icons

const Login = () => {
  initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const auth = getAuth();

  const validateField = (fieldName, value) => {
    if (fieldName === "email") {
      return /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(value);
    }
    if (fieldName === "password") {
      return value.length >= 6;
    }
    return false;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    if (isLoginPage) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate("/dashboard"))
        .catch(() => setUserExist(true));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => navigate("/login"))
        .catch(() => setIsEmailUsed(true));
    }
  };

  useEffect(() => {
    setUserExist(false);
    setIsEmailUsed(false);
  }, [location]);

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{isLoginPage ? "Sign In" : "Register"}</h1>
        <br />
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          {!emailValid && <p className="text-danger">Email is invalid/blank</p>}
          <div className="password-input-container" style={{ position: "relative" }}>
            <input
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} color="red" /> // Red crossed eye when visible
              ) : (
                <AiFillEye size={20} color="green" /> // Green eye when hidden
              )}
            </button>
          </div>
          {!passwordValid && <p className="text-danger">Password is invalid/blank</p>}
          <button type="submit" className="btn btn-danger btn-block">
            {isLoginPage ? "Sign In" : "Register"}
          </button>
        </form>
        {isLoginPage && (
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
            />
            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
              <span className="p-2">Remember Me</span>
              <span className="float-end">
                <a href="#">Need help?</a>
              </span>
            </label>
          </div>
        )}
        <br />
        {isUserExist && <p className="text-danger">User does not exist | Go for Signup</p>}
        {isEmailUsed && <p className="text-danger">Email already in use | Go for Sign In</p>}
        <div className="login-form-other mt-3">
          <div className="login-signup-now">
            {isLoginPage ? "New to Netflix?" : "Existing User"}&nbsp;
            <Link to={isLoginPage ? "/register" : "/login"}>
              {isLoginPage ? "Sign up now" : "Sign In"}
            </Link>
            .
          </div>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <a href="#">Learn more.</a>
          </small>
        </div>
      </div>
      <div className="shadow"></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
};

export default Login;