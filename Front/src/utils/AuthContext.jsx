import { createContext , useContext, useState } from "react";

const AuthContext = createContext();

let externelSetAuth ;

export function setAuthFromOutside(value) {
    if(externelSetAuth) externelSetAuth(value);
}

export function AuthProvider( { childern } ) {
    const [isAuthenticated , setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
    externelSetAuth = setIsAuthenticated;
    return (
        <AuthContext.Provider value={ { isAuthenticated , setIsAuthenticated } }>
            {childern}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}