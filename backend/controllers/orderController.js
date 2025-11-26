// controllers/orderController.js
const Order = require("../models/Order");
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const axios = require("axios");
const { sendOrderConfirmation } = require("../utils/emailService");

exports.placeOrder = async (req, res) => {
  const { artworkId, amount, buyerName, shippingAddress, contactNumber } = req.body;
  const userId = req.user.id;

  try {
    // For now, skip Khalti verification and just save the order as Pending
    // In future, integrate payment gateway here

    const newOrder = await Order.create({
      buyer: userId,
      buyerName,
      shippingAddress,
      contactNumber,
      artwork: artworkId,
      amount,
      paymentStatus: "Paid", // Assuming payment is done on frontend for now
    });

    // Fetch artwork details for email
    const artwork = await Artwork.findById(artworkId);

    // Send Confirmation Email
    const buyerEmail = req.user.email; // Assuming user email is in req.user
    await sendOrderConfirmation(buyerEmail, {
      buyerName,
      artworkTitle: artwork.title,
      amount,
      orderId: newOrder._id,
      shippingAddress
    });

    return res.status(201).json({ message: "Order placed successfully!", order: newOrder });

  } catch (err) {
    console.error("Order placement failed", err);
    return res.status(500).json({ message: "Order placement failed", error: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate("artwork");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
