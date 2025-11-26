// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyerName: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  artwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artwork",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: String,
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
