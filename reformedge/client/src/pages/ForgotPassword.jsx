import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-bg">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
          <button type="submit" className="p-3 bg-primary rounded-lg text-white hover:bg-purple-600 transition">
            Send Reset Link
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Back to <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
