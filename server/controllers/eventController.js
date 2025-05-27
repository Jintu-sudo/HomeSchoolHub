const Event = require("../models/event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const addEvent = async (req, res) => {
  const { title, datetime, description } = req.body;
  try {
    const event = new Event({
      title,
      datetime,
      description,
      owner: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, description } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    if (event.owner.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    event.title = title || event.title;
    event.datetime = datetime || event.datetime;
    event.description = description || event.description;

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    if (event.owner.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    await event.remove();
    res.json({ msg: "Event removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getEvents, addEvent, updateEvent, deleteEvent };
