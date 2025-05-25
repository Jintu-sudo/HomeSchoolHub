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
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["name", "email", "password", "location", "gradeLevel"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
