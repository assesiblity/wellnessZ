const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  createCoach,
  getClientsForCoach,
} = require("../controllers/coachController");
const router = express.Router();

router.post("/coaches", protect, admin, createCoach); // Only admin can create
router.get("/:coachId/clients", protect, getClientsForCoach); // Coach or Admin

module.exports = router;
