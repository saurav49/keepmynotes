import { useState, createContext } from "react";
import { SIGNUP_API, LOGIN_API } from "../urls";
import axios from "axios";
import {
  isMatch,
  checkInputField,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleLogin = async ({ email, password }) => {
    if (checkInputField(email) === "EMPTY") {
      return setError("Email cannot be Empty");
    }

    if (checkInputField(password) === "EMPTY") {
      return setError("Password cannot be Empty");
    }

    const {
      data: { success, token, username },
    } = await axios.post(LOGIN_API, { email, password });

    if (success) {
      toast.success(`${username} has successfully logged in`);
      localStorage.setItem("token", token);
      setError("");
      setEmail("");
      setPassword("");
    } else {
      toast.error(`Login not successful, please try again`);
    }
  };

  const handleSignUp = async ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
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

    const {
      data: {
        success,
        token,
        username: { userName },
      },
    } = await axios.post(SIGNUP_API, {
      username,
      email,
      password,
    });

    if (success) {
      localStorage.setItem("token", token);
      toast.success(`${username} has successfully signed up`);
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      toast.error(`Sign up successful, please try again`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleSignUp,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
