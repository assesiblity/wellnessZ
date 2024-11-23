// controllers/clientController.js

const Client = require("../models/Client");
const User = require("../models/User");

// Create a new client and assign to a coach (accessible by admin and coach)
const createClient = async (req, res) => {
  const { name, email, phone, age, goal, coachId } = req.body;

  try {
    const coach = await User.findById(coachId);
    if (!coach || coach.role !== "coach") {
      return res.status(400).json({ message: "Invalid coach ID" });
    }

    const client = new Client({
      name,
      email,
      phone,
      age,
      goal,
      coachId: coachId,
    });

    await client.save();
    res.status(201).json({ message: "Client created successfully", client });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update client progress (only accessible by the assigned coach)
const updateClientProgress = async (req, res) => {
  const { progressNotes, lastUpdated, weight, bmi } = req.body;

  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Ensure the user making the request is the assigned coach
    if (client.coachId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this client" });
    }

    client.progressNotes = progressNotes || client.progressNotes;
    client.lastUpdated = lastUpdated || client.lastUpdated;
    client.weight = weight || client.weight;
    client.bmi = bmi || client.bmi;

    await client.save();
    res.status(200).json({ message: "Client progress updated", client });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a client (only accessible by admin)
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await client.remove();
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createClient, updateClientProgress, deleteClient };
