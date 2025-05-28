import React, { useState } from "react";

const Assignment = ({ questions }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qIndex, selected) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: selected }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="assignment">
      <h4>Assignment</h4>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "1.5rem" }}>
          <p><strong>{i + 1}. {q.question}</strong></p>
          {q.options.map((opt) => (
            <div key={opt}>
              <label>
                <input
                  type="radio"
                  name={`q-${i}`}
                  value={opt}
                  disabled={submitted}
                  checked={answers[i] === opt}
                  onChange={() => handleChange(i, opt)}
                />
                {" "}{opt}
              </label>
            </div>
          ))}
          {submitted && (
            <p style={{ color: answers[i] === q.answer ? "green" : "red" }}>
              {answers[i] === q.answer ? "✅ Correct" : `❌ Correct Answer: ${q.answer}`}
            </p>
          )}
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      )}
    </div>
  );
};

export default Assignment;
