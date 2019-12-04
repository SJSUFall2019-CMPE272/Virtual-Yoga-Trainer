import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Media, Badge } from 'reactstrap';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Header from './Header'
import firebase from "firebase";    //firebase auth

import "./dashboard.css";
import { stringByteLength } from "@tensorflow/tfjs-core/dist/io/io_utils";

class Dashboard extends Component {
  state = {
    loaded: false,
    lastLogin: "",
    totalUsage: 0,
    posesCompleted: ['No poses completed'],
    poseHistory: {},
    dataPie: {
      labels: ["Completed", "Incomplete"],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#46BFBD",
            "#F7464A"
          ],
          hoverBackgroundColor: [
            "#5AD3D1",
            "#FF5A5E"
          ]
        }
      ]
    }
  }
  props = {
    user: localStorage.getItem('user')
  }

  componentDidMount(){
    console.log('at dashboard');
    firebase.firestore().collection("userData").where("email", "==", localStorage.getItem('email')).get().then(
      (querySnapshot) => {
        console.log("Inside querysnapshot",querySnapshot);
        var nw = true;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            nw = false;
            console.log("User exists")
            console.log(doc.id, " => ", doc.data());
            var usage = doc.data().totalUsage;
            this.setState({loaded: true, lastLogin: doc.data().lastLogin, totalUsage: doc.data().totalUsage });
            var dataPie = {...this.state.dataPie};
            dataPie.datasets[0].data.push(usage);
            dataPie.datasets[0].data.push(6 - usage);
            console.log(dataPie.datasets[0].data);
            this.setState({dataPie: dataPie})
            //poses completed
            this.setState({posesCompleted: doc.data().posesCompleted, poseHistory: doc.data().poseHistory});
        });
        if (nw){
          console.log("New user");
          this.setState({loaded: true});
            //Assuming new user so inserting stuff
            // var today = new Date();
            // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ ' ' + today.getUTCHours() + ':' + today.getUTCMinutes() + ':' + today.getUTCSeconds();
            // let newUser = {
            //   email: localStorage.getItem('email'),
            //   lastLogin: date,
            //   name: localStorage.getItem('name'),
            //   poseHistory: {},
            //   posesCompleted: [],
            //   totalUsage: 1,
            //   userImg: localStorage.getItem('photoURL')
            // };
            // firebase.firestore().collection('userData').doc(localStorage.getItem('email')).set(newUser);
            // console.log("Created new entry for user");
            // var dataPie = {...this.state.dataPie};
            // dataPie.datasets[0].data.push(0);
            // dataPie.datasets[0].data.push(10);
            // this.setState({dataPie: dataPie})
            // this.setState({posesCompleted: ['No poses completed'], poseHistory: {}});

        }
      }
    ).catch(
      function(error) {
        console.log("Error in get doc");
        console.log(error);

      }
    );
}

  render() {
    return (
      <div>
        <Header></Header>
        <div className="dashboard">
        <Container>
          <Row style= {{ padding: '20px'}}>
        <Col xs="4">
      <Card>
        <CardImg top style={{maxHeight: '340px', maxWidth: '340px'}} src={ localStorage.getItem('photoURL')} alt="Profile Image" />
        <CardBody>
    <CardTitle>{ localStorage.getItem('name')}</CardTitle>
    <CardSubtitle>email : {localStorage.getItem('email')}</CardSubtitle>
          { this.state.loaded &&
              <React.Fragment>
              <CardText >Last Login : { this.state.lastLogin }<br></br> Total Completed poses : { this.state.totalUsage }</CardText>  
              </React.Fragment>
              }
        </CardBody>
      </Card>
      </Col>
      <Col xs="8">
      <Card>
        <CardBody>
    <CardTitle></CardTitle>
          { this.state.loaded &&
              <React.Fragment>
                <MDBContainer>
        <h3 className="mt-5">Poses Completed</h3>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
      </MDBContainer>
              <CardText >Completed Pose : { this.state.posesCompleted.map((item => (
                        <React.Fragment>
                          <Badge color="info" pill>
                            {item}
                          </Badge>
                          <span> </span>
                        </React.Fragment>))) }</CardText>  
              </React.Fragment>
              }
        </CardBody>
      </Card>
      </Col>
    </Row>
    </Container>
      </div>
    </div>
    );
  }
}

export default Dashboard;
