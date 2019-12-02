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

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  this.getUser();
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
