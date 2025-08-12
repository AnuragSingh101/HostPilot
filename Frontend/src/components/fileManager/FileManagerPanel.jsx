import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Toolbar from '../Toolbar';
import FileTable from '../FileTable';
import Breadcrumb from './Breadcrumb';
import EditorModal from './EditorModal';
import FileActionsModal from './FileActionsModal';
import UploadModal from './UploadModal';

const FileManagerPanel = ({ credentials, onBack }) => {
  const [files, setFiles] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorFile, setEditorFile] = useState("");
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState('create'); // create | rename
  const [createTargetType, setCreateTargetType] = useState('file'); // file | folder
  const [actionName, setActionName] = useState('');
  const [actionFile, setActionFile] = useState(null);
  const [modalError, setModalError] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false); // ⬅ Upload modal state

  // -------------------------------
  // Fetch File List
  // -------------------------------
  const fetchFileList = async (dirPath) => {
    const targetPath = dirPath ?? currentPath;
    try {
      const res = await fetch('http://localhost:5000/api/files/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credentials, path: targetPath }),
      });
      const data = await res.json();
      if (Array.isArray(data.files)) {
        setFiles(data.files);
        setCurrentPath(targetPath);
      }
    } catch (err) {
      console.error("Failed to list files:", err);
    }
  };

  // -------------------------------
  // Navigation
  // -------------------------------
  const handleNavigate = (folderName) => {
    if (folderName === '.' || folderName === '..') {
      const parts = currentPath.split('/').filter(Boolean);
      parts.pop();
      fetchFileList('/' + parts.join('/') || '/');
    } else {
      const newPath = currentPath === '/' ? `/${folderName}` : `${currentPath}/${folderName}`;
      fetchFileList(newPath);
    }
  };

  // -------------------------------
  // Open File
  // -------------------------------
  const handleOpenFile = async (file) => {
    try {
      const res = await fetch("http://localhost:5000/api/files/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credentials, path: `${currentPath}/${file.name}` }),
      });
      const data = await res.json();
      setEditorContent(data.content || '');
      setEditorFile(file.name);
      setEditorOpen(true);
    } catch {
      alert("Error opening file");
    }
  };

  // -------------------------------
  // Save File
  // -------------------------------
  const handleSaveFile = async (newContent) => {
    try {
      const res = await fetch("http://localhost:5000/api/files/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credentials, path: `${currentPath}/${editorFile}`, content: newContent }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Failed to save file');
      }
    } catch {
      alert("Error saving file");
    } finally {
      setEditorOpen(false);
      fetchFileList(currentPath);
    }
  };

  // -------------------------------
  // Create File / Folder
  // -------------------------------
  const handleCreateFile = () => {
    setActionType('create');
    setCreateTargetType('file');
    setActionName('');
    setModalError('');
    setActionModalOpen(true);
  };

  const handleCreateFolder = () => {
    setActionType('create');
    setCreateTargetType('folder');
    setActionName('');
    setModalError('');
    setActionModalOpen(true);
  };

  // -------------------------------
  // Rename
  // -------------------------------
  const handleRename = (file) => {
    setActionType('rename');
    setActionName(file.name);
    setActionFile(file);
    setModalError('');
    setActionModalOpen(true);
  };

  // -------------------------------
  // Delete with instant UI + backend refresh
  // -------------------------------
  const handleDelete = async (file) => {
    if (window.confirm(`Delete "${file.name}"?`)) {
      setFiles((prev) => prev.filter((f) => f.name !== file.name)); // Optimistic UI update
      try {
        const res = await fetch('http://localhost:5000/api/files/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ credentials, path: `${currentPath}/${file.name}` }),
        });
        if (!res.ok) {
          const data = await res.json();
          alert(data.message || "Delete failed");
          fetchFileList(currentPath);
          return;
        }
        fetchFileList(currentPath);
      } catch (err) {
        console.error("Delete failed:", err);
        fetchFileList(currentPath);
      }
    }
  };

  // -------------------------------
  // Modal Submit (close & refresh immediately)
  // -------------------------------
  const handleActionModalSubmit = () => {
    setModalError('');
    setActionModalOpen(false); // Close modal
    setTimeout(() => {
      fetchFileList(currentPath); // refresh after close
    }, 100);

    if (!actionName.trim()) return;

    (async () => {
      try {
        if (actionType === 'create') {
          await fetch('http://localhost:5000/api/files/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              credentials,
              path: currentPath,
              name: actionName,
              type: createTargetType
            }),
          });
        } else if (actionType === 'rename') {
          await fetch('http://localhost:5000/api/files/rename', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              credentials,
              oldPath: `${currentPath}/${actionFile.name}`,
              newPath: `${currentPath}/${actionName}`
            }),
          });
        }
        fetchFileList(currentPath);
      } catch (err) {
        console.error("Action failed:", err);
      }
    })();
  };

  // -------------------------------
  // Upload functions
  // -------------------------------
  const handleUpload = () => {
    setUploadModalOpen(true);
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', currentPath);
      formData.append('credentials', JSON.stringify(credentials));

      const res = await fetch('http://localhost:5000/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Upload failed');
      } else {
        setUploadModalOpen(false);
        fetchFileList(currentPath);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading file');
    }
  };

  // -------------------------------
  // Initial load
  // -------------------------------
  useEffect(() => {
    if (credentials?.ip && credentials?.username) {
      fetchFileList('/');
    }
  }, [credentials]);

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 space-y-5">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">📂 File Manager</h2>
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
      <Toolbar
        onUpload={handleUpload}
        onCreateFile={handleCreateFile}
        onCreateFolder={handleCreateFolder}
        onRefresh={() => fetchFileList(currentPath)}
      />

      {/* File Table */}
      <FileTable
        files={files}
        onDelete={handleDelete}
        onRename={handleRename}
        onNavigate={handleNavigate}
        onOpen={handleOpenFile}
      />

      {/* Editor */}
      <EditorModal
        isOpen={editorOpen}
        fileName={editorFile}
        initialContent={editorContent}
        onClose={() => setEditorOpen(false)}
        onSave={handleSaveFile}
      />

      {/* Create/Rename Modal */}
      <FileActionsModal
        isOpen={actionModalOpen}
        type={actionType}
        name={actionName}
        onChange={setActionName}
        onSubmit={handleActionModalSubmit}
        onClose={() => setActionModalOpen(false)}
        error={modalError}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleFileUpload}
      />
    </div>
  );
};

export default FileManagerPanel;
