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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {["name", "email", "password", "location", "gradeLevel"].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label text-capitalize">
                {field}
              </label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                className="form-control"
                id={field}
                name={field}
                placeholder={`Enter your ${field}`}
                value={form[field]}
                onChange={handleChange}
                required
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
