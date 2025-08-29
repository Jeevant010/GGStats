import React from "react";
import { Link} from 'react-router-dom';

const SignUp = () => {

const login = () => {
        
    };

    return(
        <>
            <div className="h-145">
                <div className="bg-grey-500 h-100 w-full justify-end items-center" >
                    <div className="bg-red-900 h-15">
                        hello
                    </div>
                    <div className="">
                        <div className="bg-yellow-600 h-140 w-90 items-center justify-center m-auto mt-14">

                        </div>
                    </div>
                    <div className="h-30 items-center justify-center py-7">
                
                    <button className=" flex m-auto justify-center items-center bg-green-300 rounded-full px-5 py-3 cursor-pointer">
                        <Link  to="/login" >
                            LOG IN
                        </Link>
                    </button>
                    
            </div>
            <div className="w-full h-30 bg-black justify-center  ">
                <div className='my-6 font-semibold text-lg'>
                        Dont't have an account?
                    </div>
                    <button>
                         <Link to="/register">
                            <div className='border border-gray-500 m-auto text-gray-500 font-bold w-full rounded-full flex items-center justify-center py-4 px-3'>
                                SIGN UP FOR GGSPORTS
                            </div>
                        </Link>
                    </button>
                    </div>
                </div>
            </div>
            
        </>
    );

};

export default SignUp;