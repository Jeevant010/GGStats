import { createContext , useContext, useState } from "react";


// This makes a new React context called AuthContext
const AuthContext = createContext();
/**
 * It will later hold a reference to React’s setIsAuthenticated function.
 * This allows you to call setAuthFromOutside() from anywhere, even outside React components.
 */
let externelSetAuth ;
    // If externelSetAuth has been assigned, it will update authentication state.
export function setAuthFromOutside(value) {
    if(externelSetAuth) externelSetAuth(value);
}
    // the container function for app takes arg as children
export function AuthProvider({ children }) {
    // useState 
    const [isAuthenticated, setIsAuthenticated] = useState(
        // !!value is a neat trick in JavaScript to convert any value into a real boolean (true or false).
        !!localStorage.getItem('accessToken')
    );
    // Stores the state updater function so setAuthFromOutside() can use it later.
    externelSetAuth = setIsAuthenticated;
    // Wraps all child components in AuthContext.Provider.
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

    // Custom hook to use the context easily.
export function useAuth(){
    return useContext(AuthContext);
}