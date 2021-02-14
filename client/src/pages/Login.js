import React from 'react';

class Login extends React.Component {
    state = {
        recoverPassword: false
    }


    render() {
        return (
            <>
            {this.state.recoverPassword 
            ? 
                <div>
                    <h1> Password Recovery </h1>
                    <label> Enter email to recover account: </label>
                    <input onChange={this.updateMovie} />
                    <button onClick={() => {this.setState({recoverPassword: false})}}> Back to Login </button>
                </div>

            :
                <div>
                    <h1> Login </h1>
                    <label> email or username: </label>
                    <input onChange={this.updateMovie} />
                    <br/>

                    <label> password: </label>
                    <input onChange={this.updateMovie} />
                    <br/>

                    <button onClick={() => {window.alert("hi");}}> Login </button>            
                    <button onClick={() => {this.setState({recoverPassword: true})}}> Forgot Username/Password </button>
                </div>
            }
            </>
        );
    }
}

export default Login;