import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await resetPassword(token, password);
      setMessage(res.data.message);
      setError("");
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-bg">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
          <button type="submit" className="p-3 bg-primary rounded-lg text-white hover:bg-purple-600 transition">
            Reset Password
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Back to <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
