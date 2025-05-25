import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import Forum from "./pages/Forum";
import Events from "./pages/Events";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { UserProvider } from "./context/UserContext"; // ✅ context added

// Home page component
const Home = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h1>Welcome to Homeschool Hub</h1>
    <p>
      Please <a href="/login">Login</a> or <a href="/register">Register</a>
    </p>
  </div>
);

// Layout for pages with conditional Navbar
function AppLayout() {
  const location = useLocation();
  const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
        <Route path="/forum" element={<PrivateRoute><Forum /></PrivateRoute>} />
        <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

// Root App component wrapped in UserProvider
function App() {
  return (
    <UserProvider> {/* ✅ Wrap everything in UserProvider */}
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
