import React from "react";

const About = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <h1 className="mb-4 text-primary fw-bold">About Homeschool Hub</h1>

      <p className="lead text-body mb-4">
        <strong>Homeschool Hub</strong> is a supportive platform built for homeschooling families, educators,
        and learners. It offers easy-to-use tools to share resources, organize learning events, and foster a vibrant learning community.
      </p>

      <h5 className="text-secondary fw-semibold mt-4">Our Mission</h5>
      <p className="text-body mb-3">
        To empower independent learners and homeschooling communities through accessible tools, collaborative features, and shared knowledge.
      </p>

      <h5 className="text-secondary fw-semibold mt-4">What You Can Do</h5>
      <ul className="text-body mb-4">
        <li>📚 Access and share educational resources (PDFs, videos, websites)</li>
        <li>📅 Create and join community events and learning sessions</li>
        <li>👥 Connect with other homeschooling families and educators</li>
        <li>🧑‍🎓 Manage your profile and track your learning journey</li>
      </ul>

      <p className="text-muted">
        Whether you're a parent teaching at home, a tutor supporting multiple families, or a student charting your own course — Homeschool Hub is here to support your learning journey every step of the way.
      </p>
    </div>
  );
};

export default About;
