import React, { Component, useState } from "react";
import firebase from 'firebase'
import fire from '../config/fire'
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from "reactstrap";
import {
  Row,
  Col,
  Container,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
//import "../App.css";
//import axios from "axios";


class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

    return (
      <Col sm="3">
        <React.Fragment>
          <Card className="box">
            <CardImg
              class="card-img-top"
              top
              width="100%"
              src={this.props.item.imgSrc}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle className="font-weight-bold">
                {this.props.item.poseName}
              </CardTitle>
              <CardText className="text-right font-weight-bold">
                ${" "}
                {this.props.item.desc
                }
              </CardText>
              {/* <Button>Info</Button> */}
              <Button
                buttonLabel="Info"
               // className="buttonLabel"
                item={this.props.item}
                onClickDescription={this.props.onClickDescription}
              />
              <Button
                buttonLabel="Start"
               // className="buttonLabel"
                item={this.props.item}
             //   onClickDescription={this.props.onClickStartPractice}
              />
            </CardBody>
          </Card>
        </React.Fragment>
      </Col>
    );
  }
}

class Screen extends Component {
  state = {
    items: []
  };

  handleOnClickDescription = item => {
   
 
  };

  

  componentDidMount() {
      
        const admin = require('firebase-admin');
        
        admin.initializeApp({ credential: admin.credential.applicationDefault()});
        const db = admin.firestore();
        if (firebase.auth.currrentUser != null)
        {
        firebase.auth.currrentUser.getIdToken();

        //var userId = firebase.auth().currentUser.uuid;
        let posesRef = db.collection('poses');
        let allPoses = posesRef.get().then(snapshot => {
            snapshot.forEach(pose => {
              console.log(pose.id, '=>', pose.data());
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
        }
       // const items = res.data;
        //console.log(items);
        //this.setState({ items });
    
  }

  render() {
    console.log("State : " + this.state.items);
    return (
      <Container fluid>
      
        <Row>
          {this.state.items.map(item => (
            <Item
              item={item}
              onClickDescription={this.handleOnClickDescription}
            //  onClickStartPractice = {this.handleOnClickStartPractice}
              on
            />
          ))}
        </Row>
        
      </Container>
    );
  }
}

export default Screen;