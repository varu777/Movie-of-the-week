import React from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';
import '../css/Login.css';
import { withRouter } from 'react-router';

class Login extends React.Component {
    state = {
        user: '',
        password: ''
    }

    loginUser = (e) => {
        e.preventDefault();
        // both fields empty check
        if (this.state.user.length == 0 && this.state.password.length == 0) {
            window.alert("Both fields cannot be empty.");
            return;
        }

        // empty username check
        if (this.state.user.length == 0) {
            window.alert("Email/Username field cannot be empty.");
            return; 
        }

        // empty password check
        if (this.state.password.length == 0) {
            window.alert("Password field cannot be empty.");
            return;
        }

        // attempt to sign in user
        axios({
            method: 'post',
            url: "http://localhost:9000/login",
            data: {
                username: this.state.user,
                password: this.state.password
            },
            withCredentials: true
          }).then((response) => {
              // login failed
              if (!response.data.success) {
                window.alert(response.data.message);
                return;
              }

              localStorage.setItem('loggedIn', true); 
              this.props.history.push('/');
          }).catch((error) => {
            window.alert("Error signing in: " + error);
          });
    }

    updateUser = (event) => {
        this.setState({user: event.target.value});
    }

    updatePass = (event) => {
        this.setState({password: event.target.value});
    }



    render() {
        return (
            <>
                <CustomNavbar />
                <div className="login-container">
                    <h1 className="title"> Login </h1>
                    <form onSubmit={this.loginUser}>
                        <input placeholder="Email or Username" onChange={this.updateUser} />
                        <br/>

                        <input type="password" placeholder="Password" onChange={this.updatePass} />
                        <br/>
                        <br/>
                        <button type="submit"> Login </button>            
                        <button onClick={() => {this.setState({recoverPassword: true})}}> Sign Up </button>
                        <button onClick={() => {this.setState({recoverPassword: true})}}> Forgot Username/Password </button>
                    </form>
                </div>

            </>
        );
    }
}

export default withRouter(Login);