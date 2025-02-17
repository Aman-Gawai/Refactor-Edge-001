// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      if (res.data && res.data.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient effect */}
      <div className="pointer-events-none fixed inset-0 z-30 transition-opacity bg-gradient-bg" />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      {/* Login Form */}
      <div className="relative z-40 bg-gray-800/50 p-8 rounded-lg shadow-lg w-96 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700/50 text-white placeholder-gray-400 backdrop-blur-sm border border-gray-600 focus:border-primary outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700/50 text-white placeholder-gray-400 backdrop-blur-sm border border-gray-600 focus:border-primary outline-none"
          />
          <div className="flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="p-3 bg-primary rounded text-white hover:bg-purple-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:text-purple-400 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
