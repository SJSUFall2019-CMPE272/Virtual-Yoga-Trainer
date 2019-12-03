import React, { Component, useState } from "react";
import { Fragment } from "react";
import { MDBBtn, MDBIcon } from "mdbreact";
import {
  Container as ContanerFab,
  Button as ButtonFab,
  Link
} from "react-floating-action-button";
import firebase from "firebase";
import fire from "../config/fire";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import Header from "./Header.js";

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
import PoseNet from "./Camera";

class Item extends Component {
  render() {
    console.log(this.props);

    return (
      <Col sm="4">
        <React.Fragment>
          <Card
            className="box m-3"
            onClick={() => this.props.onAddToCartClicked(this.props.item)}
          >
            <CardImg
              className="card-img-top mt-3"
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
                {/* {" "} */}
                {/* {this.props.item.desc} */}
              </CardText>

              {/* <Fragment>
                <MDBBtn color="primary" size="sm">
                  <MDBIcon icon="info" className="mr-1" />
                </MDBBtn>
              </Fragment> */}

              <ModalExample
                buttonLabel="more info"
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
    items: [],
    selectedPose: ""
  };

  handleAddToCartClicked = item => {
    console.log("selected", item);
    this.setState({ selectedPose: item });
    localStorage.setItem("selectedPose", JSON.stringify(item));
    //Post to cart
  };

  componentDidMount() {
    const db = firebase.firestore();
    var posesRef = db.collection("poses");
    console.log("Here " + posesRef);
    var allPoses = posesRef
      .get()
      .then(snapshot => {
        var previous = this.state.items;
        snapshot.forEach(pose => {
          console.log(pose.id, "=>", pose.data());
          previous.push(pose);
        });
        this.setState({ items: previous });
        console.log("previous", previous);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  render() {
    console.log("items : ", this.state.items);
    return (
      <React.Fragment>
        <Header></Header>
        <Container>
          <Row className="m-3">
            {this.state.items && this.state.items.length
              ? this.state.items.map(item => {
                  console.log(item.id);
                  return (
                    <Item
                      key={item.id}
                      item={item.data()}
                      onAddToCartClicked={this.handleAddToCartClicked}
                    />
                  );
                })
              : null}
          </Row>
        </Container>
        <ContanerFab>
          {localStorage.getItem("selectedPose") && (
            <Link
              href="/practice"
              tooltip="Launch Pose Tracker"
              icon="fas fa-play"
            />
          )}
        </ContanerFab>
      </React.Fragment>
    );
  }
}

export default Screen;
