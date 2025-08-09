// FileTable.jsx
import React from 'react';

const FileTable = ({ files = [], onDelete = () => {}, onRename = () => {}, onNavigate = () => {} }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file, idx) => (
              <tr key={idx} className="border-t">
                <td
                  className={`px-4 py-2 cursor-pointer ${file.type === 'directory' ? 'text-blue-600' : ''}`}
                  onClick={() => file.type === 'directory' && onNavigate(file.name)}
                >
                  {file.name}
                </td>
                <td className="px-4 py-2">{file.type}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    className="text-yellow-600 hover:underline mr-4"
                    onClick={() => onRename(file)}
                  >
                    Rename
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(file)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                No files found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
