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

function App() {
  const { status } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadNotes());
    }

    // const tag = localStorage.setItem("allTags", JSON.stringify(tags));
  }, [status, dispatch]);

  return (
    <div className="App">
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
