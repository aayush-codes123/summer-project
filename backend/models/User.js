const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  phoneNumber: String,
  address: String,
  artStyle: String, // Only for sellers
  role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" }
});

module.exports = mongoose.model("User", userSchema);
