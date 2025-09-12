
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import api from '../../../utils/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        if (!form.email || !form.password) {
          toast.error("Please fill all required fields", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          setLoading(false);
          return;
        }

        // Replace with your actual API call
        const res = await api.post("/login", {
          email: form.email,
          password: form.password,
        });

        if (res.data && res.data.token) {
          const token = res.data.token;
          const date = new Date();
          date.setDate(date.getDate() + 30);
          setCookie("token", token, { path: "/", expires: date });
          
          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          
          navigate("/home");
        } else {
          const errorMsg = res.data?.message || "Login failed";
          toast.error(errorMsg, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      } else {
        // Signup logic
        if (!form.userName || !form.email || !form.password || !confirmPassword) {
          toast.error("Please fill all required fields", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          setLoading(false);
          return;
        }

        if (form.password !== confirmPassword) {
          toast.error("Passwords do not match", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          setLoading(false);
          return;
        }

        // Replace with your actual API call
        const res = await api.post("/register", form);
        
        if (res.data && res.data.success) {
          toast.success("Account created! Please login.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          
          // Clear form and switch to login
          setForm({
            userName: "",
            email: "",
            phone: "",
            password: "",
          });
          setConfirmPassword("");
          setIsLogin(true);
        } else {
          const errorMsg = res.data?.message || "Signup failed";
          toast.error(errorMsg, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      console.error("SignUp error:", error);
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      "SignUpentication failed";
      
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

    return (

      <>
      
      

    <div className="relative min-h-screen flex overflow-hidden">
      <Motion.div
        initial={{ x: 0 }}
        animate={{ x: isLogin ? "50%" : "-50%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex-1 bg-cover bg-center relative z-1"
        style={{ backgroundImage: "url('/signup3d.png')" }}
      />
      
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full border-2 bg-white font-bold shadow-lg hover:bg-green-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
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

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Form Section */}
      <Motion.div
        initial={{ x: "100%" }}
        animate={{ x: isLogin ? "0%" : "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[50%] h-full z-0 flex justify-center items-center p-8"
      >
        <div className="rounded-2xl shadow-2xl p-8 h-full w-full max-w-md m-10 mt-10 text-center p-20">
          <h1 className="text-3xl font-bold text-black mb-6">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col text-black gap-4">
            {!isLogin && (
              <input
                type="text"
                name="userName"
                placeholder="Full Name"
                value={form.userName}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
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

            {!isLogin && (
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 rounded-full shadow-md transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading
                ? isLogin
                  ? "Logging In..."
                  : "Signing Up..."
                : isLogin
                ? "LOG IN"
                : "SIGN UP"}
            </button>
          </form>

          <p className="text-black mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                // Clear form when switching modes
                setForm({
                  userName: "",
                  email: "",
                  phone: "",
                  password: "",
                });
                setConfirmPassword("");
              }}
              className="font-bold underline hover:text-violet-600 cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </Motion.div>
      

    </div>


      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </>
  );
};

export default SignUp;