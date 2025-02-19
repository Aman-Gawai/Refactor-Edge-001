// client/src/pages/Profile.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api"; // Ensure you have an Axios instance (see later)
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    socialLinks: { linkedin: "", github: "", twitter: "" }
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    API.get("/users/profile")
      .then(({ data }) => setProfileData(data.user))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in profileData.socialLinks) {
      setProfileData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.patch("/users/profile", profileData)
      .then(({ data }) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Error updating profile");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Profile</h2>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profileData.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profileData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={profileData.bio}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profileData.location}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
          />
          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Social Links</h3>
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={profileData.socialLinks.linkedin}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary w-full"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={profileData.socialLinks.github}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary w-full"
            />
            <input
              type="text"
              name="twitter"
              placeholder="Twitter URL"
              value={profileData.socialLinks.twitter}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary w-full"
            />
          </div>
          <button
            type="submit"
            className="p-3 bg-primary rounded-lg text-white hover:bg-purple-600 transition mt-4"
          >
            Update Profile
          </button>
        </form>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-4 p-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
