import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus} from "react-icons/fa";
import "./index.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        
      </div>
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}><FaUserPlus /> Sign Up</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
    </div>
  );
};

export default Signup;