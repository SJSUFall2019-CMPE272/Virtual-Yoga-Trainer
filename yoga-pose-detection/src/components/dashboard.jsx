import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Media } from 'reactstrap';
import Header from './Header'
import firebase from "firebase";    //firebase auth

import "./dashboard.css";
import { stringByteLength } from "@tensorflow/tfjs-core/dist/io/io_utils";

class Dashboard extends Component {
  state = {
    loaded: false
  }
  props = {
    user: localStorage.getItem('user')
  }

  componentDidMount(){
    console.log('at dashboard');
    var user = firebase.auth().currentUser;
    var email;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      console.log('user found');
      email = user.email;
      var docRef = firebase.firestore().collection("userData").where("email", "==", email)
      .get()
      .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                localStorage.setItem('newUser', false);
                console.log("newUser set to false = ", localStorage.getItem('newUser'));
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        if(localStorage.getItem('newUser') != false){
          console.log("new user data added");
          console.log("newUser = ", localStorage.getItem('newUser'));
          firebase.firestore().collection("userData").add({
            email: email
          })
        }
      } else {
        // No user is signed in.
      }
    });
}

  render() {
    return (
      <div>
        <Header></Header>
        <div className="dashboard">
        <Container>
          <Row style= {{ padding: '60px'}}>
            <Col className="col1" style= {{ alignItems: 'right'}}>
            <Row style= {{ justifyContent: 'center'}}><Media
             src={ localStorage.getItem('photoURL')}
             style = {{maxHeight: '256px', maxWidth: '256px', borderRadius: '20px'}}
             /></Row>
              <Row style= {{ justifyContent: 'center'}}>{ localStorage.getItem('name') }</Row>
              <Row style= {{ justifyContent: 'center'}}>{ localStorage.getItem('email') }</Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    );
  }
}

export default Dashboard;
