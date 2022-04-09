import { useState, createContext } from "react";
import { SIGNUP_API, LOGIN_API } from "../urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedToken =
    JSON.parse(localStorage?.getItem("keepmynote__token")) || null;
  const savedUserId =
    JSON.parse(localStorage?.getItem("keepmynote__userId")) || null;

  const navigate = useNavigate();
  const [token, setToken] = useState(savedToken);
  const [userId, setUserId] = useState(savedUserId);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("keepmynote__token");
    localStorage.removeItem("keepmynote__userId");
    localStorage.removeItem("keepmynote__allTags");
    setToken("");
    setUserId("");
    toast.success(`You have successfully logged off`);
    navigate("/login");
  };

  const handleLogin = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(LOGIN_API, { email, password });

      if (data.success) {
        toast.success(`${data.username} has successfully logged in`);
        localStorage.setItem("keepmynote__token", JSON.stringify(data.token));
        localStorage.setItem("keepmynote__userId", JSON.stringify(data.userId));
        setToken(data.token);
        setUserId(data.userId);

        navigate("/");
      } else {
        toast.error(`Login not successful, please try again`);
      }

      setIsLoading(false);
      return data.success;
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleSignUp = async ({ username, email, password }) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post(SIGNUP_API, {
        username,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("keepmynote__token", JSON.stringify(data.token));
        localStorage.setItem("keepmynote__userId", JSON.stringify(data.userId));
        toast.success(`${data.username} has successfully signed up`);
        setToken(data.token);
        setUserId(data.userId);

        navigate("/");
      } else {
        toast.error(`Sign up successful, please try again`);
      }

      setIsLoading(false);
      return data.success;
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
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
        userId,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
