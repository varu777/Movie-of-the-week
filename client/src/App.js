import React from 'react';
import './App.css';
import Home from './Home';
import Login from './pages/Login';
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

require('dotenv').config()

class App extends React.Component {
  state = {

  }
  
  componentDidMount () {
    if (localStorage.getItem('loggedIn') == null)
      localStorage.setItem('loggedIn', false);
  }


  render() {
    return(
      <Router>
        <Route path="/" exact render={(props) => <Home />} />
        <Route path="/login" exact render={(props) => <Login />} />
        <Route path="/suggestions" exact render={(props) => <Suggestions />} />
        <Route path="/profile" exact render={(props) => <Profile />} />
      </Router>
    );
  }
}

export default App;
