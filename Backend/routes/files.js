import express from 'express';
import { 
  listFiles, 
  createFileOrFolder, 
  deletePath, 
  renamePath,
  readFile,     // ⬅ Added for reading file contents
  saveFile      // ⬅ Added for saving edited file contents
} from '../controllers/fileManagerController.js'; // ✅ Use updated controller

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

export default router;
