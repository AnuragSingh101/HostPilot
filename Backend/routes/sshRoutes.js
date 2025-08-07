// routes/sshRoutes.js
import express from 'express';
import { createSSHSession } from '../controllers/sshController.js';

const router = express.Router();

router.post('/create', createSSHSession);

export default router; // ✅ ES module export
