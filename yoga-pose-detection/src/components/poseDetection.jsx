import React, { Component } from "react";
import Camera from "../components/Camera";
import YogaPoseDetailCard from "./yogaPoseDetailCard";
import imagePath from "./../testPose2.jpg";
class PoseDetection extends Component {
  state = {
    poseFrmImg: null,
    poseFrmVideo: null,
    imageVector: null,
    videoVector: null,
    closeness: null
  };

  handPoseFromImage = pose => {
    console.log("in PoseDetection", pose);
    this.setState({ poseFrmImg: pose });
    const vector = this.createVectorFromObject2(pose);
    this.setState({ imageVector: vector });
  };

  handlePoseFromVideo = pose => {
    //console.log("pose from video", pose);
    this.setState({ poseFrmVideo: pose });
    const vector = this.createVectorFromObject2(pose);
    //console.log(vector);
    this.setState({ videoVector: vector });
    if (this.state.imageVector !== null) {
      const closeness = this.weightedDistanceMatching(
        this.state.imageVector,
        vector
      );
      this.setState({ closeness });
    }
  };

  createVectorFromObject(poseObj) {
    let vector = [];
    for (var p of poseObj.keypoints) {
      vector.push(p["position"]["x"]);
      vector.push(p["position"]["y"]);
    }
    console.log(vector.length);
    return vector;
  }
  createVectorFromObject2(poseObj) {
    const arrOfObj = poseObj.keypoints.sort((a, b) =>
      a.part > b.part ? 1 : b.part > a.part ? -1 : 0
    );
    console.log(arrOfObj);
    let vector1 = [];
    let vector2 = [];
    let sum = 0;
    for (var p of arrOfObj) {
      vector1.push(p["position"]["x"]);
      vector1.push(p["position"]["y"]);
      vector2.push(p["score"]);
      sum += p["score"];
    }
    return [...vector1, ...vector2, sum];
  }

  cosineDistanceMatching(poseVector1, poseVector2) {
    var similarity = require("compute-cosine-similarity");
    let cosineSimilarity = similarity(poseVector1, poseVector2);
    let distance = 2 * (1 - cosineSimilarity);
    return Math.sqrt(distance);
  }

  weightedDistanceMatching(poseVector1, poseVector2) {
    let vector1PoseXY = poseVector1.slice(0, 34);
    let vector1Confidences = poseVector1.slice(34, 51);
    let vector1ConfidenceSum = poseVector1.slice(51, 52);
    let vector2PoseXY = poseVector2.slice(0, 34);
    // First summation
    let summation1 = 1 / vector1ConfidenceSum;
    // Second summation
    let summation2 = 0;
    for (let i = 0; i < vector1PoseXY.length; i++) {
      let tempConf = Math.floor(i / 2);
      let tempSum =
        vector1Confidences[tempConf] *
        Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
      summation2 = summation2 + tempSum;
    }
    return summation1 * summation2;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <Camera onPoseDetected={this.handlePoseFromVideo} />
          </div>
          <div className="col-md-4">
            <div className="m-3">
              <div className="card">
                <img
                  id="yogaPose"
                  src={imagePath}
                  className="card-img-top"
                  crossOrigin="anonymous"
                />
                <div className="card-body">
                  <h5 className="card-title">Extended Side Angle Pose</h5>

                  <p className="card-text">
                    <i className="small">Utthita Parsvakonasana</i>
                    <br />
                    Find length in your side body, from your heel to your
                    fingertips with Extended Side Angle Pose.
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    oo-TEE-tah parsh-vah-cone-AHS-anna
                  </li>
                  <li className="list-group-item">Match Percentage</li>
                  <li className="list-group-item">Score</li>
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link">
                    Go to Next Pose
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="small">{JSON.stringify(this.state.poseFrmImg)}</p>
        <p className="small">{JSON.stringify(this.state.imageVector)}</p>
        <p className="small">{JSON.stringify(this.state.poseFrmVideo)}</p>
        <p className="small">{JSON.stringify(this.state.videoVector)}</p>
        <p className="small">{JSON.stringify(this.state.closeness)}</p>
      </div>
    );
  }
}

export default PoseDetection;
