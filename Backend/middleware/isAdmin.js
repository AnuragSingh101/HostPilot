// middleware/isAdmin.js
import Admin from "../models/Admin.js";

export const isAdmin = async (req, res, next) => {
  const admin = await Admin.findById(req.user._id);
  if (!admin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
