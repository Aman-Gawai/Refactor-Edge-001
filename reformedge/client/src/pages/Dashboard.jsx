import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-6">Dashboard Overview</h1>
        
        {/* User Welcome Section */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6 mb-6">
          <p className="text-xl text-white">
            Welcome back, <span className="font-semibold">{user?.name || "User"}</span>!
          </p>
          <p className="text-gray-300 mt-2">
            Manage your courses and track your progress here.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6 hover:bg-gray-700/50 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">Profile Settings</h3>
            <p className="text-gray-300">Update your personal information and preferences</p>
          </button>
          
          <button
            onClick={() => navigate("/courses")}
            className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6 hover:bg-gray-700/50 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">Your Courses</h3>
            <p className="text-gray-300">View and manage your enrolled courses</p>
          </button>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Courses Enrolled</h3>
            <p className="text-3xl text-primary">0</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Completed</h3>
            <p className="text-3xl text-primary">0</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
            <p className="text-3xl text-primary">0</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full p-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;