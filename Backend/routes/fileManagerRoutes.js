// routes/files.js
import express from 'express';
import { listFilesController } from '../controllers/fileController.js';

const router = express.Router();

router.post('/list', listFilesController);

export default router;
// fileManagerRoutes.js