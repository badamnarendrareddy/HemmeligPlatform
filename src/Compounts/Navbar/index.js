import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { FaSignOutAlt, FaHome, FaComments, FaUser, FaSignInAlt } from "react-icons/fa";
import "./index.css"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to home page after logout
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <h2>Hemmelig Platform</h2>
      </div>
      <nav className="navbar-links">
        <Link to="/" className="nav-link">
          <FaHome className="nav-icon" /> Home
        </Link>
        {user && (
          <Link to="/share" className="nav-link">
            <FaComments className="nav-icon" /> Share Message
          </Link>
        )}
        {user && (
          <Link to="/dashboard" className="nav-link">
            <FaUser className="nav-icon" /> Dashboard
          </Link>
        )}
        {user ? (
          <div className="nav-link logout-link" onClick={handleLogout}>
            <FaSignOutAlt className="nav-icon" /> Logout
          </div>
        ) : (
          <Link to="/login" className="nav-link">
            <FaSignInAlt className="nav-icon" /> Login/Signup
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;