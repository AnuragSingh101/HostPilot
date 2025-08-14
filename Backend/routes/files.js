import express from 'express';
import { 
  listFiles, 
  createFileOrFolder, 
  deletePath, 
  renamePath,
  readFile,    // ⬅ For reading file contents
  saveFile,    // ⬅ For saving edited file contents
  uploadFile,   // ⬅ NEW: For uploading files to server
  downloadFile, // ⬅ NEW: For downloading files from server
  compressFiles, // ⬅ NEW: For compressing files
  copyFiles,    // ⬅ NEW: For copying files or folders
    moveFiles,   // ⬅ NEW: For moving files or folders
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


// 📥 Download file
router.post('/download', downloadFile);    // Download file from server

// 🗜️ Compress files into a zip archive
router.post('/compress', compressFiles); // Compress files into a zip archive


// 🪓 Move files or folders
router.post('/move', moveFiles);

// 📄 Copy files or folders
router.post('/copy', copyFiles);


export default router;
