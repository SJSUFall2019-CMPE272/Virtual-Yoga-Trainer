import { drawKeyPoints, drawSkeleton } from "./utils";
import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import cloneDeep from "lodash/cloneDeep";
import imagePath from "./../jojo_test2.jpg";
import { assertParamsConsistent } from "@tensorflow/tfjs-core/dist/ops/concat_util";
import LoadingOverlay from 'react-loading-overlay';

var mode = "weighted";

class PoseNet extends Component {
  static defaultProps = {
    videoWidth: 900,
    videoHeight: 700,
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
    super(props, PoseNet.defaultProps);
  }

  state = {
    loading: true
  }

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
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
          <LoadingOverlay active={this.state.loading} spinner text={this.props.loadingText}>
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
                  <li className="list-group-item">
                    {this.state && this.state.closeness}
                  </li>
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
        {/* {this.state.poseFrmImg !== null && (
          <p className="small">{JSON.stringify(this.state.poseFrmImg)}</p>
        )}
        <p className="small">{JSON.stringify(this.state.imageVector)}</p>
        <p className="small">{JSON.stringify(this.state.poseFrmVideo)}</p>
        <p className="small">{JSON.stringify(this.state.videoVector)}</p>
        <p className="small">{JSON.stringify(this.state.closeness)}</p> */}
      </div>
      // <div>
      //   <div>
      //     <video id="videoNoShow" playsInline ref={this.getVideo} />
      //     <canvas className="webcam" ref={this.getCanvas} />
      //   </div>
      // </div>
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
  }

  // handPoseFromImage = pose => {
  //   console.log("in PoseDetection", pose);
  //   this.setState({ poseFrmImg: pose });
  //   const vector = this.createVectorFromObject1(pose);
  //   this.setState({ imageVector: vector });
  // };

  // handlePoseFromVideo = pose => {
  //   //console.log("pose from video", pose);
  //   this.setState({ poseFrmVideo: pose });
  //   const vector = this.createVectorFromObject2(pose);
  //   //console.log(vector);
  //   this.setState({ videoVector: vector });
  //   if (this.state.imageVector !== null) {
  //     const closeness = this.weightedDistanceMatching(
  //       this.state.imageVector,
  //       vector
  //     );
  //     this.setState({ closeness });
  //   }
  // };

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
    var l2norm = require( 'compute-l2norm' );
    for (var i=0; i <normalized.length; i+=2) {
      var norm = l2norm([normalized[i],normalized[i+1]]);
      normalized[i] = normalized[i]/norm;
      normalized[i+1] = normalized[i+1]/norm;
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