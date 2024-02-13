const express = require("express");
const workout = require("../models/workoutModels");
const requireAuth = require("../middlewere/reaquireAuth");
const workoutModels = require("../models/workoutModels");
const {
  createworkout,
  getworkouts,
  getworkout,
  updateWorkout,
  deleteWorkout,
} = require("../controller/controller");
const router = express.Router();
router.use(requireAuth);
//all work out
router.get("/", getworkouts);
// get single work out
router.get("/:id", getworkout);
//posst workout
router.post("/", createworkout);
//delete worout
router.delete("/:id", deleteWorkout);
//update workout
router.patch("/:id", updateWorkout);
module.exports = router;
