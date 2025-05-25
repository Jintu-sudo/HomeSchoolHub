import React, { useState } from "react";

const EventForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    datetime: initialData.datetime || "",
    description: initialData.description || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={form.title}
        onChange={handleChange}
        required
        className="mb-2 p-2 border rounded w-full"
      />

      <input
        type="datetime-local"
        name="datetime"
        value={form.datetime}
        onChange={handleChange}
        required
        className="mb-2 p-2 border rounded w-full"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        className="mb-2 p-2 border rounded w-full"
      />

      <button type="submit" className="mr-2 bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      )}
    </form>
  );
};

export default EventForm;
