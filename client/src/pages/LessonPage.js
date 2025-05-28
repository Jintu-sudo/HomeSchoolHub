import React, { useState } from "react";
import { useParams } from "react-router-dom";
import gradeResources from "../data/GradeResourceData";
import { shapesAndSpacesLesson } from '../assets/videos';

const LessonPage = () => {
  const { grade, subject, lesson: slug } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const gradeData = gradeResources.find((g) => g.grade === grade);
  const subjectData = gradeData?.subjects.find((s) => s.name === subject);
  const lesson = subjectData?.lessons.find((l) => l.slug === slug);

  if (!gradeData || !subjectData || !lesson) {
    return (
      <div className="container py-5 text-center">
        <h2>Lesson not found</h2>
        <p>The lesson you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleSelect = (questionIndex, optionIndex) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: optionIndex,
      }));
    }
  };

  const handleSubmit = () => {
    if (
      lesson.assignment &&
      Object.keys(selectedAnswers).length !== lesson.assignment.length
    ) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
  };

  const getResultClass = (questionIndex, optionIndex) => {
    if (!submitted) return "";
    const correctAnswer = lesson.assignment[questionIndex].answer;
    const isCorrect =
      lesson.assignment[questionIndex].options[optionIndex] === correctAnswer;
    const isSelected = selectedAnswers[questionIndex] === optionIndex;
    if (isCorrect) return "text-success fw-bold";
    if (isSelected && !isCorrect) return "text-danger";
    return "";
  };

  const score = Object.entries(selectedAnswers).filter(([qIdx, optIdx]) => {
    const correct = lesson.assignment[qIdx].answer;
    const chosen = lesson.assignment[qIdx].options[optIdx];
    return correct === chosen;
  }).length;

  return (
    <div className="container py-4">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-primary">{lesson.title}</h2>
        <p className="text-muted mb-3">
          {subject} – {grade}
        </p>
        <hr />

        {/* JSX Content Rendering */}
        <div className="mb-4">
          {typeof lesson.content === "function" || typeof lesson.content === "object"
            ? lesson.content
            : <p>{lesson.content}</p>}
            <>
      <video width="640px" height="480px" controls>
        <source src={shapesAndSpacesLesson} type="video/mp4" />
      </video>
      <h3>What Are Shapes?</h3>
      <p>Shapes are forms or outlines of objects. Look around — everything you see has a shape!</p>

      <h5>Common Shapes:</h5>
      <ul>
        <li><strong>Circle</strong> – Round and smooth (like a coin)</li>
        <li><strong>Square</strong> – 4 equal sides and 4 corners</li>
        <li><strong>Rectangle</strong> – 4 sides with opposite sides equal</li>
        <li><strong>Triangle</strong> – 3 sides and 3 corners</li>
      </ul>

      <h3>Where Do We See Shapes?</h3>
      <ul>
        <li>Clock → Circle</li>
        <li>Door → Rectangle</li>
        <li>Road signs → Triangle or Square</li>
      </ul>

      <h3>What Is Space?</h3>
      <p>
        Space is the area around or inside shapes. Understanding space helps us figure out <strong>position</strong> and <strong>distance</strong>.
      </p>

      <h5>Spatial Concepts:</h5>
      <ul>
        <li><strong>Above / Below</strong></li>
        <li><strong>Near / Far</strong></li>
        <li><strong>Left / Right</strong></li>
        <li><strong>Inside / Outside</strong></li>
      </ul>

      <p>Try to look at your classroom or room and describe where things are using these words.</p>

      <hr />
      <p><strong>Now let’s try some questions below to check your understanding!</strong></p>
    </>
          {/* {lesson.pdfLink && (
            <a
              href={lesson.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary mt-3"
            >
              Download Chapter PDF
            </a>
          )} */}
        </div>

        {/* Assignment Section */}
        {lesson.assignment?.length > 0 && (
          <>
            <hr />
            <h4 className="mb-3">Assignment</h4>
            <form>
              {lesson.assignment.map((q, qIdx) => (
                <div key={qIdx} className="mb-4">
                  <p className="fw-semibold">{q.question}</p>
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${qIdx}`}
                        id={`q${qIdx}-opt${optIdx}`}
                        checked={selectedAnswers[qIdx] === optIdx}
                        onChange={() => handleSelect(qIdx, optIdx)}
                        disabled={submitted}
                      />
                      <label
                        className={`form-check-label ${getResultClass(
                          qIdx,
                          optIdx
                        )}`}
                        htmlFor={`q${qIdx}-opt${optIdx}`}
                      >
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              {!submitted ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit Assignment
                </button>
              ) : (
                <div className="alert alert-info mt-3">
                  You scored {score} out of {lesson.assignment.length}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
