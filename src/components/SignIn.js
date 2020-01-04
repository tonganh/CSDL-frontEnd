import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import  '../Css/sign-in.css';
import axios from '../axios';

class SignIn extends Component {
    state = {
        username: '',
        password: ''
    }
    handleChange=(event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit=(e) => {
        e.preventDefault();
        console.log(this.state)
        // axios.post("/customer/login",{
        //     username: this.state.username,
        //     password: this.state.password
        // })
        // .then(response => {
        //     if(response.data.success==true){
        //         window.location.href='/'
        //     }
        //     else {
        //         alert("Wrong username or password")
        //     }
        // })
        this.props._onLogin(this.state.username,this.state.password)
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="content">
                    <div className="content-top">
                        <a href="/home">City fun</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="/menu">Menu</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="#">Chicken</a>
                        <i className="fas fa-chevron-right"></i>
                        <a href="/product">Japanese Chicken</a>
                    </div>
                    <div className="content-bottom">
                        <div className="sign-up-header">Sign in</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-6">
                                <label for="inputAddress">User Name</label>
                                <input type="text" className="form-control" id="username" name="username"  placeholder="User name" value={this.state.username} onChange={this.handleChange}/>
                                <small id="passwordHelpInline" className="text-muted">
                                    Must be 8-20 characters long.
                                </small>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputAddress">Password</label>
                                <input type="password" className="form-control" id="password" name="password"  placeholder="Password"
                                value={this.state.password} onChange={this.handleChange}/>
                                <small id="passwordHelpInline" className="text-muted">
                                    Must be 8-20 characters long.
                                </small>
                            </div>
                            
                            
                            <button className="btn btn-primary">Sign in</button>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default SignIn;