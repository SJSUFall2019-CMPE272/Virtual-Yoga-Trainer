import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import imagePath from "./../pose3.jpg";
class YogaPoseDetailCard extends Component {
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
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: "#ffadea",
    skeletonLineWidth: 6,
    loadingText: "Loading...please be patient..."
  };

  constructor(props) {
    super(props, YogaPoseDetailCard.defaultProps);
  }

  render() {
    return <p></p>;
  }

  async componentDidMount() {
    try {
      this.posenet = await posenet.load();
    } catch (error) {
      throw new Error("PoseNet failed to load");
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }
    console.log("posenet loaded!");
    this.compoentMounted();
  }

  async compoentMounted() {
    // A whole lotta functions here, fired after every render.
    console.log("here!");
    var imageElement = document.getElementById("yogaPose");
    console.log("before");
    //imageElement.onload = function() {
    console.log("image loaded");
    const pose = await this.posenet.estimateSinglePose(imageElement, {
      flipHorizontal: true
    });
    //   .then(pose => {
    //     console.log(pose);
    //   });
    //const pose = this.estimatePoseOnImage(imageElement);
    console.log(pose);
    //this.props.onPoseDetected(pose);
  }
}

export default YogaPoseDetailCard;
