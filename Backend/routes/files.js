import express from 'express';
import { 
  listFiles, 
  createFileOrFolder, 
  deletePath, 
  renamePath,
  readFile,    // ⬅ For reading file contents
  saveFile,    // ⬅ For saving edited file contents
  uploadFile   // ⬅ NEW: For uploading files to server
} from '../controllers/fileManagerController.js';

const router = express.Router();

// 📂 List directory contents
router.post('/list', listFiles);

// 🆕 Create file or folder
router.post('/create', createFileOrFolder);

// ❌ Delete file or folder
router.post('/delete', deletePath);

// ✏️ Rename file or folder
router.post('/rename', renamePath);

// 📄 Read file contents
router.post('/read', readFile);

// 💾 Save/update file contents
router.post('/save', saveFile);

// 📤 Upload file
router.post('/upload', ...uploadFile); // spread because uploadFile is [multerMiddleware, handler]

export default router;
