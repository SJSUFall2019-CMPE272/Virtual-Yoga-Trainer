import React from "react";
import Login from './components/Login';
import Screen from './components/Screen';
import Home from './components/Home';
import fire from './config/fire';


class App extends React.Component {
    state = {
        user: {},
    }

    componentDidMount(){
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user)=> {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null});
            }
        });
    }

    render() {
        return (
            <div className="App">
            {this.state.user ? (<Home/>) : (<Login/>)}
            </div>
        )
    }
}
export default App;