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
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td
                  className={`px-4 py-2 ${
                    file.type === 'folder' ? 'text-blue-600 cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    if (file.type === 'folder') {
                      onNavigate(file.name); // Trigger navigation only for folders
                    }
                  }}
                >
                  {file.name}
                </td>
                <td className="px-4 py-2">{file.type}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    className="text-yellow-600 hover:underline mr-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRename(file);
                    }}
                  >
                    Rename
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(file);
                    }}
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
