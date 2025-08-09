// FileActionsModal.jsx
import React from 'react';

const FileActionsModal = ({ isOpen, type, name, onChange, onSubmit, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{type === 'create' ? 'Create New' : 'Rename'} {name}</h2>
        <input
          type="text"
          name="input"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none"
          placeholder={type === 'create' ? 'Enter name' : 'Enter new name'}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileActionsModal;