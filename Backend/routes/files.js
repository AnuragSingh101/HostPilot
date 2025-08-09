// routes/files.js
import express from 'express';
import { listFiles, createFileOrFolder, deletePath, renamePath } from '../controllers/fileController.js';

const router = express.Router();

router.post('/list', listFiles);
router.post('/create', createFileOrFolder);
router.post('/delete', deletePath);
router.post('/rename', renamePath);

export default router;