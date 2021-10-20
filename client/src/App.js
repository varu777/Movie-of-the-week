import React, { useContext } from 'react';
import './App.css';
import Home from './Home';
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
                <PrivateRoute exact path="/">
                    <Home />
                </PrivateRoute>
                <PrivateRoute exact path="/suggestions">
                    <Suggestions />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                    <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/watchedMovie">
                    <WatchedMovie />
                </PrivateRoute>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Router>
        </>
    );
};

export default App;