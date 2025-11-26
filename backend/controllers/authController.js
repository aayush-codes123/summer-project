const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const {
    fullName,
    username,
    password,
    email,
    phoneNumber,
    address,
    artStyle,
    age,
    role
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
      ...(role === "seller" && { artStyle }),
      ...(role === "buyer" && { age: parseInt(age) }),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};



exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // assuming you have middleware to set req.user from JWT
    const user = await User.findById(userId).select('-password -__v'); // exclude sensitive info
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
