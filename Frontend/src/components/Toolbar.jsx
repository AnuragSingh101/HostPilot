import React from 'react';
import { Upload, FilePlus, FolderPlus, RefreshCw } from 'lucide-react';

const Toolbar = ({ onUpload, onCreateFile, onCreateFolder, onRefresh }) => (
  <div className="flex flex-wrap gap-3 mb-5 bg-gray-900 p-3 rounded-lg shadow border border-gray-800">
    <button onClick={onUpload} className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition">
      <Upload size={16} /> <span>Upload</span>
    </button>
    <button onClick={onCreateFile} className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition">
      <FilePlus size={16} /> <span>New File</span>
    </button>
    <button onClick={onCreateFolder} className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow transition">
      <FolderPlus size={16} /> <span>New Folder</span>
    </button>
    <button onClick={onRefresh} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition">
      <RefreshCw size={16} /> <span>Refresh</span>
    </button>
  </div>
);

export default Toolbar;
