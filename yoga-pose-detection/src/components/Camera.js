import { drawKeyPoints, drawSkeleton } from "./utils";
import { Badge } from "reactstrap";
import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import cloneDeep from "lodash/cloneDeep";
import imagePath from "./../jojo_test2.jpg";
import chairPoseImg from "./../Chair Pose.jpg";
import upwardSalute from "./../upwardsalute.jpg";
import standingHalf from "./../standinghalf.jpg";
import moutainPose from "./../mountainpose.jpg";
import extendedTriangle from "./../extendedtriangle.jpg";
import { assertParamsConsistent } from "@tensorflow/tfjs-core/dist/ops/concat_util";
import LoadingOverlay from "react-loading-overlay";
import { Link } from "react-router-dom";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import Header from "./Header";
var mode = "weighted";

class PoseNet extends Component {
  static defaultProps = {
    videoWidth: 900, //900
    videoHeight: 700, //700
    flipHorizontal: true,
    algorithm: "single-pose",
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 1,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5, //.5
    skeletonColor: "#ffadea",
    skeletonLineWidth: 6,
    loadingText: "Loading Posenet.. Please wait",
    //added by harshraj
    poseFrmImg: null,
    poseFrmVideo: null,
    imageVector: null,
    videoVector: null,
    closeness: " "
  };

  constructor(props) {
    //console.log("props", props);
    super(props, PoseNet.defaultProps);
  }

  state = {
    loading: true,
    completedPose: false,
    poseProgress: 0
  };

  getCanvas = elem => {
    this.canvas = elem;
  };

  getVideo = elem => {
    this.video = elem;
  };

  async componentDidMount() {
    try {
      await this.setupCamera();
    } catch (error) {
      throw new Error(
        "This browser does not support video capture, or this device does not have a camera"
      );
    }

    try {
      this.posenet = await posenet.load({
        // architecture: "ResNet50" //,
        // outputStride: 32,
        // inputResolution: { width: 257, height: 200 },
        // quantBytes: 2
      });
    } catch (error) {
      throw new Error("PoseNet failed to load");
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }
    var imageElement = document.getElementById("yogaPose");
    //imageElement.crossOrigin = "Anonymous";
    const pose = await this.posenet.estimateSinglePose(imageElement, {
      flipHorizontal: false
    });
    this.setState({ poseFrmImg: pose });
    var vector = null;
    if (mode === "cosine") {
      vector = this.createVectorFromObject1(pose);
    } else {
      vector = this.createVectorFromObject2(pose);
    }

    this.setState({ imageVector: vector });
    this.detectPose();
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }
    const { videoWidth, videoHeight } = this.props;
    const video = this.video;
    video.width = videoWidth;
    video.height = videoHeight;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: videoWidth,
        height: videoHeight
        // width: "100%",
        // height: "auto"
      }
    });

    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play();
        resolve(video);
      };
    });
  }

  detectPose() {
    const { videoWidth, videoHeight } = this.props;
    const canvas = this.canvas;
    const canvasContext = canvas.getContext("2d");
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    this.poseDetectionFrame(canvasContext);
  }

  poseDetectionFrame(canvasContext) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props;

    const posenetModel = this.posenet;
    const video = this.video;

    const findPoseDetectionFrame = async () => {
      let poses = [];

      switch (algorithm) {
        case "multi-pose": {
          poses = await posenetModel.estimateMultiplePoses(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius
          );
          break;
        }
        case "single-pose": {
          const pose = await posenetModel.estimateSinglePose(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          );
          const fakepose = this.state.poseFrmImg;
          //  poses.push(fakepose);
          poses.push(pose);
          this.calculateCloseness(cloneDeep(pose));
          break;
        }
      }

      canvasContext.clearRect(0, 0, videoWidth, videoHeight);

      if (showVideo) {
        canvasContext.save();
        canvasContext.scale(-1, 1);
        canvasContext.translate(-videoWidth, 0);
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
        canvasContext.restore();
      }

      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            );
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            );
          }
        }
      });
      requestAnimationFrame(findPoseDetectionFrame);
    };
    findPoseDetectionFrame();
  }

  render() {
    var retrievedObject = JSON.parse(localStorage.getItem("selectedPose"));
    const benefits = retrievedObject.benefits;
    const poseName = retrievedObject.poseName;
    const difficulty = retrievedObject.difficulty;
    const sanskritName = retrievedObject.sanskritName;
    const desc = retrievedObject.desc;
    const imgSrc = retrievedObject.locimg;

    console.log(
      "in posenet : ",
      poseName,
      benefits,
      difficulty,
      sanskritName,
      desc
    );

    var imageMap = {
      "Upward Salute": upwardSalute,
      "Chair Pose": chairPoseImg,
      "Standing Half forward Bend": standingHalf,
      "Mountain Pose": moutainPose,
      "Extended Triangle Pose": extendedTriangle
    };

    return (
      <React.Fragment>
        <Header />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <LoadingOverlay
                active={this.state.loading}
                spinner
                text={this.props.loadingText}
              >
                <div className="m-2">
                  <video id="videoNoShow" playsInline ref={this.getVideo} />
                  <canvas className="webcam" ref={this.getCanvas} />
                </div>
              </LoadingOverlay>
            </div>
            <div className="col-md-4">
              <div className="m-3">
                <div className="card">
                  <img
                    id="yogaPose"
                    src={imageMap[poseName]}
                    //crossOrigin="f"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {poseName}
                      {difficulty === 1 && (
                        <Badge className="float-right" color="success" pill>
                          Easy
                        </Badge>
                      )}
                      {difficulty === 2 && (
                        <Badge className="float-right" color="warning" pill>
                          Medium
                        </Badge>
                      )}
                      {difficulty === 3 && (
                        <Badge className="float-right" color="danger" pill>
                          Hard
                        </Badge>
                      )}
                    </h5>

                    <div className="card-text">
                      <i className="small">{sanskritName}</i>
                      <br />
                      {desc}
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    {this.state.percentMatch && (
                      <li className="list-group-item">
                        <strong>Correctness</strong>
                        <br />
                        {/* <div flush>{() => this.benefitsFun(benefits)}</div> */}
                        <Progress id="myprogress"
                          type="circle"
                          width={70}
                          percent={Math.floor(this.state.percentMatch)}
                        />
                        <Progress percent={Math.floor(this.state.poseProgress)*3.3} status={ this.state.completedPose? "success": "error"} />
                      </li>
                    )}
                    <li className="list-group-item">
                      <strong>Benefits</strong>
                      <br />
                      {benefits.map(item => (
                        <React.Fragment>
                          <Badge color="info" pill>
                            {item}
                          </Badge>
                          <span> </span>
                        </React.Fragment>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  //added by Harshraj

  calculateCloseness(pose) {
    //console.log("test", pose);
    var videoVector = null;
    if (mode === "cosine") {
      videoVector = this.createVectorFromObject1(pose);
    } else {
      videoVector = this.createVectorFromObject2(pose);
    }
    //console.log(videoVector, this.state.imageVector);
    if (this.state.imageVector !== null) {
      const imageVector = this.state.imageVector;
      var closeness = null;
      if (mode === "cosine") {
        closeness = this.cosineDistanceMatching(videoVector, imageVector);
      } else {
        closeness = this.weightedDistanceMatching(videoVector, imageVector);
      }
      this.setState({ closeness });
    }

    this.setState({ percentMatch: 100 - closeness * 100 });

    //check progress
    if (this.state.completedPose === false){
      if (Math.floor(this.state.percentMatch) > 50) {
        var prog = this.state.poseProgress;
        prog+=1;
        this.setState({poseProgress: prog })
        console.log("Progress : " + prog);
      } else {
        this.setState({poseProgress: 0})
        console.log("Reset pose progress");
      }  
      if (this.state.poseProgress > 30) {
        console.log("Pose completed");
        this.setState({completedPose: true})
      } 
    }
  }

  createVectorFromObject1(poseObj) {
    let vector = [];
    for (var p of poseObj.keypoints) {
      vector.push(p["position"]["x"]);
      vector.push(p["position"]["y"]);
    }
    //console.log(vector.length);
    return vector;
  }

  createVectorFromObject2(poseObj) {
    //let arrOfObj = poseObj.keypoints;
    let arrOfObj = cloneDeep(poseObj.keypoints);
    arrOfObj = arrOfObj.sort((a, b) =>
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
    console.log("cosineDistanceMatching", poseVector1, poseVector2);
    //Normalize two vectors
    var normalVector1 = this.normalizeVector(poseVector1);
    var normalVector2 = this.normalizeVector(poseVector2);
    var similarity = require("compute-cosine-similarity");
    let cosineSimilarity = similarity(normalVector1, normalVector2);
    let distance = 2 * (1 - cosineSimilarity);
    return Math.sqrt(distance);
  }

  normalizeVector(poseVector) {
    //deep copy and return
    let normalized = cloneDeep(poseVector);
    var l2norm = require("compute-l2norm");
    for (var i = 0; i < normalized.length; i += 2) {
      var norm = l2norm([normalized[i], normalized[i + 1]]);
      normalized[i] = normalized[i] / norm;
      normalized[i + 1] = normalized[i + 1] / norm;
    }
    return normalized;
  }

  weightedDistanceMatching(poseVector1, poseVector2) {
    let vector1PoseXY = poseVector1.slice(0, 34);
    // need to normalize the vectors
    vector1PoseXY = this.normalizeVector(vector1PoseXY);
    let vector1Confidences = poseVector1.slice(34, 51);
    let vector1ConfidenceSum = poseVector1.slice(51, 52);
    let vector2PoseXY = poseVector2.slice(0, 34);
    vector2PoseXY = this.normalizeVector(vector2PoseXY);
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
}

export default PoseNet;
