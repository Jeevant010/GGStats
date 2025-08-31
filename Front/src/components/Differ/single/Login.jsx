import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import TextBox from "../multiple/TextBox";
import PasswordBox from "../multiple/PasswordBox";

const Login = () => {


    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const login = () => {
        
    };

    return(
        <>
            <div className="h-screen w-full fixed">
                <div className="bg-grey-500 h-100 w-full justify-end items-center" >
                    <div className="bg-red-900 h-15 ">
                        Header
                    </div>
                    <div className="">
                        <div className=" h-80 w-90 items-center justify-center m-auto mt-14 rounded">
                            <form className="p-6">
                                <TextBox 
                                    label="Email" 
                                    placeholder="Email"
                                    className="my-2"
                                    value={email}
                                    setValue={setEmail}
                                    required
                                />
                                <PasswordBox 
                                    label="Password"
                                    placeholder="Password"
                                    className="my-2"
                                    value={password}
                                    setValue={setPassword}
                                    required
                                />
                                <button className=" flex mt-10 mx-auto justify-center items-center bg-green-300 rounded-full px-5 py-3 cursor-pointer" onClick={login()} >
                                <Link  to="/home" >
                                    LOG IN
                                </Link>
                            </button>
                            </form>
                            <div className="w-full h-auto items-center  ">
                                <div className='mx-auto font-semibold text-lg'>
                                    Dont't have an account?
                                </div>

                            <Link to="/register">
                                <div className="items-center flex">
                                    <button className='border mx-auto border-gray-500 text-gray-500 font-bold rounded-full flex items-center py-4 px-3 cursor-pointer'>
                                        <div >
                                                    SIGN UP FOR GGSPORTS
                                        </div>
                                    </button>
                                </div>
                                
                            </Link>
                            </div>
                        </div>
                       
                        <div className="h-30 items-center justify-center py-7 bg-rd-900">
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );

};

export default Login;