import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // toggle login/signup
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Login data:" : "Signup data:", form);

    // testing
    if (isLogin) {
      alert("Logged in successfully! 🎉");
    } else {
      alert("Signed up successfully! 🎉");
    }
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden">

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isLogin ? "50%" : "-50%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex-1 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/signup3d.png')" }}
      >

        </motion.div>
        {/* Back Button */}
        <button
          className="absolute top-4 left-4 z-10 flex items-center gap-2 
             px-4 py-2 rounded-full border-2 bg-white font-bold shadow-lg 
             hover:bg-green-600 hover:text-white hover:scale-105 
             active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      

      {/* Form Section */}
      <motion.div
        initial={{ x: "100%"}}
        animate={{ x: isLogin ? "0%" : "100%"}}
        // exit={{opacity:1}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-1/2 h-full flex justify-center items-center p-8"


      >
        <div className="rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-black mb-6">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col text-black gap-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />

            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              />
            )}

            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 rounded-full shadow-md transition cursor-pointer"
            >
              {isLogin ? "LOG IN" : "SIGN UP"}
            </button>
          </form>

          <p className="text-black mt-6">
            {isLogin ? "Don’t have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold underline hover:text-violet-600 cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
