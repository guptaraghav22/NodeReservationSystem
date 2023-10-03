const express = require("express");
const router = express.Router();
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, age, gender, phoneno, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      age,
      gender,
      phoneno,
      password: hashedPassword,
      role,
    });
    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "user not created" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password, role } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ error: "Authentication error" });
    }
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.status(200).json({});
    }
    const payload = {
      userId: user._id,
      name: user.name,
      role: role,
    };
    console.log(payload);
    const secretkey = "secret";
    const option = { expiresIn: "30d" };
    const token = jwt.sign(payload, secretkey, option);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Authentication failed" });
  }
});

module.exports = router;
