import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { useTheme, useAuth } from "../../hooks/index";
import { HiEye, HiOutlineEyeOff, BsPeopleCircle } from "../../Icons/Icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isMatch,
  checkInputField,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils";

const Signup = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleSignUp } = useAuth();

  const handleUserCredentials = async (
    username,
    email,
    password,
    confirmPassword
  ) => {
    if (checkInputField(username) === "EMPTY") {
      return setError(`username cannot be Empty`);
    }

    if (checkInputField(email) === "EMPTY") {
      return setError(`email cannot be Empty`);
    }

    if (checkInputField(password) === "EMPTY") {
      return setError(`password cannot be Empty`);
    }

    if (!isMatch(password, confirmPassword)) {
      return setError("Password and ConfirmPassword Should Match");
    }

    if (!validateEmail(email)) {
      return setError("Enter a valid Email");
    }

    if (!validatePassword(password)) {
      return setError(
        "Password should contain atleast 6 characters of atleast lowercase, uppercase and numeric integer"
      );
    }

    if (!validateUsername(username)) {
      return setError("Enter a valid Username");
    }

    const responseStatus = await handleSignUp({ username, email, password });
    console.log({ responseStatus });
    if (responseStatus) {
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div
      className={
        theme === "DARK"
          ? `${styles.signupPage} ${styles.signupPageDark}`
          : `${styles.signupPage} ${styles.signupPageLight}`
      }
    >
      <div
        className={
          theme === "DARK"
            ? `${styles.signupComponent} ${styles.signupComponentDark}`
            : `${styles.signupComponent} ${styles.signupComponentLight}`
        }
      >
        <h2>Create Account</h2>
        <p className={styles.navigateBtn}>
          Already Have An Account
          <span
            onClick={() => navigateToLoginPage()}
            style={theme === "DARK" ? { color: "#FFF" } : { color: "#333" }}
          >
            Login
          </span>
        </p>

        <div className={styles.inputComponent}>
          <input
            className={
              theme === "DARK" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputComponent}>
          <input
            className={
              theme === "DARK" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className={styles.inputComponent} style={{ marginLeft: "1.1em" }}>
          <input
            className={
              theme === "DARK" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="password"
            type={!showPassword ? "password" : "text"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword ? (
            <HiEye
              onClick={() => setShowPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          ) : (
            <HiOutlineEyeOff
              onClick={() => setShowPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          )}
        </div>
        <div className={styles.inputComponent} style={{ marginLeft: "1.1em" }}>
          <input
            className={
              theme === "DARK" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="confirmpassword"
            type={!showConfirmPassword ? "password" : "text"}
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!showConfirmPassword ? (
            <HiEye
              onClick={() => setShowConfirmPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          ) : (
            <HiOutlineEyeOff
              onClick={() => setShowConfirmPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          )}
        </div>
        <p>{error !== "" && error}</p>
        <button
          disabled={password !== confirmPassword}
          className={
            theme === "DARK"
              ? `${styles.btn} ${styles.btnDark}`
              : `${styles.btn} ${styles.btnLight}`
          }
          onClick={() =>
            handleUserCredentials(username, email, password, confirmPassword)
          }
        >
          Sign Up <BsPeopleCircle className={styles.btnIcon} />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export { Signup };
