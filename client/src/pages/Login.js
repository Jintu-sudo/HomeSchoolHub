import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["email", "password"].map(field => (
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
