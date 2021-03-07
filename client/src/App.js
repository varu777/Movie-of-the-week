import React from 'react';
import './App.css';
import Home from './Home';
import Login from './pages/Login';
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

require('dotenv').config()

// global logged in check
var loginContext = React.createContext(false);

class App extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true
  }
  
  componentDidMount () {
    // only check user status if it hasn't been checked yet in session
    if (localStorage.getItem('loggedIn') == null) {
      // sort watched movies array by new filter
      axios({
        method: 'get',
        url: "http://localhost:9000/isLoggedIn",
        withCredentials: true
      }).then((response) => {
        this.setState({isLoggedIn: response.data.isLoggedIn, isLoading: false});
      }).catch((error) => {
        window.alert("Unable to apply filter: " + error);
      });
    }
  }


  render() {
    if (this.state.isLoading) {
      return <h1> Loading... </h1>
    }

    return(
      <Router>
        <LoginContext.Provider value={this.state.isLoggedIn}>
          <Route path="/" exact render={(props) => <Home />} />
          <Route path="/login" exact render={(props) => <Login />} />
          <Route path="/suggestions" exact render={(props) => <Suggestions />} />
          <Route path="/profile" exact render={(props) => <Profile />} />
        </LoginContext.Provider>
      </Router>
    );
  }
}

export const LoginContext = loginContext;
export default App;
