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
      <Col sm="3">
        <React.Fragment>
          <Card
            className="box"
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
  // state = {
  //   items: [],
  //   selectedPose: ""
  // };

  render() {
    const { items, selectedPose } = this.props;
    console.log("props - screen" + this.props);
    return (
      <React.Fragment>
        <Header></Header>
        <Container>
          <Row className="m-3">
            {items && items.length
              ? items.map(item => {
                  console.log(item.id);
                  return (
                    <Item
                      key={item.id}
                      item={item.data()}
                      onAddToCartClicked={this.props.onAddToCartClicked}
                    />
                  );
                })
              : null}
          </Row>
        </Container>
        <ContanerFab>
          <Link
            href="/practice"
            tooltip="Create note link"
            icon="far fa-sticky-note"
          />
          {/* <Link href="#" tooltip="Add user link" icon="fas fa-user-plus" />
          className="fab-item btn btn-link btn-lg text-white" */}
          {selectedPose && (
            <ButtonFab
              tooltip="Launch Pose Tracker"
              icon="fas fa-play"
              onClick={() => <PoseNet pose={selectedPose} />}
            />
          )}
        </ContanerFab>
      </React.Fragment>
    );
  }
}

export default Screen;
