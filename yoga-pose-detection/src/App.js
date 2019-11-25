import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import fire from "./config/fire";
import PoseDetection from "./components/poseDetection";
import PoseNet from "./components/Camera";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
class App extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <React.Fragment>{this.state.user ? <Home /> : <Login />}</React.Fragment>
    );
  }
}
export default App;
