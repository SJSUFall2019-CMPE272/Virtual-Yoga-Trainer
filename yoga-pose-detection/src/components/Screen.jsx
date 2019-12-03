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
  Button,
  CardFooter
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
    let color = "";
    if (this.props.highlight) {
      color += "primary";
    }
    let border = { border: "1px solid #9e9e9e" };
    if (this.props.highlight) {
      border = { border: "3px solid #4285f4" };
    }
    //this.props.highlight && "primary";
    return (
      <Col sm="4">
        <React.Fragment>
          <Card
            style={border}
            outline={this.props.highlight}
            color={color}
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
              <CardText className="text-center font-weight-bold"></CardText>
              <Row>
                <Col>
                  <ModalExample
                    buttonLabel="info"
                    className="buttonLabel"
                    item={this.props.item}
                  />
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-muted">
              {this.props.item.sanskritName}

              {this.props.item.difficulty === 1 && (
                <Badge className="float-right" color="success" pill>
                  Easy
                </Badge>
              )}
              {this.props.item.difficulty === 2 && (
                <Badge className="float-right" color="warning" pill>
                  Medium
                </Badge>
              )}
              {this.props.item.difficulty === 3 && (
                <Badge className="float-right" color="danger" pill>
                  Hard
                </Badge>
              )}
            </CardFooter>
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
                  console.log("item", item);
                  console.log(this.isSelected(item.data()));
                  return (
                    <Item
                      key={item.id}
                      item={item.data()}
                      onAddToCartClicked={this.handleAddToCartClicked}
                      highlight={this.isSelected(item.data())}
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

  isSelected = item => {
    console.log("00", item);
    console.log("->", JSON.parse(localStorage.getItem("selectedPose")));
    console.log(
      "comparing",
      item.poseName,
      JSON.parse(localStorage.getItem("selectedPose")).poseName
    );
    console.log(
      "is Selected",
      item.poseName,
      localStorage.getItem("selectedPose") &&
        item.poseName ===
          JSON.parse(localStorage.getItem("selectedPose")).poseName
    );
    return (
      localStorage.getItem("selectedPose") &&
      item.poseName ===
        JSON.parse(localStorage.getItem("selectedPose")).poseName
    );
  };
}

export default Screen;
