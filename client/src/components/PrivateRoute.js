import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoginContext } from './Auth';

const PrivateRoute = ({render: ReactComponent, ...rest}) => {
    const isLoggedIn = useContext(LoginContext);
    return (
        <Route {...rest} render={props => (isLoggedIn ? <ReactComponent {...props} /> : <Redirect to='/login'/>)} />
    );
};


export default PrivateRoute;