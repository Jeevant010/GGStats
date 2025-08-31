import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link} from 'react-router-dom';
import { useCookies } from "react-cookie";


import TextBox from '../multiple/TextBox';
import PasswordBox from '../multiple/PasswordBox';



const SignUp = () => {


    const [userName , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

const signup = () => {
        
    };

    return(
        <>
            <div className="h-screen w-full fixed">
                <div className="bg-grey-500 h-100 w-full justify-end items-center" >
                    <div className="bg-red-900 h-15 ">
                        Header
                    </div>
                    <div className="">
                        <div className=" h-120 w-90 items-center justify-center m-auto mt-14 rounded">
                            <form className="p-6">
                                <TextBox
                                    label="User Name" 
                                    placeholder="User Name"
                                    className="my-2"
                                    value={userName}
                                    setValue={setUserName}
                                    required
                                />
                                <TextBox 
                                    label="Email" 
                                    placeholder="Email"
                                    className="my-2"
                                    value={email}
                                    setValue={setEmail}
                                    required
                                />
                                <TextBox 
                                    label="Phone Number" 
                                    placeholder="Phone number (optional)"
                                    className="my-2"
                                    value={phone}
                                    setValue={setPhone}
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
                                <Link  to="/home" >
                                <button type='submit' className={ `flex mt-10 mx-auto justify-center items-center bg-green-300 rounded-full px-5 py-3 cursor-pointer
                                    ${loading ? "opacity:50 cursor-not-allowed" : "" }`}
                                    disabled={loading}
                                 >
                                    {
                                        loading ? "LOGGING IN..." : 'LOG IN'
                                    }
                                </button>
                                </Link>
                            </form>
                            <div className="w-full h-auto items-center  ">
                                <div className='mx-auto font-semibold text-lg'>
                                    Already have an account?
                                </div>
                                <Link to="/login">
                                    <div className="items-center flex">
                                        <button className='border mx-auto border-gray-500 text-gray-500 font-bold rounded-full flex items-center py-4 px-3  cursor-pointer'>
                                            <div >
                                                        Log In Instead
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

export default SignUp;