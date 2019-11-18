import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import PoseDetection from "./components/poseDetection";
import PoseNet from "./components/Camera";

//ReactDOM.render(<PoseDetection />, document.getElementById("root"));

ReactDOM.render(<PoseNet />, document.getElementById("root"));
