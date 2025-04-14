import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "", fname: "", lname: "" });
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const handleSignup = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
      navigate("/login");
    } catch (err) {
      alert("Error in signup: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <label>Password:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <label>First Name:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, fname: e.target.value })} required />
        <label>Last Name:</label>
        <input type="text" onChange={(e) => setFormData({ ...formData, lname: e.target.value })} required /><br/> 
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Signup;
