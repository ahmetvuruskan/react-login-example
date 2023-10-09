import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (email, password) => {
    }
})
export default AuthContext;
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn")
        if (loginStatus === '1') {
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])
    const logoutHandler = () => {
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        setIsLoggedIn(true)
    }
    return (<AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>{props.children}
    </AuthContext.Provider>)
};


