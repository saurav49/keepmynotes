import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, AuthProvider } from "./context/index";

import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
