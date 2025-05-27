import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      alert(res.data.msg);
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to send message");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm p-4 border-0">
        <h1 className="mb-3 text-center text-primary">Contact Us</h1>
        <p className="text-center text-secondary mb-4">
          Have questions or feedback? We'd love to hear from you!
        </p>

        {submitted && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            ✅ Your message has been sent!
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setSubmitted(false)}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-floating mb-3">
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Your Name"
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="you@example.com"
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Your message here..."
              style={{ height: "150px" }}
            />
            <label htmlFor="message">Message</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
