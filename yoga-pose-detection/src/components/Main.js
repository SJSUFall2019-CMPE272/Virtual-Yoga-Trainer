import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Practice from "./Practice";
import Dashboard from "./dashboard.jsx";
import Screen from "./Screen.jsx";
import PoseNet from "./Camera";
import firebase from "firebase";
import fire from "../config/fire";

class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/screen" component={Screen} />
        <Route path="/header" component={Header} />
        <Route path="/practice" component={PoseNet} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default Main;
