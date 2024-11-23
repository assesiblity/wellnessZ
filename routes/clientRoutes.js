const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  createClient,
  updateClientProgress,
  deleteClient,
} = require("../controllers/clientController");
const router = express.Router();

router.post("/clients", protect, createClient); // Coach or Admin
router.patch("/clients/:id/progress", protect, updateClientProgress); // Only assigned coach
router.delete("/clients/:id", protect, admin, deleteClient); // Only admin

module.exports = router;
