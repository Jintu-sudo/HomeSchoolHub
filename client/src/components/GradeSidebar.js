import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import gradeResources from "../data/GradeResourceData";

const allGrades = [
  "Nursery",
  "KG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const GradeSidebar = () => {
  const location = useLocation();
  const hiddenPaths = ["/", "/login", "/register"];
  const shouldHideSidebar = hiddenPaths.includes(location.pathname);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleGradeClick = (grade) => {
    if (grade === "Grade 1") {
      setSelectedGrade(grade);
      setSelectedSubject(null);
    } else {
      setShowDialog(true);
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  const selectedGradeData = gradeResources.find((g) => g.grade === selectedGrade);

  if (shouldHideSidebar) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: 80,
          left: isOpen ? 320 : 20,
          zIndex: 1001,
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#0d6efd",
          color: "white",
          cursor: "pointer",
          transition: "left 0.3s ease",
        }}
        aria-label={isOpen ? "Close Grade Sidebar" : "Open Grade Sidebar"}
      >
        {isOpen ? "Close" : "Grades"}
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 70,
          left: isOpen ? 0 : -320,
          width: 320,
          height: "calc(100vh - 70px)",
          backgroundColor: "white",
          borderRight: "1px solid #ddd",
          boxShadow: "3px 0 5px rgba(0,0,0,0.1)",
          padding: "1rem",
          overflowY: "auto",
          zIndex: 1000,
          transition: "left 0.3s ease",
        }}
      >
        <h5 className="mb-3 text-primary">Grades</h5>

        {/* Grade List */}
        {!selectedGrade ? (
          <ul className="list-group">
            {allGrades.map((grade) => (
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
            <button
              className="btn btn-link mb-3 p-0"
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
            <button
              className="btn btn-link mb-3 p-0"
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
                .lessons.map(({ title, slug }, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="pe-2">
                      <div className="fw-semibold">{title}</div>
                    </div>
                    <Link
                      to={`/lesson/${encodeURIComponent(selectedGrade)}/${encodeURIComponent(selectedSubject)}/${encodeURIComponent(slug)}`}
                      className="btn btn-sm btn-outline-primary ms-2"
                    >
                      View
                    </Link>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>

      {/* Popup Dialog for grades without content */}
      {showDialog && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
          onClick={() => setShowDialog(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "2rem",
              maxWidth: "320px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h5 className="mb-3">Coming Soon</h5>
            <p>More content to be added in the future.</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowDialog(false)}
              autoFocus
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GradeSidebar;
