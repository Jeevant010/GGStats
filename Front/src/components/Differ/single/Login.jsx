import { Link } from "react-router-dom";
import React from "react";

const Login = () => {

    const login = () => {
        <Link  to="/login" />
    };

    return(
        <>
            <div className="">
                <div className="bg-grey-500 h-full w-full" ></div>
            </div>
            <button onClick={login()}>
                LOG IN
            </button>
        </>
    );

};

export default Login;