import React from "react";
import firebase from "firebase";
import fire from "../config/fire";
import { UncontrolledAlert } from 'reactstrap';
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
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    loggedin: false,
    email: "",
    password: "",
    loginerror: false
  };
  provider = new firebase.auth.GoogleAuthProvider();

  firsttime() {
    firebase.firestore().collection("userData").where("email", "==", localStorage.getItem('email')).get().then(
      (querySnapshot) => {
        console.log("Inside querysnapshot",querySnapshot);
        var nw = true;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            nw = false;
            console.log("User exists")
            console.log(doc.id, " => ", doc.data());
        });
        if (nw){
          console.log("New user");
            //Assuming new user so inserting stuff
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ ' ' + today.getUTCHours() + ':' + today.getUTCMinutes() + ':' + today.getUTCSeconds();
            let newUser = {
              email: localStorage.getItem('email'),
              lastLogin: date,
              name: localStorage.getItem('name'),
              poseHistory: {},
              posesCompleted: [],
              totalUsage: 1,
              userImg: localStorage.getItem('photoURL')
            };
            firebase.firestore().collection('userData').doc(localStorage.getItem('email')).set(newUser);
            console.log("Created new entry for user");
        }
  }
    )
}

  login(e) {
    this.setState({loginerror: false});
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => { 
      var user = fire.auth().currentUser;
      localStorage.setItem('name', user.email);
      localStorage.setItem('email', user.email);
      localStorage.setItem('photoURL', "https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person.png");
      //check if firsttime
      this.firsttime();
      localStorage.setItem('user', u);
      })
      .catch(error => {
        this.setState({loginerror: error.message})
        console.log(error);
      });
  }

  login_google(e) {
    e.preventDefault();
    this.setState({loginerror: false});
    fire
      .auth()
      .signInWithPopup(this.provider)
      .then((result) => {
        console.log(result);
        var user = fire.auth().currentUser;
        localStorage.setItem('name', user.displayName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('photoURL', user.photoURL);
        //check if firsttime
        this.firsttime();
        localStorage.setItem('user', fire.auth().currentUser);
        this.setState({loggedin: true});
      })
      .catch(error => {
        console.log(error);
        this.setState({loginerror: error.message})
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log("At login page");
    const user = localStorage.getItem('user');
    console.log(this.state.user);
    return (
      <div>
  {  user !=undefined  && <Redirect to={{ pathname: "/dashboard" }} /> }
  { user == undefined &&
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
              { this.state.loginerror && <UncontrolledAlert color="danger">
      { this.state.loginerror}
    </UncontrolledAlert> }
            </Col>
            <Col></Col>
          </Row>
          <Row></Row>
        </Container>
    }
    </div>
    );
  }
}

export default Login;
