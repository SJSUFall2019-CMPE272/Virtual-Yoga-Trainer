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
    firebase.firestore().collection("userData").where("email", "==", localStorage.getItem('email')).get().then(
      function(querySnapshot) {
        console.log("Inside querysnapshot",querySnapshot);
        var nw = true;
        querySnapshot.forEach(function(doc) {
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
    ).catch(
      function(error) {
        console.log("New user");
            //Assuming new user so inserting stuff
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
    );
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
