import React, { useState, useEffect } from "react";
import axios from "axios";
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

  // Fetch events from backend on mount & when user changes
  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents(res.data);
      } catch (err) {
        alert("Failed to load events from server.");
      }
    };

    fetchEvents();
  }, [user]);

  const handleAddClick = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents(events.filter((e) => e._id !== id));
      } catch (err) {
        alert("Failed to delete event.");
      }
    }
  };

  const handleFormSubmit = async (eventData) => {
    // Validation (you can adjust if your backend also validates)
    if (!eventData.title || !eventData.datetime) {
      alert("Title and date/time are required.");
      return;
    }
    if (new Date(eventData.datetime) < new Date()) {
      alert("Date must be in the future.");
      return;
    }

    try {
      if (editingEvent) {
        // Update event
        const res = await axios.put(
          `http://localhost:5000/api/events/${editingEvent._id}`,
          eventData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setEvents(events.map((e) => (e._id === editingEvent._id ? res.data : e)));
      } else {
        // Create new event
        const res = await axios.post(
          "http://localhost:5000/api/events",
          eventData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setEvents([...events, res.data]);
      }
      setShowForm(false);
    } catch (err) {
      alert("Failed to save event.");
    }
  };

  // Filter events for selected date and current user
  const filteredEvents = events.filter(
    (e) =>
      new Date(e.datetime).toDateString() === selectedDate.toDateString() &&
      e.owner === user?.id // Assuming owner stores user id
  );

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-semibold text-primary">My Events</h2>
        <button className="btn btn-primary" onClick={handleAddClick}>
          + Add Event
        </button>
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
                <div key={event._id} className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title mb-1">{event.title}</h5>
                        <p className="card-text text-muted small mb-1">{event.description}</p>
                        <p className="text-muted small">Owner: {user.email}</p>
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleEditClick(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(event._id)}
                        >
                          Delete
                        </button>
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
