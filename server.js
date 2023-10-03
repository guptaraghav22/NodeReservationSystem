const express = require("express");
const mongoose = require("mongoose");
const db = require("./mongoose/connection");
const userModel = require("./Model/userModel");
const reservationRoutes = require("./authroutes/reservationroutes");
const authRoutes = require("./authroutes/authroutes");
const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/reservation", reservationRoutes);
app.get("/", (req, res) => {
  res.send("working");
});

app.post("/reservation", async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(2000, () => {
  console.log("server running on port 2000");
});
