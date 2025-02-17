import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthForm = ({ type }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(type === "signup" && { name: "" }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${type} Data:`, formData);
    // We will connect this to backend later
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(155, 135, 245, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      {/* Auth Form */}
      <div className="relative z-40 bg-gray-800/50 p-8 rounded-lg shadow-lg w-96 backdrop-blur-md">
        <h2 className="text-white text-3xl font-bold mb-6">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {type === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name || ""}
              onChange={handleChange}
              className="p-3 rounded bg-gray-700/50 text-white placeholder-gray-400 backdrop-blur-sm border border-gray-600 focus:border-primary outline-none"
            />
          )}
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
          <button
            type="submit"
            className="p-3 bg-primary rounded text-white hover:bg-purple-600 transition-all duration-300"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-400 mt-6 text-center">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:text-purple-400 transition-colors">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-purple-400 transition-colors">
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default AuthForm;