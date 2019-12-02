import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import Header from './Header'

import "./dashboard.css";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header></Header>
      <div className="dashboard">
      <Container>
      <Row>
        <Col className="col1" xs="2">oh ya ye</Col>
        <Col className="col2" xs="auto">This is dashboard <Link to="/posenet">posenet</Link></Col>
        <Col className="col3" xs="3">ya ya ya</Col>
      </Row>
        </Container>
      </div>
      </div>
    );
  }
}

export default Dashboard;
