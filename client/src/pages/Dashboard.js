import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name || "User");
    } else {
      setUserName("User");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-3">Hello, {userName}!</h1>
      <h2 className="text-muted">Quick Links</h2>
    </div>
  );
};

export default Dashboard;
