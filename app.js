require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const clientRoutes = require("./routes/clientRoutes");
const coachRoutes = require("./routes/coachRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/coaches", coachRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
