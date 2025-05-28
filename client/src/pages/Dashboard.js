import React from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();

  const quickLinks = [
    {
      title: "Resource Library",
      description: "Explore a curated list of homeschooling materials.",
      url: "https://www.khanacademy.org/",
      icon: "bi-journal-bookmark",
    },
    {
      title: "Event Calendar",
      description: "See upcoming homeschool events and activities.",
      url: "https://www.timeanddate.com/calendar/",
      icon: "bi-calendar-event",
    },
    {
      title: "Community Forums",
      description: "Connect and share ideas with other homeschoolers.",
      url: "https://welltrainedmind.com/community/",
      icon: "bi-chat-dots",
    },
    {
      title: "Profile Settings",
      description: "Update your personal and homeschooling preferences.",
      url: "/profile",
      icon: "bi-person-gear",
      internal: true, // Mark internal for react-router Link
    },
  ];

  // Mock summary info for upcoming features
  const summaryInfo = {
    upcomingEvents: 3,
    newForumPosts: 5,
    recommendedResources: 2,
  };

  return (
    <div className="container py-4">
      <div className="bg-body border rounded shadow-sm p-4 mb-4 text-center">
        <h1 className="display-5 fw-semibold text-primary">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="lead text-body">Your personalized homeschool dashboard</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="alert alert-info text-center">
            <strong>{summaryInfo.upcomingEvents}</strong> Upcoming Events
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-warning text-center">
            <strong>{summaryInfo.newForumPosts}</strong> New Forum Posts
          </div>
        </div>
        <div className="col-md-4">
          <div className="alert alert-success text-center">
            <strong>{summaryInfo.recommendedResources}</strong> Recommended Resources
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <h5 className="text-secondary mb-3">Quick Links</h5>
      <div className="row g-4 mb-4">
        {quickLinks.map((link, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            {link.internal ? (
              <Link to={link.url} className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition">
                  <div className="card-body text-center">
                    <i className={`bi ${link.icon} fs-1 text-primary mb-3`}></i>
                    <h6 className="card-title fw-bold text-dark">{link.title}</h6>
                    <p className="card-text text-muted small">{link.description}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition">
                  <div className="card-body text-center">
                    <i className={`bi ${link.icon} fs-1 text-primary mb-3`}></i>
                    <h6 className="card-title fw-bold text-dark">{link.title}</h6>
                    <p className="card-text text-muted small">{link.description}</p>
                  </div>
                </div>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
