import React from "react";
import fire from '../config/fire'

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{}).catch((error) => {
            console.log(error);
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="col-md-6">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange.bind(this)} type="email" name="email"
                        class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email" />
                        <small id="emailHelp" class="form-text-muted">We'll never share your email id wiht anyone</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange.bind(this)} type="password" name="password"
                        class="form-control" id="exampleInputPassword1" 
                        placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.login.bind(this)} class="btn btn-property">Login</button>
                    <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn-btn-success">
                        Signup
                    </button>
                </form>
            </div>
        )
    }

}

export default Login;