import React, { Component, useState } from "react";
import { Fragment } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";

import firebase from 'firebase'
import fire from '../config/fire'
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from "reactstrap";
import Header from './Header.js'
import { Redirect } from "react-router-dom";

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

import ModalExample from "./modal";


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
              <CardTitle className="text-center font-weight-bold">
                {this.props.item.poseName}
              </CardTitle>
              <CardText className="text-center font-weight-bold">
                {" "}
                {this.props.item.desc
                }
              </CardText>
              
              <Fragment>
                <MDBBtn color="primary" size="sm" >

                <MDBIcon icon="info" className="mr-1" />
               
                </MDBBtn>
      
              </Fragment>
              
              
              <ModalExample
                buttonLabel="More Info"
                className="buttonLabel"
                item={this.props.item}
                
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
      <React.Fragment>
      <Header></Header>
      <Container fluid>
        <Row>
          { this.state.items && this.state.items.length ? this.state.items.map(item =>{
            console.log(item)
            return (
              <Item
                item={item} 
              />
            )
          }): null}            
        </Row>
      </Container>
      </React.Fragment>
    );
  }
}



export default Screen;