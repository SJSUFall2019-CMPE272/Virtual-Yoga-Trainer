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
        const db = firebase.firestore();
        var posesRef = db.collection('poses');
        console.log("Here "+ posesRef);
        var allPoses = posesRef.get().then(snapshot => {
            var previous = this.state.items;
            snapshot.forEach(pose => {
              console.log(pose.id, '=>', pose.data());
              previous.push(pose.data());
            });
            this.setState({items: previous});
            //console.log("Here "+this.state.items);
          }
          )
          .catch(err => {
            console.log('Error getting documents', err);
          });
        
        //this.render();
    
  }

  render() {
    console.log("State : " + this.state.items);
    return (
      <Container fluid>
        <Row>
          { this.state.items && this.state.items.length ? this.state.items.map(item =>{
            console.log(item)
            return (
              <Item
                item={item}
                onClickDescription={this.handleOnClickDescription}
              //  onClickStartPractice = {this.handleOnClickStartPractice}
              />
            )
          }): null}
            
        </Row>
        
      </Container>
    );
  }
}

export default Screen;