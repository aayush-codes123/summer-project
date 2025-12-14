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
    // Validation
    if (role === "buyer") {
      const ageValue = parseInt(age);
      if (isNaN(ageValue) || ageValue < 18 || ageValue > 50) {
        return res.status(400).json({ message: "Age must be between 18 and 50 to sign up" });
      }
    }

    const phoneRegex = /^98\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number should start from 98 and should be 10 digit only" });
    }

    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: "Username should be text only and should be unique for each user and no spaces or numners" });
    }

    // Check for existing user
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username should be text only and should be unique for each user and no spaces or numners" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

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
