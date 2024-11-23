// models/Client.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  goal: { type: String, required: true },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  progressNotes: { type: String },
  lastUpdated: { type: Date },
  weight: { type: Number },
  bmi: { type: Number },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
