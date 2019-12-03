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
  state = {
    items: [],
    selectedPose: ""
  };

  handleAddToCartClicked = item => {
    console.log("selected", item);
    this.setState({ selectedPose: item });
    localStorage.setItem('selectedPose', JSON.stringify(item));
    //Post to cart
  };

  componentDidMount() {
    const db = firebase.firestore();
    var posesRef = db.collection("poses");
    console.log("Here " + posesRef);
    var allPoses = posesRef
      .get()
      .then(snapshot => {
        var previous = this.state.items;
        snapshot.forEach(pose => {
          console.log(pose.id, "=>", pose.data());
          //pose.data()["id"] = pose.id;
          previous.push(pose);
        });
        this.setState({ items: previous });
        //console.log("Here "+this.state.items);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    //this.render();
  }

  render() {
    return (
      <div>
        <Route
          path="/screen"
          render={() => (
            <Screen
              onAddToCartClicked={this.handleAddToCartClicked}
              items={this.state.items}
              selectedPose={this.state.selectedPose}
            />
          )}
        />
        <Route path="/header" component={Header} />
        <Route
          path="/practice"
          //component={PoseNet}
          //render={() => <PoseNet  />}
          component={() => <PoseNet />}
        />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default Main;
