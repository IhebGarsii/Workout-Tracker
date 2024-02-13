const workoutModels = require("../models/workoutModels");
const mongoose = require("mongoose");
//Get all workout
const getworkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await workoutModels
    .find({ user_id })
    .sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//Get single workout
const getworkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no workout" });
  }
  const workout = await workoutModels.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "no workout" });
  }
  res.status(200).json(workout);
};

//create workout
const createworkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "fill all field", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workout = await workoutModels.create({
      title,
      load,
      reps,
      user_id,
    });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
  }
};
//update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not found" });
  }
  const workoutUpdate = await workoutModels.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workoutUpdate) {
    return res.status(400).jsonn({ error: "not found" });
  }
  res.status(200).json(workoutUpdate);
};
//delete workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not found" });
  }
  const workoutDelete = await workoutModels.findByIdAndDelete({ _id: id });
  if (!workoutDelete) {
    return res.status(404).json({ error: "not found" });
  }
  res.status(200).json(workoutDelete);
};

module.exports = {
  createworkout,
  getworkouts,
  getworkout,
  deleteWorkout,
  updateWorkout,
};
