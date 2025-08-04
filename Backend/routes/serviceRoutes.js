// routes/serviceRoutes.js
import express from 'express';
import { useService, getAvailableServices } from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/services — list available services for user
router.get('/', protect, getAvailableServices);

// POST /api/services/use/:serviceId — log service usage
router.post('/use/:serviceId', protect, useService);

export default router;
