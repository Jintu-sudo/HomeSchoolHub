import React, { useState } from "react";
import EventForm from "../components/EventForm";

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Math Workshop",
      date: "2025-06-01",
      description: "Interactive math session for grade 6-8 students.",
    },
    {
      id: 2,
      title: "Science Fair",
      date: "2025-06-15",
      description: "Annual science fair presentation.",
    },
    {
      id: 3,
      title: "Art Class",
      date: "2025-06-20",
      description: "Creative art workshop for beginners.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddClick = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormSubmit = (eventData) => {
    if (editingEvent) {
      setEvents(events.map(e => (e.id === editingEvent.id ? { ...eventData, id: e.id } : e)));
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Upcoming Events</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddClick}>Add Event</button>

      {showForm && (
        <EventForm
          initialData={editingEvent}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {events.length === 0 ? (
        <p className="text-muted">No upcoming events.</p>
      ) : (
        <ul className="list-unstyled">
          {events.map((event) => (
            <li
              key={event.id}
              className="border rounded p-3 mb-3 shadow-sm"
            >
              <h4>{event.title}</h4>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p>{event.description}</p>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEditClick(event)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
