const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, location, gradeLevel } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      location,
      gradeLevel,
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ msg: "Server error during registration." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        gradeLevel: user.gradeLevel,
        phone: user.phone,
        bio: user.bio,
        website: user.website,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error during login." });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, location, gradeLevel, phone, bio, website } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, location, gradeLevel, phone, bio, website },
      { new: true }
    );

    res.json({
      msg: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        gradeLevel: updatedUser.gradeLevel,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        website: updatedUser.website,
      },
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ msg: "Server error updating profile." });
  }
};

module.exports = { register, login, updateProfile };
