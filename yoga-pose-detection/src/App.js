import React from "react";
import Login from "./components/Login";
import fire from "./config/fire";
import Main from "./components/Main";

class App extends React.Component {
  state = {
    user: false
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log("User signed in");
        this.setState({user: true})
      } else {
        console.log("User not signed in");
        this.setState({user: false});
      }
    });
    
  }

  render() {
    return (
      <div className="App">{fire.auth().currentUser ? <Main /> : <Login/>}</div>
    );
  }
}
export default App;
