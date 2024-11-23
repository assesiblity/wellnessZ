// controllers/coachController.js

const User = require("../models/User"); // Assuming the coach is a User model
const Client = require("../models/Client");

// Create a new coach (only accessible by admin)
const createCoach = async (req, res) => {
  const { name, email, password, specialization } = req.body;

  try {
    const coachExists = await User.findOne({ email });
    if (coachExists) {
      return res.status(400).json({ message: "Coach already exists" });
    }

    const coach = new User({
      name,
      email,
      password,
      role: "coach",
      specialization,
    });

    await coach.save();
    res.status(201).json({ message: "Coach created successfully", coach });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all clients for a specific coach (accessible by coach or admin)
const getClientsForCoach = async (req, res) => {
  try {
    const clients = await Client.find({ coachId: req.params.coachId });
    if (clients.length === 0) {
      return res
        .status(404)
        .json({ message: "No clients found for this coach" });
    }
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createCoach, getClientsForCoach };
