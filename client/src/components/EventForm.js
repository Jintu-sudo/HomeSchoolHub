import React, { useState, useEffect } from "react";

const EventForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    datetime: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        datetime: initialData.datetime || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.datetime.trim()) {
      alert("Please provide both a title and a date/time.");
      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded shadow-sm bg-body border"
    >
      <h5 className="mb-4 fw-semibold text-primary">
        {initialData?.title ? "Edit Event" : "Add New Event"}
      </h5>

      <div className="form-floating mb-3">
        <input
          type="text"
          id="eventTitle"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
          placeholder="Event Title"
          required
        />
        <label htmlFor="eventTitle">Event Title</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="datetime-local"
          id="eventDatetime"
          name="datetime"
          value={form.datetime}
          onChange={handleChange}
          className="form-control"
          placeholder="Date & Time"
          required
        />
        <label htmlFor="eventDatetime">Date & Time</label>
      </div>

      <div className="form-floating mb-4">
        <textarea
          id="eventDescription"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Description"
          style={{ height: "100px" }}
        />
        <label htmlFor="eventDescription">Description</label>
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

export default EventForm;
