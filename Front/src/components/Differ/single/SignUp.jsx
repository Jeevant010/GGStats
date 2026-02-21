import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff, Gamepad2 } from "lucide-react";
import api from '../../../utils/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        if (!form.email || !form.password) {
          toast.error("Please fill all required fields");
          setLoading(false);
          return;
        }

        const res = await api.post("/login", {
          email: form.email,
          password: form.password,
        });

        if (res.data && res.data.token) {
          const date = new Date();
          date.setDate(date.getDate() + 30);
          setCookie("token", res.data.token, { path: "/", expires: date });
          localStorage.setItem("accessToken", res.data.token);
          toast.success("Logged in successfully!");
          navigate("/");
        } else {
          toast.error(res.data?.message || "Login failed");
        }
      } else {
        if (!form.userName || !form.email || !form.password || !confirmPassword) {
          toast.error("Please fill all required fields");
          setLoading(false);
          return;
        }

        if (form.password !== confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        const res = await api.post("/register", form);

        if (res.data && res.data.token) {
          toast.success("Account created! Please login.");
          setForm({ userName: "", email: "", phone: "", password: "" });
          setConfirmPassword("");
          setIsLogin(true);
        } else {
          toast.error(res.data?.error || res.data?.message || "Signup failed");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl bg-surface-700 text-white text-sm placeholder-gray-500 border border-white/5 focus:outline-none focus:border-accent/50 transition-colors";

  return (
    <div className="min-h-screen flex bg-surface-900">
      {/* Left Panel — Branding */}
      <Motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0b0d13 0%, #164e63 50%, #0b0d13 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-accent) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div className="relative z-10 text-center px-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Gamepad2 size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            GG<span className="text-accent">Stats</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-sm">
            Track live sports scores, esports tournaments, and gaming news in real-time.
          </p>
        </div>
      </Motion.div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <button
            className="flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-gray-500 mb-8">
            {isLogin ? "Enter your credentials to access your account" : "Fill in your details to get started"}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <Motion.div
                  key="username"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="userName"
                    placeholder="Full Name"
                    value={form.userName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <Motion.div
                  key="phone"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <Motion.div
                  key="confirm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                  />
                </Motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-cyan-400 hover:from-accent-hover hover:to-cyan-300 text-white font-semibold text-sm shadow-lg shadow-accent/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? (isLogin ? "Logging in..." : "Creating account...")
                : (isLogin ? "Log In" : "Create Account")}
            </button>
          </form>

          <p className="text-gray-500 text-sm text-center mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setForm({ userName: "", email: "", phone: "", password: "" });
                setConfirmPassword("");
              }}
              className="text-accent hover:text-accent-hover font-semibold transition-colors"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default SignUp;