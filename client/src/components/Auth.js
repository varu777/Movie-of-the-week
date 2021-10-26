import  React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

// context will contain user's login status and user currently logged in
const LoginContext = React.createContext({loggedIn: false, currentUser: {}});

// context will contain method for updating user's login status
const UpdateAuthContext = React.createContext(true);

const AuthProvider = ({ children }) => {
    // retrieve login status
    const loginStatus = useContext(LoginContext);

    // create hooks for login and loading statuses
    const [loggedIn, setLoginStatus]  = useState(loginStatus);
    const [loading, setLoadingStatus] = useState(true);

    let updateAuth = function () {
        // check if user is logged in
        return axios({
            method: 'get', 
            url: process.env.REACT_APP_LOGIN_CHECK_URL,
            withCredentials: true
        })
        .then((response) => {
            // update login status depending on whether user is signed in or not
            if (response.data.isLoggedIn) {
                setLoginStatus({ loggedIn: true, currentUser: response.data.currentUser });
            } else {
                setLoginStatus({ loggedIn: false, currentUser: {} });
            }

            // used to stop the page from displaying a "loading" status
            setLoadingStatus(false);
        })
        .catch((error) => {
            window.alert("Unable to load home data: " + error);
            setLoginStatus({ loggedIn: false, currentUser: {} });
            setLoadingStatus(false);
        })
    }

    useEffect(() => {
        updateAuth();
    }, [])

    // render nothing if auth check hasn't finished yet
    if (loading) {
        return (
            <> </>
        );
    }

    // render current page if loading finished with login context and update auth context
    return (
        <UpdateAuthContext.Provider value={updateAuth}>
            <LoginContext.Provider value={loggedIn}>
                {children}
            </LoginContext.Provider>
        </UpdateAuthContext.Provider>
    );
}

export {UpdateAuthContext, AuthProvider, LoginContext}