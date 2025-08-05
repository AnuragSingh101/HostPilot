import User from "../models/User.js";
import Service from "../models/Service.js"; // assuming you have this
import Admin from "../models/Admin.js";

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// ✅ Suspend or Unsuspend a user
export const toggleUserSuspension = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isSuspended = !user.isSuspended;
    await user.save();

    res.status(200).json({ message: `User ${user.isSuspended ? "suspended" : "unsuspended"}` });
  } catch (err) {
    res.status(500).json({ message: "Error updating user status" });
  }
};

// ✅ View services of a particular user
export const getUserServices = async (req, res) => {
  try {
    const userId = req.params.userId;
    const services = await Service.find({ user: userId });

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user services" });
  }
};
