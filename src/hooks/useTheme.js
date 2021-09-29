import { useContext } from "react";
import { ThemeContext } from "../context/index";

export const useTheme = () => {
  return useContext(ThemeContext);
};
