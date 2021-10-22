import React, { useContext } from 'react';
import './css/App.css';
import Home from './pages/Home';
import Login from './pages/Login';
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


function App() {
    let loginStatus = useContext(LoginContext);
    return (
        <>
            <Router>
                <CustomNavbar user={loginStatus} />
                <PrivateRoute exact path="/" render={() => <Home />} />
                <PrivateRoute exact path="/suggestions" render={() => <Suggestions />} />
                <PrivateRoute exact path="/profile" render={() => <Profile />} />
                <PrivateRoute exact path="/watchedMovie" render={() => <WatchedMovie />} />
                <Route exact path="/login">
                    <Login />
                </Route>
            </Router>
        </>
    );
};

export default App;