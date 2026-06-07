import { createContext, useContext, useState, useEffect } from "react";


// This makes a new React context called AuthContext
const AuthContext = createContext();

let externalSetAuth = null;
let authQueue = [];

export function registerAuthSetter(fn) {
    externalSetAuth = fn;
    if (fn && authQueue.length > 0) {
        authQueue.forEach((val) => fn(val));
        authQueue = [];
    }
}

export function unregisterAuthSetter() {
    externalSetAuth = null;
}

export function setAuthFromOutside(value) {
    if (externalSetAuth) {
        externalSetAuth(value);
    } else {
        authQueue.push(value);
    }
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('accessToken')
    );

    useEffect(() => {
        registerAuthSetter(setIsAuthenticated);
        return () => {
            unregisterAuthSetter();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}