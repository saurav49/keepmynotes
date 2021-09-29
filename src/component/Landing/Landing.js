import { BsArrowRight } from "../../Icons/Icons";
import styles from "./Landing.module.css";
import { useTheme } from "../../hooks";
import { BrandImage } from "../../img/index";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={
        theme === "DARK"
          ? `${styles.landing} ${styles.landingDark}`
          : `${styles.landing} ${styles.landingLight}`
      }
    >
      <div className={styles.landingInfo}>
        <h1>Tame your work, organize your life</h1>
        <p>
          Remember everything and tackle any project with your notes, tasks, and
          schedule all in one place.
        </p>
        <button
          className={
            theme === "DARK"
              ? `${styles.btn} ${styles.btnDark}`
              : `${styles.btn} ${styles.btnLight}`
          }
          onClick={() => navigate("/home")}
        >
          Start Doing
          <BsArrowRight style={{ marginLeft: "0.5em", fontSize: "1.5rem" }} />
        </button>
      </div>
      <div className={styles.brandImage}>
        <BrandImage
          style={{
            width: "100%",
            minWidth: "320px",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};
