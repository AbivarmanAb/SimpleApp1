const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST a new message
router.post("/", async (req, res) => {
  const { name, message } = req.body;

  // Validate input
  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  try {
    const newMessage = new Message({ name, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = router;
