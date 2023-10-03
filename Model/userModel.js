const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
  },
  phoneno: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
