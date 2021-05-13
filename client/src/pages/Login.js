import React, { useContext } from 'react';
import { AuthProvider, UpdateAuthContext } from '../components/Auth';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';
import '../css/Login.css';
import { withRouter } from 'react-router';

class Login extends React.Component {
    state = {
        user: '',
        password: '',
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
              let updateAuth = this.context;
              updateAuth().then(() => {
                this.props.history.push('/');
                window.location.reload();
              });

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
                <div className="login-container">
                    <h1 className="title"> Login </h1>
                    <form onSubmit={this.loginUser}>
                        <input placeholder="Username or Email" onChange={this.updateUser} />
                        <br/>

                        <input type="password" placeholder="Password" onChange={this.updatePass} />
                        <br/>
                        <br/>
                        <button type="submit"> Login </button>            
                    </form>
                    <br/>

                </div>

            </>
        );
    }
}

Login.contextType = UpdateAuthContext;

export default withRouter(Login);