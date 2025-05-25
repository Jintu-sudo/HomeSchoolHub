import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);

      // Store token and user info (if your backend returns user details)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // adjust if your API returns user

      alert("Login successful");
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["email", "password"].map((field) => (
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
