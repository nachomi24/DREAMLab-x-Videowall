import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import VideoWall from "./Videowall.jsx";
import "./Videowall.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VideoWall />
  </React.StrictMode>
);
