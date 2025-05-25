import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (stored in localStorage)
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      // If not logged in, redirect to login page
      navigate("/login");
    } else {
      // Parse user data from localStorage
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>

      {user && <h2 style={styles.subheading}>Hello, {user.name}!</h2>}

      <div style={styles.linksContainer}>
        <Link to="/resources" style={styles.link}>
          📚 Resources
        </Link>
        <Link to="/forum" style={styles.link}>
          🧵 Forum
        </Link>
        <Link to="/events" style={styles.link}>
          📅 Events
        </Link>
      </div>
    </div>
  );
}

// Inline styles (for now; can be replaced with CSS or Tailwind later)
const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.5rem",
    color: "#333",
  },
  linksContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  link: {
    textDecoration: "none",
    fontSize: "1.2rem",
    color: "#007bff",
  },
};

export default Dashboard;
