import { useState, createContext } from "react";
import { SIGNUP_API, LOGIN_API } from "../urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedToken = JSON.parse(localStorage?.getItem("token")) || null;

  const navigate = useNavigate();
  const [token, setToken] = useState(savedToken);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await axios.post(LOGIN_API, { email, password });

      if (data.success) {
        toast.success(`${data.username} has successfully logged in`);
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
      } else {
        toast.error(`Login not successful, please try again`);
      }

      return data.success;
    } catch (error) {
      console.log({ error });
      toast.error(error.message);
    }
  };

  const handleSignUp = async ({ username, email, password }) => {
    try {
      const { data } = await axios.post(SIGNUP_API, {
        username,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", JSON.stringify(data.token));
        toast.success(`${data.username} has successfully signed up`);
        setToken(data.token);
      } else {
        toast.error(`Sign up successful, please try again`);
      }

      return data.success;
    } catch (error) {
      console.log({ error });
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleLogin,
        handleLogout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
