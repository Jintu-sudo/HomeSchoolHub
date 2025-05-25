import React, { useState, useEffect } from "react";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "",
    email: "",
    location: "",
    gradeLevel: "",
  };

  const [user, setUser] = useState(storedUser);
  const [form, setForm] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Simple validation
    if (!form.email || !form.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }

    // Save to state and localStorage
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const renderField = (label, value) => (
    <p>
      <strong>{label}:</strong> {value || "N/A"}
    </p>
  );

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center text-primary">Your Profile</h2>

        {!editMode ? (
          <>
            {renderField("Name", user.name)}
            {renderField("Email", user.email)}
            {renderField("Location", user.location)}
            {renderField("Grade Level", user.gradeLevel)}

            <div className="d-flex gap-2 mt-4">
              <button
                onClick={() => setEditMode(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            {[
              { name: "name", label: "Full Name" },
              { name: "email", label: "Email", type: "email" },
              { name: "location", label: "Location" },
              { name: "gradeLevel", label: "Grade Level" },
            ].map(({ name, label, type = "text" }) => (
              <div className="mb-3" key={name}>
                <label htmlFor={name} className="form-label">
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  className="form-control"
                  value={form[name]}
                  onChange={handleChange}
                  required={name === "name" || name === "email"}
                />
              </div>
            ))}

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
