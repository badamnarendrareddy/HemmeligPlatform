import React, { useState } from "react";
import { auth,googleProvider } from "../../utils/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        
      </div>
      <button className="button" onClick={handleLogin}><FaSignInAlt /> Login</button>
     
      <button className="button" onClick={handleGoogleLogin}><FcGoogle /> Login with Google</button>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
    </div>
  );
};

export default Login;