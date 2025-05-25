// components/GradeSidebar.js
import React, { useState } from "react";
import gradeResources from "../data/GradeResourceData";

const GradeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const selectedGradeData = gradeResources.find((g) => g.grade === selectedGrade);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: 20,
          right: isOpen ? 320 : 20,
          zIndex: 1001,
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#0d6efd",
          color: "white",
          cursor: "pointer",
          transition: "right 0.3s ease",
        }}
        aria-label={isOpen ? "Close Grade Sidebar" : "Open Grade Sidebar"}
      >
        {isOpen ? "Close" : "Grades"}
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : -320,
          width: 320,
          height: "100vh",
          backgroundColor: "white",
          borderLeft: "1px solid #ddd",
          boxShadow: "-3px 0 5px rgba(0,0,0,0.1)",
          padding: "1rem",
          overflowY: "auto",
          zIndex: 1000,
          transition: "right 0.3s ease",
        }}
      >
        <h5 className="mb-3 text-primary">Grades</h5>

        {/* Grade List */}
        {!selectedGrade ? (
          <ul className="list-group">
            {gradeResources.map(({ grade }) => (
              <li
                key={grade}
                className={`list-group-item list-group-item-action ${
                  selectedGrade === grade ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleGradeClick(grade)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGradeClick(grade);
                }}
              >
                {grade}
              </li>
            ))}
          </ul>
        ) : !selectedSubject ? (
          <>
            {/* Subject List */}
            <button
              className="btn btn-link mb-3"
              onClick={() => setSelectedGrade(null)}
            >
              ← Back to Grades
            </button>
            <h6 className="text-secondary mb-2">{selectedGrade} Subjects</h6>
            <ul className="list-group">
              {selectedGradeData.subjects.map(({ name }) => (
                <li
                  key={name}
                  className={`list-group-item list-group-item-action ${
                    selectedSubject === name ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSubjectClick(name)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubjectClick(name);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {/* Lessons List */}
            <button
              className="btn btn-link mb-3"
              onClick={() => setSelectedSubject(null)}
            >
              ← Back to Subjects
            </button>
            <h6 className="text-secondary mb-2">
              {selectedSubject} Lessons ({selectedGrade})
            </h6>
            <ul className="list-group">
              {selectedGradeData.subjects
                .find((subj) => subj.name === selectedSubject)
                .lessons.map(({ title, url, type, description }, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="pe-2">
                      <div className="fw-semibold">{title}</div>
                      <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                        {description}
                      </div>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary ms-2"
                      aria-label={`Open ${title}`}
                    >
                      {type === "pdf"
                        ? "PDF"
                        : type === "video"
                        ? "Video"
                        : "Link"}
                    </a>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default GradeSidebar;
