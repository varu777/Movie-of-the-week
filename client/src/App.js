import React, { useContext } from 'react';
import './App.css';
import Home from './Home';
import Login from './pages/Login';
import UpdateMovie from './pages/UpdateMovie';
import WatchedMovie from './pages/WatchedMovie';
import Suggestions from './pages/Suggestions';
import PrivateRoute from './components/PrivateRoute';
import { LoginContext } from './components/Auth';
import Profile from './pages/Profile';
import CustomNavbar from './components/CustomNavbar';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

require('dotenv').config()

/*
class App extends React.Component {
  componentDidMount () {
    console.log(this.context);
  }

  render() {
    return(
          <>
          <AuthProvider>
          <CustomNavbar />
            <Router>
              <PrivateRoute path="/"            exact render={(props) => <Home />} />
              <Route path="/login"              exact render={(props) => <Login />} />
              <PrivateRoute path="/suggestions" exact render={(props) => <Suggestions />} />
              <PrivateRoute path="/profile"     exact render={(props) => <Profile />} />
              <PrivateRoute path="/updateMovie" exact render={(props) => <UpdateMovie />} />
            </Router>
          </AuthProvider>
          </>
    );
  }
}
*/

const App = ({children}) => {
  let loginStatus = useContext(LoginContext);
  return (
    <>
     <Router>
        <CustomNavbar user={loginStatus} />
        <PrivateRoute path="/"            exact render={(props) => <Home />} />
        <Route        path="/login"              exact render={(props) => <Login />} />
        <PrivateRoute path="/suggestions" exact render={(props) => <Suggestions />} />
        <PrivateRoute path="/profile"     exact render={(props) => <Profile />} />
        <PrivateRoute path="/addWatched" exact render={(props) => <WatchedMovie />} />
      </Router>
    </>
  );
};

export default App;
