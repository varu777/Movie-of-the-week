import React from 'react';

class Login extends React.Component {
    state = {
    }


    render() {
        return (
            <>
            <h1> Login </h1>

            <label> email: </label>
            <input onChange={this.updateMovie} />
            <br/>

            <label> password: </label>
            <input onChange={this.updateMovie} />
            <br/>

            <button onClick={() => {window.alert("hi");}}> Login </button>            
            </>
        );
    }
}

export default Login;