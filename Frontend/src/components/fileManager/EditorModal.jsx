import React, { useState, useEffect } from 'react';

const EditorModal = ({ isOpen, fileName, initialContent, onClose, onSave }) => {
  const [content, setContent] = useState(initialContent || '');
  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent, fileName, isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg w-3/4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">{fileName}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">✕</button>
        </div>
        <textarea
          className="flex-1 p-4 font-mono text-sm outline-none border-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="p-4 border-t flex justify-end gap-2">
          <button onClick={() => onSave(content)} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
