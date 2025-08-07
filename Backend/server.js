// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import sshRoutes from './routes/sshRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config();
const app = express();

// CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);       // Signup, Login, Profile
app.use('/api/ssh', sshRoutes);         // SSH create/save route
app.use('/api/services', serviceRoutes); // Your services

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Express API Server running at http://localhost:${PORT}`);
});
