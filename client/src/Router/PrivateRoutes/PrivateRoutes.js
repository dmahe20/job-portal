import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import {getLoggedInUser} from '../../helpers/utils';

const PrivateRoute = ({children}) => {
    const {loading} = useContext(AuthContext) || {};
    const location  = useLocation();

    if(loading) {
        return <h1>Loading...</h1>
    }
    if(getLoggedInUser()){
        return children;
    }
    
    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;