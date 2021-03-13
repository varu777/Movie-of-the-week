import React from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

class Profile extends React.Component {
   render() {
     return (
        <>
        <CustomNavbar />
        <h1> Update Email </h1>
        <input onChange={this.updateEmail} /> 
        <br/>
        <button onClick={this.updatePassword}>Update Email </button>
        <h1> Update User Name </h1>
        <input onChange={this.updateUsername} /> 
        <br/>
        <button onClick={this.updatePassword}>Update Username</button>
        <h1> Update Password </h1>
        <label> Old password </label>
        <input onChange={this.updatePassword} /> 
        <br/>
        <label> New Password </label> 
        <input onChange={this.updatePassword} /> 
        <br/>
        <label> Confirm New Password </label> 
        <input onChange={this.updatePassword} /> 
        <br/>
        <button onClick={this.updatePassword}>Update Password </button>
        </>
     );
   } 
}

export default Profile;