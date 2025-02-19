import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const authLinks = (
    <>
      <Link to="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
      <Link to="/profile" className="text-white hover:text-primary">Profile</Link>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
      <Link to="/signup" className="hover:bg-blue-600 bg-blue-500 px-4 py-2 rounded transition-colors">Signup</Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 backdrop-blur-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">ReformEdge</Link>
        </h1>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/courses" className="hover:text-gray-300 transition-colors">Courses</Link>
          {user ? authLinks : guestLinks}
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full flex flex-col items-center bg-black bg-opacity-80 p-4">
          <Link to="/" className="py-2 w-full text-center hover:bg-gray-800" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/courses" className="py-2 w-full text-center hover:bg-gray-800" onClick={() => setIsOpen(false)}>Courses</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="py-2 w-full text-center hover:bg-gray-800" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/profile" className="py-2 w-full text-center hover:bg-gray-800" onClick={() => setIsOpen(false)}>Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="py-2 w-full text-center hover:bg-gray-800" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" className="py-2 w-full text-center bg-blue-500 hover:bg-blue-600 px-4 rounded transition-colors" onClick={() => setIsOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
