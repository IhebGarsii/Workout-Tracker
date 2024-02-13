const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const workout = require("./routes/workout");
const userRoute = require("./routes/user");
//express app
const app = express();

//midelware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.use("/api/workouts", workout);
app.use("/api/user", userRoute);

//connect to mogoose
mongoose.connect(process.env.MONG_URI).then(() => {
  console.log("connected");
  // listen for request
  app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
  });
});
