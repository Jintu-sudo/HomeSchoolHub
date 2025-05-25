import React, { useState, useMemo } from "react";
import ResourceForm from "../components/ResourceForm";

const initialResources = [
  {
    id: 1,
    title: "Khan Academy: Math Basics",
    type: "link",
    url: "https://www.khanacademy.org/math",
    description: "Free comprehensive math lessons and exercises.",
    subject: "Math",
    grade: "All grades",
  },
  {
    id: 2,
    title: "National Geographic Kids",
    type: "link",
    url: "https://kids.nationalgeographic.com/",
    description: "Fun science and geography resources for kids.",
    subject: "Science",
    grade: "Elementary",
  },
  {
    id: 3,
    title: "History.com",
    type: "link",
    url: "https://www.history.com/",
    description: "History articles, videos, and interactive content.",
    subject: "History",
    grade: "Middle & High school",
  },
  {
    id: 4,
    title: "Coursera: Free Online Courses",
    type: "link",
    url: "https://www.coursera.org/",
    description: "Various courses from top universities.",
    subject: "General",
    grade: "High school & up",
  },
  {
    id: 5,
    title: "YouTube Education Channel - CrashCourse",
    type: "video",
    url: "https://www.youtube.com/user/crashcourse",
    description: "Educational videos on science, history, and more.",
    subject: "General",
    grade: "All grades",
  },
];

const Resources = () => {
  const [resources, setResources] = useState(initialResources);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddClick = () => {
    setEditingResource(null);
    setShowForm(true);
  };

  const handleEditClick = (resource) => {
    setEditingResource(resource);
    setShowForm(true);
  };

  const getNextId = () => {
    if (resources.length === 0) return 1;
    return Math.max(...resources.map((r) => r.id)) + 1;
  };

  const handleFormSubmit = (resourceData) => {
    if (editingResource) {
      setResources(
        resources.map((r) =>
          r.id === editingResource.id ? { ...resourceData, id: r.id } : r
        )
      );
    } else {
      setResources([...resources, { ...resourceData, id: getNextId() }]);
    }
    setShowForm(false);
  };

  const filteredResources = useMemo(() => {
    if (!searchTerm.trim()) return resources;
    return resources.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [resources, searchTerm]);

  const resourceActionText = (type) => {
    switch (type) {
      case "pdf":
        return "Download PDF";
      case "video":
        return "Watch Video";
      case "link":
      default:
        return "Visit Link";
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Educational Resources</h2>
        <button className="btn btn-primary" onClick={handleAddClick}>
          Add Resource
        </button>
      </div>

      <input
        type="text"
        placeholder="Search resources..."
        className="form-control mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {showForm && (
        <div className="mb-4">
          <ResourceForm
            initialData={editingResource}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {filteredResources.length === 0 ? (
        <p className="text-muted">No resources found.</p>
      ) : (
        <ul className="list-group">
          {filteredResources.map((res) => (
            <li
              key={res.id}
              className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row"
            >
              <div>
                <strong>{res.title}</strong> —{" "}
                <span className="text-muted">{res.description}</span> <br />
                <small>
                  Subject: {res.subject} | Grade: {res.grade}
                </small>
                <br />
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  {resourceActionText(res.type)}
                </a>
              </div>

              <button
                className="btn btn-sm btn-outline-secondary mt-3 mt-md-0"
                onClick={() => handleEditClick(res)}
                aria-label={`Edit resource ${res.title}`}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Resources;
