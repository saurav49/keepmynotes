import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTheme } from "../../hooks/index";
import { HiEye, HiOutlineEyeOff, RiLoginCircleLine } from "../../Icons/Icons";
import { useAuth } from "../../hooks/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    handleLogin,
  } = useAuth();

  const navigateToSignUpPage = () => {
    navigate("/SignUp");
  };

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
          onClick={() => handleLogin({ email, password })}
          disabled={error.length > 0}
        >
          Login <RiLoginCircleLine className={styles.btnIcon} />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export { Login };
