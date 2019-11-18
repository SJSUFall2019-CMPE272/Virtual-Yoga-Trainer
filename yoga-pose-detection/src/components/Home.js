import React from "react";
import fire from '../config/fire';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

import Practice from './Practice';
import PoseNet from "./Camera";

class Home extends React.Component {

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (   
                <Router>
                <Link to="/practice">Practice</Link>
                <Switch>
                    <Route path="/practice" component={Practice}></Route>
                <Route path="/" ><div className="col-md-6">
                <h1>You are home</h1><button onClick={this.logout}>Logout</button>
            </div></Route>
                </Switch>
                </Router>
        );
        }
}
export default Home;