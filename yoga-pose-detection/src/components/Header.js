import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Redirect } from "react-router-dom";
import { browserHistory } from "react-router";
import fire from "../config/fire";
import firebase from "firebase";
import "./Header.css";

import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button
} from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      item: "",
      itemSubTotal: 0,
      price: 0,
      orderedItems: [],
      redirectToLogin: false
    };
  }

  logout = () => {
    // update session time
    fire
      .auth()
      .signOut()
      .then(() => {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " " +
          today.getUTCHours() +
          ":" +
          today.getUTCMinutes() +
          ":" +
          today.getUTCSeconds();
        firebase
          .firestore()
          .collection("userData")
          .doc(localStorage.getItem("email"))
          .update({ lastLogin: date });
        //update user login time
        localStorage.removeItem("user");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("photoURL");
        this.setState({ user: false });
        this.setState({ redirectToLogin: true });
        console.log("Redirecting");
      });
  };

  render() {
    const user = localStorage.getItem("user");
    console.log("at header -> user", user);
    return (
      <div>
        {user == null && (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )}
        {this.state.redirectToLogin && (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )}
        {user != null && this.state.redirectToLogin == false && (
          <div className="header">
            <Navbar color="" light expand="md">
              <h1 style={{ color: "red" }}>
                <span className="font-weight-bold"> Yoga Trainer</span>
              </h1>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/screen">Poses</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.logout()}>Logout</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
