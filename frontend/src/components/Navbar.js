import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {authToken ? (
        <>
          <Link to="/route-finder">Route Finder</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
