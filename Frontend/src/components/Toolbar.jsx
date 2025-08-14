import React from 'react';
import { Upload, FilePlus, FolderPlus, RefreshCw, Scissors, Copy, ClipboardList } from 'lucide-react';

const Toolbar = ({
  onUpload,
  onCreateFile,
  onCreateFolder,
  onRefresh,
  onCompressSelected,
  onCutSelected,      // ✅ NEW PROP
  onCopySelected,     // ✅ NEW PROP
  onPaste,            // ✅ NEW PROP
  selectedItems = [],
  canPaste = false,   // ✅ NEW PROP
}) => (
  <div className="flex flex-wrap gap-3 mb-5 bg-gray-900 p-3 rounded-lg shadow border border-gray-800">
    {/* Upload */}
    <button
      onClick={onUpload}
      className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      <Upload size={16} /> <span>Upload</span>
    </button>

    {/* New File */}
    <button
      onClick={onCreateFile}
      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      <FilePlus size={16} /> <span>New File</span>
    </button>

    {/* New Folder */}
    <button
      onClick={onCreateFolder}
      className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      <FolderPlus size={16} /> <span>New Folder</span>
    </button>

    {/* Refresh */}
    <button
      onClick={onRefresh}
      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
    >
      <RefreshCw size={16} /> <span>Refresh</span>
    </button>

    {/* 📦 Compress Selected */}
    <button
      onClick={onCompressSelected}
      disabled={!selectedItems || selectedItems.length === 0}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
        selectedItems && selectedItems.length > 0
          ? "bg-orange-700 hover:bg-orange-600 text-white cursor-pointer"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
      }`}
      title="Compress selected files/folders"
    >
      📦 Compress Selected
    </button>

    {/* ✂️ Cut */}
    <button
      onClick={onCutSelected}
      disabled={!selectedItems.length}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
        selectedItems.length > 0
          ? "bg-yellow-700 hover:bg-yellow-600 text-white cursor-pointer"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
      }`}
      title="Cut selected items"
    >
      <Scissors size={16} /> Cut
    </button>

    {/* 📄 Copy */}
    <button
      onClick={onCopySelected}
      disabled={!selectedItems.length}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
        selectedItems.length > 0
          ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
      }`}
      title="Copy selected items"
    >
      <Copy size={16} /> Copy
    </button>

    {/* 📋 Paste */}
    <button
      onClick={onPaste}
      disabled={!canPaste}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${
        canPaste
          ? "bg-green-700 hover:bg-green-600 text-white cursor-pointer"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
      }`}
      title="Paste items from clipboard"
    >
      <ClipboardList size={16} /> Paste
    </button>
  </div>
);

export default Toolbar;
