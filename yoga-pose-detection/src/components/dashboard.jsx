import React, { Component } from "react";
import { Link } from "react-router-dom";
class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        This is dashboard <Link to="/posenet">posenet</Link>
      </div>
    );
  }
}

export default Dashboard;
