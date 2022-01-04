import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTheme, useAuth } from "../../hooks/index";
import { HiEye, HiOutlineEyeOff, RiLoginCircleLine } from "../../Icons/Icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { checkInputField } from "../../utils";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const defaultUser = { email: "user1@gmail.com", password: "Users49!" };

  const [email, setEmail] = useState(defaultUser.email);
  const [password, setPassword] = useState(defaultUser.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { handleLogin, isLoading } = useAuth();

  const navigateToSignUpPage = () => {
    navigate("/SignUp");
  };

  const handleUserCredentials = async (email, password) => {
    if (checkInputField(email) === "EMPTY") {
      return setError("Email cannot be Empty");
    }

    if (checkInputField(password) === "EMPTY") {
      return setError("Password cannot be Empty");
    }

    const responseStatus = await handleLogin({ email, password });
    if (responseStatus) {
      setEmail("");
      setPassword("");
      setError("");
      setShowPassword(false);
    } else {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
  };

  useEffect(() => {
    return () => {
      setEmail();
      setPassword();
      setShowPassword(false);
      setError();
    };
  }, []);

  return (
    <div
      className={
        theme === "DARK"
          ? `${styles.loginPage} ${styles.loginPageDark}`
          : `${styles.loginPage} ${styles.loginPageLight}`
      }
    >
      <div
        className={
          theme === "DARK"
            ? `${styles.loginComponent} ${styles.loginComponentDark}`
            : `${styles.loginComponent} ${styles.loginComponentLight}`
        }
      >
        <h2>Welcome Back</h2>
        <p className={styles.navigateBtn}>
          Don't Have An Account
          <span
            style={theme === "DARK" ? { color: "#FFF" } : { color: "#333" }}
            onClick={() => navigateToSignUpPage()}
          >
            Sign Up
          </span>
        </p>

        <div className={styles.inputComponent}>
          <input
            className={
              theme === "DARK" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputComponent} style={{ marginLeft: "1.1em" }}>
          <input
            className={
              theme === "DARK" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            type={showPassword ? "text" : "password"}
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
        {error.length > 0 && <span> {error} </span>}
        <button
          className={
            theme === "DARK"
              ? `${styles.btn} ${styles.btnDark}`
              : `${styles.btn} ${styles.btnLight}`
          }
          onClick={() => handleUserCredentials(email, password)}
        >
          {isLoading ? (
            <Loader type="ThreeDots" color="#94a3b8" height={25} width={80} />
          ) : (
            <>
              Login <RiLoginCircleLine className={styles.btnIcon} />
            </>
          )}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export { Login };
