import React, { createContext, useState, useEffect } from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from './Authentication';
import Cookies from 'js-cookie'; // Importing js-cookie

export const AuthContext = createContext({});

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to create a new user account
    const createUser = (email, userData) => {
        setLoading(true);
        return createUserWithEmailAndPassword(email, userData, setLoading);
    };

    // Function to sign in an existing user
    const signInUser = (email, password) => {
        setLoading(true);
        
        return signInWithEmailAndPassword(email, password, setUser, setLoading);
    };

    // Function to sign out the current user
    const logOutUser = () => {
        setUser(null);
        Cookies.remove('userType');
        Cookies.remove('email');
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = currentUser => {
             console.log('User Observing')
             setUser(currentUser);
             setLoading(false);
        };
 
        return () => unsubscribe();
     }, []); 

    const authInfo = {
        loading,
        createUser,
        signInUser,
        logOutUser,
        user
    };

    console.log(authInfo,"-----------")
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
