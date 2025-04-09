import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RouteFinder from "./components/RouteFinder";  // Import the Route Finder component

const PrivateRoute = ({ element }) => {
  const authToken = localStorage.getItem("token"); // Check if token exists
  return authToken ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/route-finder" element={<PrivateRoute element={<RouteFinder />} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
