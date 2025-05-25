import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    gradeLevel: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "location", label: "Location", type: "text" },
    { name: "gradeLevel", label: "Grade Level", type: "text" },
  ];

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <h3 className="text-center text-primary mb-3">Register</h3>
        <p className="text-muted text-center mb-4">Create your counselor account</p>

        <form onSubmit={handleSubmit}>
          {fields.map(({ name, label, type }) => (
            <div className="mb-3" key={name}>
              <label htmlFor={name} className="form-label fw-medium">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={form[name]}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
