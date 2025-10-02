import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import middleware from "../middleware/middleware.js"; 

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ success: false, message: "User already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"4h"})
    return res.status(200).json({ success: true, message: "Account Created Successfully " ,token,      user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Error in Adding User " });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User Not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ success: false, message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });

    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Login Successfully ",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Error in Login server " });
  }
});

// Verify
router.get("/verify", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Error in verifying user" });
  }
});

export default router;
