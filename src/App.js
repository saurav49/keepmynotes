import { useEffect } from "react";
import "./App.css";
import {
  Landing,
  Navbar,
  Signup,
  Login,
  Home,
  PrivateRoute,
} from "./component/index";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadNotes } from "./features/notes/noteSlice";
import { useAuth } from "./hooks/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const { status } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  let { userId, token } = useAuth();
  if (!token) {
    token = JSON.parse(localStorage?.getItem("keepmynote__token"));
  }
  token && (axios.defaults.headers.common["Authorization"] = token);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadNotes(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, userId]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
