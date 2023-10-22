import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.scss";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
