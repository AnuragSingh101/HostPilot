// Toolbar.jsx
import React from 'react';

const Toolbar = ({ onUpload, onCreate, onRefresh }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={onUpload}
      >
        ⬆️ Upload
      </button>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={onCreate}
      >
        📄 New File/Folder
      </button>
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        onClick={onRefresh}
      >
        🔄 Refresh
      </button>
    </div>
  );
};

export default Toolbar;
