import Admin from "../models/Admin.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 1️⃣ Admin Login as User (simulate)
export const loginAsUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Logged in as user",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
        services: user.services,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in as user", error: err.message });
  }
};

// 2️⃣ Suspend or Unsuspend a user’s service
export const toggleUserService = async (req, res) => {
  try {
    const { userId, serviceName } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const service = user.services.find(s => s.name === serviceName);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.status = service.status === "active" ? "suspended" : "active";
    await user.save();

    res.status(200).json({
      message: `Service '${serviceName}' status updated to ${service.status}`,
      services: user.services
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating service status", error: err.message });
  }
};

// 3️⃣ View user's services
export const getUserServices = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("fullName email services");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user: {
        fullName: user.fullName,
        email: user.email,
      },
      services: user.services,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user services", error: err.message });
  }
};
