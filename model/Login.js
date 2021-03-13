const mongoose = require("mongoose");

const LoginAdmin = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
    trim: true,
  },
  password: {
    type: "String",
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Login_Admin", LoginAdmin);