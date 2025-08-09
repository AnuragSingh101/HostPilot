// FileManagerPanel.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Toolbar from '../Toolbar';
import FileTable from '../FileTable';
import Breadcrumb from './Breadcrumb';

const FileManagerPanel = ({ credentials, onBack }) => {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');

  const fetchFileList = async (dirPath = '/') => {
    try {
      const res = await fetch('http://localhost:5000/api/files/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credentials,
          path: dirPath
        }),
      });
      const data = await res.json();
      if (Array.isArray(data.files)) {
        setFiles(data.files);
        setCurrentPath(dirPath);
      }
    } catch (err) {
      // Log error
    }
  };

  const handleNavigate = (folderName) => {
    if (folderName === '.' || folderName === '..') {
      const parts = currentPath.split('/').filter(Boolean);
      parts.pop();
      const newPath = '/' + parts.join('/');
      setCurrentPath(newPath || '/');
      fetchFileList(newPath || '/');
    } else {
      const newPath = currentPath === '/'
        ? `/${folderName}`
        : `${currentPath}/${folderName}`;
      setCurrentPath(newPath);
      fetchFileList(newPath);
    }
  };

  useEffect(() => {
    if (credentials?.ip && credentials?.username) {
      fetchFileList('/');
    }
  }, [credentials]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          📂 File Manager
        </h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg shadow transition"
        >
          <ArrowLeft size={18} /> Back to Terminal
        </button>
      </div>
      {/* Breadcrumb */}
      <Breadcrumb path={currentPath} onNavigate={fetchFileList} />
      {/* Toolbar */}
      <Toolbar onRefresh={() => fetchFileList(currentPath)} />
      {/* File Table */}
      <FileTable
        files={files}
        onDelete={(name) => console.log('Delete', name)}
        onRename={(name) => console.log('Rename', name)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
export default FileManagerPanel;
