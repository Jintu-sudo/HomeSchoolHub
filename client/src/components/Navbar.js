import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm py-3 ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand fw-bold text-uppercase me-4" to="/dashboard">
          <span className="text-success">Homeschool</span>{" "}
          <span className="text-secondary">Hub</span>
        </NavLink>

        <div className="d-flex align-items-center flex-grow-1 justify-content-between">
          {/* Nav Links */}
          <ul className="navbar-nav flex-row gap-3 mb-0">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/resources", label: "Resources" },
              { to: "/forum", label: "Forum" },
              { to: "/events", label: "Events" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Us" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link fw-semibold ${isActive ? "text-success border-bottom border-success border-2" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-2 ms-4 flex-wrap">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-sm btn-outline-${darkMode ? "light" : "dark"} d-flex align-items-center gap-1`}
            >
              <FaTwitter size={18} />
              <span>Twitter</span>
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-sm btn-outline-${darkMode ? "light" : "dark"} d-flex align-items-center gap-1`}
            >
              <FaInstagram size={18} />
              <span>Instagram</span>
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-sm btn-outline-${darkMode ? "light" : "dark"} d-flex align-items-center gap-1`}
            >
              <FaFacebookF size={18} />
              <span>Facebook</span>
            </a>

            <NavLink to="/profile" className="btn btn-outline-primary btn-sm">
              Profile
            </NavLink>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-outline-secondary btn-sm"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
