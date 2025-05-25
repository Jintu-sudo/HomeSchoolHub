import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return null; // don't show navbar if not logged in

  return (
    <nav style={{ padding: "10px 20px", backgroundColor: "#eee", marginBottom: "20px" }}>
      <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
      <Link to="/resources" style={{ marginRight: "15px" }}>Resources</Link>
      <Link to="/forum" style={{ marginRight: "15px" }}>Forum</Link>
      <Link to="/events" style={{ marginRight: "15px" }}>Events</Link>
      <button onClick={handleLogout} style={{ marginLeft: "auto" }}>Logout</button>
    </nav>
  );
};

export default Navbar;
