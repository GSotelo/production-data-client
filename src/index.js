import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./index.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
