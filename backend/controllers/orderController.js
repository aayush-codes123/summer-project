// controllers/orderController.js
const Order = require("../models/Order");
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const axios = require("axios");

exports.placeOrder = async (req, res) => {
  const { artworkId, amount, token } = req.body;
  const userId = req.user.id;

  try {
    // Verify payment with Khalti
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      {
        token,
        amount: amount * 100, // in paisa
      },
      {
        headers: {
          Authorization: `Key YOUR_KHALTI_SECRET_KEY`, // Replace this!
        },
      }
    );

    if (response.data.idx) {
      // Payment success - store order
      const newOrder = await Order.create({
        buyer: userId,
        artwork: artworkId,
        amount,
        transactionId: response.data.idx,
        paymentStatus: "Paid",
      });

      // Send email later here...

      return res.status(201).json({ message: "Order placed!", order: newOrder });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (err) {
    console.error("Khalti verification failed", err);
    return res.status(500).json({ message: "Payment failed", error: err.message });
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
