import React from "react";
import fire from "../config/fire";
import Practice from "./Practice";
import PoseNet from "./Camera";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard";
import imagePath from "./../jojo_test2.jpg";

class Home extends React.Component {
  state = {
    poses: [
      {
        poseName: "Mountain Pose",
        sanskritName: "teddhasana",
        imgSrc: "http://sdfsdf",
        difficulty: 1,
        desc: "sfsd sdfsdf sdffdd fsfghfg",
        benefits: ["abc", "def", "ghi"]
      }
    ],
    selectedPose: {
      poseName: "Mountain Pose",
      sanskritName: "teddhasana",
      imgSrc: "http://sdfsdf",
      difficulty: 1,
      desc: "sfsd sdfsdf sdffdd fsfghfg",
      benefits: ["abc", "def", "ghi"]
    }
  };

  render() {
    return (
      <React.Fragment>
        <div>Home -> render navbar</div>

        <Switch>
          <Route
            path="/posenet"
            render={() => <PoseNet pose={this.state.selectedPose} />}
          />
          <Route path="/" component={Dashboard} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default Home;
