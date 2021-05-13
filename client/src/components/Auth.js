import  React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';
import { use } from 'passport';


const LoginContext      = React.createContext({loggedin: false, currentUser: {}});
const UpdateAuthContext = React.createContext(true);

const AuthProvider = ({children}) => {
    const loginStatus = useContext(LoginContext);
    const [loggedIn, setLoginStatus]  = useState(loginStatus);
    const [loading, setLoadingStatus] = useState(true);

    let updateAuth = function () {
        return axios({
            method: 'get', 
            url: "http://localhost:9000/loginCheck",
            withCredentials: true
          })
        .then((response) => {
            if (response.data.isLoggedIn) {
                setLoginStatus({loggedIn: true, currentUser: response.data.currentUser});
            } else {
                setLoginStatus({loggedIn: false, currentUser: {}});
            }
            setLoadingStatus(false);
        })
        .catch((error) => {
            window.alert("Unable to load home data: " + error);
            setLoginStatus({loggedIn: false, currentUser: {}});
            setLoadingStatus(false);
        })
    }

    useEffect(() => {
        updateAuth();
    }, [])

    if (loading) {
        console.log("here");
        return (
            // render nothing if auth check hasn't finished yet
            <> </>
        );
    }

    return (
        <UpdateAuthContext.Provider value={updateAuth}>
            <LoginContext.Provider value={loggedIn}>
                {children}
            </LoginContext.Provider>
        </UpdateAuthContext.Provider>
    );
}

export {UpdateAuthContext, AuthProvider, LoginContext}