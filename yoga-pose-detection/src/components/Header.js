import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { Redirect } from "react-router-dom";
import { browserHistory } from "react-router";
import fire from "../config/fire";

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
        this.setState({user: false});
        this.setState({redirectToLogin: true});
        console.log("Redirecting");
    })
  };

  render() {
    return (
      <React.Fragment>
        {this.state.redirectToLogin && (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )}
        <div className="header">
          <Navbar color="" light expand="md">
            <h1 style={{ color: "red" }}>
              <span className="font-weight-bold">Yogi</span>
            </h1>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/poses">Poses</NavLink>
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
        </div>
      </React.Fragment>
    );
  }
}

export default Header;