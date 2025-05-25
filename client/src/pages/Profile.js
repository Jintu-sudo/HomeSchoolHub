import React, { useState, useEffect } from "react";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "",
    email: "",
    location: "",
    gradeLevel: "",
  };

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(storedUser);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEditMode(false);
    alert("Profile updated!");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Your Profile</h2>

        {!editMode ? (
          <div>
            <p><strong>Name:</strong> {user.name || "N/A"}</p>
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
            <p><strong>Location:</strong> {user.location || "N/A"}</p>
            <p><strong>Grade Level:</strong> {user.gradeLevel || "N/A"}</p>
            <button
              onClick={() => setEditMode(true)}
              className="btn btn-primary mt-3"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            {["name", "email", "location", "gradeLevel"].map((field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label text-capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  className="form-control"
                  id={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="d-flex gap-2">
              <button onClick={handleSave} className="btn btn-success">
                Save
              </button>
              <button onClick={() => setEditMode(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
