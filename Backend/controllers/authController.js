// controllers/authController.js

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      password,
      address,
      accountType,
      companyDetails,
      studentDetails,
      individualDetails
    } = req.body;

    // ✅ Validate required fields
    if (!fullName || !email || !password || !accountType) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, password, and account type are required."
      });
    }

    // 🔍 Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered."
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📦 Prepare user data
    const userData = {
      fullName,
      phone,
      email,
      password: hashedPassword,
      address,
      accountType
    };

    // ➕ Conditionally add details if valid
    if (accountType === 'employee' && companyDetails && Object.keys(companyDetails).length > 0) {
      userData.companyDetails = companyDetails;
    } else if (accountType === 'student' && studentDetails && Object.keys(studentDetails).length > 0) {
      userData.studentDetails = studentDetails;
    } else if (accountType === 'individual' && individualDetails && Object.keys(individualDetails).length > 0) {
      userData.individualDetails = individualDetails;
    }

    // 🏗️ Create and save user
    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        accountType: newUser.accountType
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};





export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check for empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // 🔍 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // ❌ If suspended
    if (user.isSuspended) {
      return res.status(403).json({ message: "Your account is suspended. Please contact support." });
    }

    // 🪙 Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: "user", accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Respond
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const profile = async (req, res) => {
  res.send("Profile page");
};