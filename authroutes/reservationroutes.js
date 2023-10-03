const express = require("express");
const router = express.Router();
const authorizeRoles = require("../authrizationMiddleware/authorization");
const userModel = require("../Model/userModel");
const verifyToken = require("../authrizationMiddleware/verifyToken");
// router.post("/", authorizeRoles(["user"]), (req, res) => {
//   res.status(200).json({ message: "" });
// });

// router.post("/", authorizeRoles(["admin"]), (req, res) => {
//   res.status(200).json({ message: "" });
// });

router.post("/getallrecords", verifyToken, async (req, res) => {
  const user = req.user;
  if (user.role == "user") {
    const reservation = await userModel.find({});
    res.send(reservation);
  }

  try {
  } catch (err) {}
});

router.post("/updaterecord/:reservationid", verifyToken, async (req, res) => {
  const id = req.params.reservationid;
  const updaterecord = req.body;
  console.log("update");
  const user = req.user;
  //   console.log("user" + user.role);
  if (user.name === "admin") {
    console.log("admin");
    let data = userModel.find({ _id: id });
    await userModel.updateOne({ _id: id }, updaterecord);
    await userModel.findByIdAndUpdate(id, updaterecord);
    // console.log(await userModel.findOne({ _id: id }));

    // res.send("data updated");
  } else {
  }

  try {
  } catch (err) {}
});

module.exports = router;
