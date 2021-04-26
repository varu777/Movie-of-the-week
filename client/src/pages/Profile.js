import React from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

class Profile extends React.Component {
   state = {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      username: ''
   }

   updateEmail = (event) => {
      this.setState({email: event.target.value});
   }

   updateUsername = (event) => {
      this.setState({username: event.target.value});
   }

   updateCurrentPassword = (event) => {
      this.setState({currentPassword: event.target.value});
   }

   updateNewPassword = (event) => {
      this.setState({newPassword: event.target.value});
   }

   updateConfirmNewPassword = (event) => {
      this.setState({confirmNewPassword: event.target.value});
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
         url: 'http://localhost:9000/user/updateEmail',
         data: {
             email: this.state.email
         },
         withCredentials: true
       }).then((response) => {
          if (response.data.success) {
            window.alert('Email has successfully updated.');
            this.setState({email:''});
          } else {
            window.alert("Email did not update: " + response.data.val);
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
         url: 'http://localhost:9000/user/updateUsername',
         data: {
             username: this.state.username
         },
         withCredentials: true
       }).then((response) => {
          if (response.data.success) {
            window.alert('Username has successfully updated.');
            this.setState({username:''});
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

      if (this.state.confirmNewPassword !== this.state.newPassword) {
         window.alert("New passwords did not match. Please try again.");
         return;
      }

      axios({
         method: 'post',
         url: 'http://localhost:9000/user/updatePassword',
         data: {
             newPassword: this.state.newPassword,
             currPassword: this.state.currentPassword
         },
         withCredentials: true
       }).then((response) => {
          if (response.data.success) {
            window.alert('Password has successfully updated.');
            this.setState({currentPassword:''});
            this.setState({newPassword:''});
            this.setState({confirmNewPassword:''});
          } else {
            window.alert("Password did not update: " + response.data.val);
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
        <input value={this.state.email} onChange={this.updateEmail} /> 
        <br/>
        <button onClick={this.submitEmailUpdate}>Update Email </button>
        <h1> Update Username </h1>
        <input value={this.state.username} onChange={this.updateUsername} /> 
        <br/>
        <button onClick={this.submitUsernameUpdate}>Update Username</button>
        <h1> Update Password </h1>
        <label> Current password </label>
        <input value={this.state.currentPassword} type="password" onChange={this.updateCurrentPassword} /> 
        <br/>
        <label> New Password </label> 
        <input value={this.state.newPassword} type="password" onChange={this.updateNewPassword} /> 
        <br/>
        <label> Confirm New Password </label> 
        <input value={this.state.confirmNewPassword} type="password" onChange={this.updateConfirmNewPassword} /> 
        <br/>
        <button onClick={this.submitPasswordUpdate}>Update Password </button>
        </>
     );
   } 
}

export default Profile;