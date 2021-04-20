import  React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const LoginContext = React.createContext(false);
const UpdateAuthContext = React.createContext(true);

const AuthProvider = ({children}) => {
    const loginStatus = useContext(LoginContext);
    const [loggedIn, setLoginStatus]  = useState(loginStatus);
    const [loading, setLoadingStatus] = useState(true);

    let updateAuth = function () {
        return axios({
            method: 'get', 
            url: "https://movieotw.herokuapp.com/isLoggedIn",
            withCredentials: true
          })
        .then((response) => {
            console.log(response);
            window.alert(response.data.isLoggedIn);
            if (response.data.isLoggedIn) {
                setLoginStatus(true);
            } else {
                setLoginStatus(false);
            }
            setLoadingStatus(false);
        })
        .catch((error) => {
            window.alert("Unable to load home data: " + error);
            setLoginStatus(false);
            setLoadingStatus(false);
        })
    }

    useEffect(() => {
        updateAuth();
    }, [])

    if (loading) {
        return <CustomNavbar loading={true}/>
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