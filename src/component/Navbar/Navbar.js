import Switch from "react-switch";
import { useTheme } from "../../hooks/index";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { handleLogout, token } = useAuth();

  const handleChange = () => {
    setTheme(theme === "DARK" ? "LIGHT" : "DARK");
  };

  return (
    <>
      <div
        className={
          theme === "DARK"
            ? `${styles.navbar} ${styles.navbarDark}`
            : `${styles.navbar} ${styles.navbarLight}`
        }
      >
        <Link
          to="/"
          className={
            theme === "DARK"
              ? `${styles.link} ${styles.linkDark}`
              : `${styles.link} ${styles.linkLight}`
          }
        >
          <h1 className={styles.brandName}>KeepMyNotes</h1>
        </Link>
        <div className={styles.userAccess}>
          {!token && (
            <Link
              to="/signup"
              className={
                theme === "DARK"
                  ? `${styles.link} ${styles.linkDark}`
                  : `${styles.link} ${styles.linkLight}`
              }
            >
              <li
                className={
                  theme === "DARK"
                    ? `${styles.linkbtn} ${styles.linkBtnDark}`
                    : `${styles.linkbtn} ${styles.linkBtnLight}`
                }
              >
                Sign up
              </li>
            </Link>
          )}
          {token ? (
            <button
              className={
                theme === "DARK"
                  ? `${styles.logoutBtn} ${styles.logoutBtnDark}`
                  : `${styles.logoutBtn} ${styles.logoutBtnLight}`
              }
              onClick={() => handleLogout()}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className={
                theme === "DARK"
                  ? `${styles.link} ${styles.linkDark}`
                  : `${styles.link} ${styles.linkLight}`
              }
            >
              <li>Log in</li>
            </Link>
          )}
          <label style={{ margin: "0.7em 0em 0em 0em" }}>
            <Switch
              onChange={handleChange}
              checked={theme === "DARK" ? true : false}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#ddd"
              offColor="#ddd"
              offHandleColor="#333"
            />
          </label>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
