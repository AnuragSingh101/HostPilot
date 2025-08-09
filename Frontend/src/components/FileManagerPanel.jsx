import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import FileTable from './FileTable';
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
      console.log('📂 API Response:', data);

      if (Array.isArray(data.files)) {
        setFiles(data.files);
        setCurrentPath(dirPath);
      } else {
        console.error('Invalid data format', data);
      }
    } catch (err) {
      console.error('Failed to fetch files', err);
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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">📂 File Manager</h2>
        <button
          onClick={onBack}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⏪ Back to Terminal
        </button>
      </div>

      <Breadcrumb path={currentPath} onNavigate={fetchFileList} />
      <Toolbar onRefresh={() => fetchFileList(currentPath)} />

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
