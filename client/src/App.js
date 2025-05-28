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
  import { UserProvider } from "./context/UserContext";
  // import GradeResources from "./components/GradeResources";
  import GradeSidebar from "./components/GradeSidebar";
  import LessonPage from "./pages/LessonPage";
  import 'bootstrap/dist/css/bootstrap.min.css';

  // Home page component with Bootstrap styling
  const Home = () => (
    <div className="container text-center my-5">
      <h1 className="display-4 mb-4">Welcome to Homeschool Hub</h1>
      <p className="lead">
        Please <a href="/login" className="btn btn-primary mx-2">Login</a> or <a href="/register" className="btn btn-outline-primary mx-2">Register</a>
      </p>
    </div>
  );

  // Layout for pages with conditional Navbar and Sidebar, using Bootstrap flex utilities
  function AppLayout() {
    const location = useLocation();
    const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);
    const hideSidebar = ["/", "/login", "/register"].includes(location.pathname);

    return (
      <>
        {!hideNavbar && <Navbar />}
        <div className="d-flex">
          {!hideSidebar && <GradeSidebar />}
          <main className="flex-grow-1 p-4 main-glass">
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
              {/* <Route path="/grade-resources" element={<PrivateRoute><GradeResources /></PrivateRoute>} /> */}
              <Route path="/lesson/:grade/:subject/:lesson" element={<PrivateRoute><LessonPage /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </>
    );
  }

  // Root App component wrapped in UserProvider
  function App() {
    return (
      <UserProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </UserProvider>
    );
  }

  export default App;
