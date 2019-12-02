import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Redirect } from "react-router-dom";
import { browserHistory } from "react-router";
import fire from "../config/fire";
import './Header.css';

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
    fire.auth().signOut().then(()=> {
        localStorage.removeItem('user');
        this.setState({user: false});
        this.setState({redirectToLogin: true});
        console.log("Redirecting");
    })
  };

  render() {
      const user = localStorage.getItem('user');
    return (
        <div>
          { user == null && ( <Redirect
            to={{
              pathname: "/login"
            }}
          />) }
        {this.state.redirectToLogin && (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )}
        {user != null && this.state.redirectToLogin == false && (<div className="header">
          <Navbar color="" light expand="md">
            <h1 style={{ color: "red" }}>
              <span className="font-weight-bold">Yogi</span>
            </h1>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/screen">Poses</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret onClick={this.getCartItems}>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Button onClick={() => this.logout()} color="success">
                      SignOut
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar>
        </div>)}
        </div>
    );
  }
}

export default Header;