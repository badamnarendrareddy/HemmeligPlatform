import React from "react";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const user = auth.currentUser;

  return (
    <div className="background">
    <div className="home-container">
      <h1>Welcome Hemmelig Platform</h1>
      <p>Share secrets securely with encrypted messages that automatically self-destruct after being read.</p>
      {user ? (
        <div className="cta-buttons">
          <Link to="/share" className="cta-button">Share Secret Message</Link>
          
        </div>
      ) : (
        <Link to="/login" className="cta-button">Get Started</Link>
      )}
    </div>
    </div>
  );
};

export default Home;