import React from 'react';
import './App.css';
import Home from './Home';
import Login from './pages/Login';
import UpdateMovie from './pages/UpdateMovie';
import Suggestions from './pages/Suggestions';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/Auth';
import Profile from './pages/Profile';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

require('dotenv').config()

class App extends React.Component {
  componentDidMount () {
  }

  render() {
    return(
      <>
      <AuthProvider>
        <Router>
          <PrivateRoute path="/"     exact render={(props) => <Home />} />
          <Route path="/login"       exact render={(props) => <Login />} />
          <PrivateRoute path="/suggestions" exact render={(props) => <Suggestions />} />
          <PrivateRoute path="/profile"     exact render={(props) => <Profile />} />
          <PrivateRoute path="/updateMovie"     exact render={(props) => <UpdateMovie />} />
        </Router>
      </AuthProvider>
      </>
    );
  }
}

export default App;
