import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("${API_BASE}/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/route-finder");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error in login: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default Login;
