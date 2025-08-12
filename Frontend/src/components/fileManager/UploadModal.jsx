import React, { useState } from 'react';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    onUpload(file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form
        className="bg-white p-6 rounded shadow-lg w-96"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="mb-4 text-xl font-bold">Upload File</h2>
        <input type="file" onChange={handleFileChange} className="mb-3" />

        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => {
              setFile(null);
              setError('');
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadModal;
