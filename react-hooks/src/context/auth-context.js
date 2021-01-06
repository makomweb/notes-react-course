import React, { useState } from 'react';

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
});


const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onLoggedIn = () => {
        setIsAuthenticated(true);
    }

    return (
        <AuthContext.Provider value={{ login: onLoggedIn, isAuth: isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;