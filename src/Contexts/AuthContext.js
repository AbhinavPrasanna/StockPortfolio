import React, {useState, useContext} from 'react';
import {User} from '../Components/User';
import {Amplify} from 'aws-amplify';
import AuthContext from ".";

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const[authUser,setAuthUser] = useState(new User());
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const[firstTimeLoggedIn,setFirstTimeLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        firstTimeLoggedIn,
        setFirstTimeLoggedIn
    }
    Amplify.configure({
        Auth: {
            userPoolId:'us-west-1_OiPWtkZnI',
            userPoolWebClientId:'5uaj87gqpgrml7ii48d2uvju3j'
        }
});

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
    
}