import React from 'react';
import './App.css';
import Home from './Home';
import Login from './pages/Login';
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
    if (sessionStorage.getItem('loggedIn') == null)
      sessionStorage.setItem('loggedIn', false);
  }


  render() {
    return(
      <Router>
        <Route path="/" exact render={(props) => <Home />} />
        <Route path="/login" exact render={(props) => <Login />} />
      </Router>
    );
  }
}

export default App;
