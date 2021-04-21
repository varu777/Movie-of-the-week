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
            url: "https://movieotw.herokuapp.com/login",
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
                console.log("pushing to login");
                this.props.history.push('/');
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
                <CustomNavbar />
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
                    <p> First time login: Sign in with your name (e.g. Jason) as the username and '123abc' as the password. After signing in, you can change both fields and add an email in the profile settings. :)</p>
                    <p> Passwords are encrypted btw so nobody can see them! A cookie containing your randomly generated user id is stored on your browser in order for the server to identify you.</p>
                    <p> Hi.</p>
                    <p> - straw_hat_jay </p>

                </div>

            </>
        );
    }
}

Login.contextType = UpdateAuthContext;

export default withRouter(Login);