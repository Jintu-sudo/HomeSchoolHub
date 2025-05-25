import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventForm from "../components/EventForm";
import { useUser } from "../context/UserContext";

const Events = () => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddClick = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const handleFormSubmit = (eventData) => {
    const validated = validateEvent(eventData);
    if (!validated.success) {
      alert(validated.message);
      return;
    }

    if (editingEvent) {
      setEvents(events.map(e => (e.id === editingEvent.id ? { ...eventData, id: e.id, owner: user.email } : e)));
    } else {
      setEvents([...events, { ...eventData, id: Date.now(), owner: user.email }]);
    }
    setShowForm(false);
  };

  const validateEvent = (data) => {
    if (!data.title || !data.date) return { success: false, message: "Title and date are required." };
    if (new Date(data.date) < new Date()) return { success: false, message: "Date must be in the future." };
    return { success: true };
  };

  // Events for selected day
  const filteredEvents = events.filter(
    (e) =>
      new Date(e.date).toDateString() === selectedDate.toDateString() &&
      e.owner === user?.email // Only user-owned events
  );

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-semibold text-primary">My Events</h2>
        <button className="btn btn-primary" onClick={handleAddClick}>+ Add Event</button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 col-lg-5">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="shadow-sm p-2 rounded"
          />
        </div>
        <div className="col-md-6 col-lg-7">
          <h5 className="text-secondary">Events on {selectedDate.toDateString()}</h5>

          {showForm && (
            <div className="my-3">
              <EventForm
                initialData={editingEvent}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          {filteredEvents.length === 0 ? (
            <p className="text-muted">No events for this day.</p>
          ) : (
            <div className="row gy-3">
              {filteredEvents.map((event) => (
                <div key={event.id} className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title mb-1">{event.title}</h5>
                        <p className="card-text text-muted small mb-1">{event.description}</p>
                        <p className="text-muted small">Owner: {event.owner}</p>
                      </div>
                      <div>
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEditClick(event)}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(event.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
