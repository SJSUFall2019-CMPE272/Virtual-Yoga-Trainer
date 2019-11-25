import React from "react";
import firebase from "firebase";
import fire from "../config/fire";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Media } from "reactstrap";
import Logo from "../logo.jpg";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  provider = new firebase.auth.GoogleAuthProvider();
  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  login_google(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithPopup(this.provider)
      .then(function(result) {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col
            style={{
              borderStyle: "solid",
              borderWidth: "0px",
              borderRadius: "5px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              paddingBottom: "100px",
              paddingTop: "20px"
            }}
          >
            <Col style={{ textAlign: "center" }}>
              <img
                src={Logo}
                style={{ width: "100px", height: "100px" }}
                alt="My logo"
              />
            </Col>
            <Form>
              <FormGroup>
                <Label for="exampleInputEmail1">Email address</Label>
                <Input
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  type="email"
                  name="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleInputPassword1">Password</Label>
                <Input
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                  type="password"
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </FormGroup>
              <Button
                color="primary"
                type="submit"
                onClick={this.login.bind(this)}
                class="btn btn-property"
              >
                Login
              </Button>
              <Button
                color="primary"
                onClick={this.signup}
                style={{ marginLeft: "25px" }}
                className="btn-btn-success"
              >
                Signup
              </Button>
            </Form>
            <Row style={{ paddingTop: "40px", justifyContent: "center" }}>
              <Button color="white" onClick={this.login_google.bind(this)}>
                <img
                  style={{ height: "25px", width: "25px" }}
                  class="firebaseui-idp-icon"
                  alt=""
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                />{" "}
                Sign in with Google
              </Button>
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row></Row>
      </Container>
    );
  }
}

export default Login;
