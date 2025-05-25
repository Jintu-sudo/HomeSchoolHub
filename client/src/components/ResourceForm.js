import React, { useState } from "react";

const ResourceForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    type: initialData.type || "PDF",  // PDF, Video, Link
    url: initialData.url || "",
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
        placeholder="Resource Title"
        value={form.title}
        onChange={handleChange}
        required
        className="mb-2 p-2 border rounded w-full"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      >
        <option value="PDF">PDF</option>
        <option value="Video">Video</option>
        <option value="Link">Link</option>
      </select>

      <input
        type="text"
        name="url"
        placeholder="URL or file path"
        value={form.url}
        onChange={handleChange}
        required
        className="mb-2 p-2 border rounded w-full"
      />

      <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
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

export default ResourceForm;
