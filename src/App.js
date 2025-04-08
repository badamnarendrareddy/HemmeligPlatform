import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Compounts/Navbar";
import Home from "./Compounts/Home";
import Login from "./Compounts/Auth/login";
import Signup from "./Compounts/Auth/signup";
import Share from "./Compounts/Share";
import SecretPage from "./Compounts/SecretPage";
import Dashboard from "./Compounts/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";

const App = () => (
  <Router>
   
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share" element={<PrivateRoute><Share /></PrivateRoute>} />
        <Route path="/secret/:id" element={<SecretPage />} />
        <Route path="/dashboard " element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    
  </Router>
);

export default App;