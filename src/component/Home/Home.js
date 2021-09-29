import styles from "./Home.module.css";
import { NewNote, Notes } from "../index";
import { useTheme } from "../../hooks/index";

const Home = () => {
  const { theme } = useTheme();
  return (
    <div
      className={
        theme === "DARK"
          ? `${styles.home} ${styles.homeDark}`
          : `${styles.home} ${styles.homeLight}`
      }
    >
      <NewNote />
      <Notes />
    </div>
  );
};

export { Home };
