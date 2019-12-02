import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import Header from './Header'
import firebase from "firebase";    //firebase auth

import "./dashboard.css";

class Dashboard extends Component {
  constructor(){
    super()
  this.state = {
    email: "",
    imgURL: "",
    name: ""
  }
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  this.getUser();
}

getUser(){
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;
  var docRef = firebase.firestore().collection("userData").where("email", "==", email)
  .get()
  .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
  this.setState({
    email: email,
    imgURL: photoUrl,
    name: name
  })
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}


  render() {
    return (
      <div>
        <Header></Header>
        <div className="dashboard">
          <div id="mySidebar" class="sidebar">
          <a href="javascript:void(0)" class="closebtn" onClick={() =>this.closeNav()}>&times;</a>
          <img className="img" src={this.state.imgURL} height="30%" width="100%"></img>
          <br/><br/>{this.state.name}<br/><br/><p className="email">{this.state.email}</p>
          </div>
        <div id="main">
          <button class="openbtn" onClick={() =>this.openNav()}>&#9776; My Profile</button>
        </div>
        <Container>
          <Row>
            <Col className="col1" xs="6">col1</Col>
            <Col className="col2" xs="6">col2</Col>
          </Row>
        </Container>
      </div>
    </div>
    );
  }
}

export default Dashboard;
