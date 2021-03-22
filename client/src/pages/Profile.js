import React from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

class Profile extends React.Component {
   state = {
      email: '',
      currentPassword: '',
      newPassword: '',
      username: ''
   }

   updateEmail = (event) => {
      this.setState({email: event.target.value});
   }

   updateUsername = (event) => {
      this.setState({username: event.target.value});
   }

   updateOldPassword = (event) => {
      this.setState({oldPassword: event.target.value});
   }

   updateNewPassword = (event) => {
      this.setState({newPassword: event.target.value});
   }

   submitEmailUpdate = () => {
      if (this.state.email.length === 0) {
         window.alert('Email field empty.');
         return;
      }

      if (!this.state.email.includes('@')) {
         window.alert('Domain (@) not specified.');
         return;
      }

      axios({
         method: 'post',
         url: 'http://localhost:9000/updateEmail',
         data: {
             email: this.state.email
         },
         withCredentials: true
       }).then((response) => {
          if (response.data.success) {
            window.alert('Email has successfully updated.');
          } else {
            window.alert("Email did not update, please try again.");
          }
       }).catch((error) => {
         window.alert("Unable to update email: " + error);
       });
   }

   submitUsernameUpdate = () => {
      if (this.state.username.length === 0) {
         window.alert('Username field empty.');
         return;
      }

      axios({
         method: 'post',
         url: 'http://localhost:9000/updateUsername',
         data: {
             username: this.state.username
         },
         withCredentials: true
       }).then((response) => {
          if (response.data.success) {
            window.alert('Username has successfully updated.');
          } else {
            window.alert("Username did not update, please try again.");
          }
       }).catch((error) => {
         window.alert("Unable to update username: " + error);
       })

   }

   submitPasswordUpdate = () => {
      if (this.state.currentPassword.length === 0) {
         window.alert("Current password field is empty.");
         return;
      }

      if (this.state.newPassword.length === 0) {
         window.alert("New password field is empty.");
         return;
      }

      if (this.state.currentPassword !== this.state.newPassword) {
         window.alert("Current and new passwords did not match. Please try again.");
         return;
      }

      axios({
         method: 'post',
         url: 'http://localhost:9000/updatePassword',
         data: {
             password: this.state.password
         },
         withCredentials: true
       }).then((response) => {
          if (response.data.success) {
            window.alert('Password has successfully updated.');
          } else {
            window.alert("Password did not update, please try again.");
          }
       }).catch((error) => {
         window.alert("Unable to update password: " + error);
       })
   }

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
        <label> Current password </label>
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