// FileTable.jsx
import React from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';

const FileTable = ({
  files = [],
  onDelete = () => {},
  onRename = () => {},
  onNavigate = () => {},
  onOpen = () => {} // ⬅ Added for opening files in the editor
}) => {
  return (
    <div className="overflow-x-auto bg-gray-900 rounded-lg shadow border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Type</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-800 hover:bg-gray-800/70 transition"
              >
                {/* File Name Cell */}
                <td
                  className={`px-4 py-2 flex items-center gap-2 ${
                    file.type === 'folder'
                      ? 'text-blue-400 cursor-pointer font-semibold'
                      : 'text-gray-200'
                  }`}
                  onClick={() => {
                    if (file.type === 'folder') {
                      onNavigate(file.name);
                    }
                  }}
                  style={{ userSelect: 'text' }}
                >
                  {file.type === 'folder' ? (
                    <FaFolder className="text-yellow-400" />
                  ) : (
                    <FaFile className="text-gray-400" />
                  )}
                  <span>{file.name}</span>
                </td>

                {/* File Type Cell */}
                <td className="px-4 py-2 text-sm">
                  <span className="flex items-center gap-1">
                    {file.type === 'folder' ? (
                      <FaFolder className="text-yellow-400" />
                    ) : (
                      <FaFile className="text-gray-400" />
                    )}
                    {file.type === 'folder' ? 'Folder' : 'File'}
                  </span>
                </td>

                {/* Actions Cell */}
                <td className="px-4 py-2 text-right space-x-4">
                  {/* Open Button for files only */}
                  {file.type === 'file' && (
                    <button
                      className="text-green-400 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen(file); // ⬅ Call open handler
                      }}
                    >
                      Open
                    </button>
                  )}

                  <button
                    className="text-yellow-400 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRename(file);
                    }}
                  >
                    Rename
                  </button>

                  <button
                    className="text-red-400 hover:underline"
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
