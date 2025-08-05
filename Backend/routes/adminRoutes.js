import express from "express";
import { getAllUsers, toggleUserSuspension, getUserServices } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// ⛔ Use both middleware for protection
router.use(protect, isAdmin);

// GET all users
router.get("/users", getAllUsers);

// PUT suspend/unsuspend user
router.put("/users/:userId/suspend", toggleUserSuspension);

// GET user's services
router.get("/users/:userId/services", getUserServices);

export default router;
