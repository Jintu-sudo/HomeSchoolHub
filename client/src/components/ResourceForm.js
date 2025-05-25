import React, { useState, useEffect } from "react";

const ResourceForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    type: "PDF",
    url: "",
    description: "",
    subject: "",
    grade: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded shadow-sm bg-body border"
    >
      <h5 className="mb-4 fw-semibold text-primary">Add / Edit Resource</h5>

      <div className="form-floating mb-3">
        <input
          type="text"
          id="resourceTitle"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
          placeholder="Resource Title"
          required
        />
        <label htmlFor="resourceTitle">Resource Title</label>
      </div>

      <div className="form-floating mb-3">
        <select
          id="resourceType"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="form-select"
        >
          <option value="PDF">PDF</option>
          <option value="Video">Video</option>
          <option value="Link">Link</option>
        </select>
        <label htmlFor="resourceType">Resource Type</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          id="resourceUrl"
          name="url"
          value={form.url}
          onChange={handleChange}
          className="form-control"
          placeholder="URL or File Path"
          required
        />
        <label htmlFor="resourceUrl">URL or File Path</label>
      </div>

      <div className="form-floating mb-3">
        <textarea
          id="resourceDescription"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Description"
          style={{ height: "100px" }}
        />
        <label htmlFor="resourceDescription">Description</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          id="resourceSubject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="form-control"
          placeholder="Subject"
        />
        <label htmlFor="resourceSubject">Subject</label>
      </div>

      <div className="form-floating mb-4">
        <input
          type="text"
          id="resourceGrade"
          name="grade"
          value={form.grade}
          onChange={handleChange}
          className="form-control"
          placeholder="Grade Level"
        />
        <label htmlFor="resourceGrade">Grade Level</label>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary px-4">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ResourceForm;
