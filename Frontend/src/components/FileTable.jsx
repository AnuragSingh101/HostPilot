import React from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';

const FileTable = ({
  files = [],
  selectedItems = [],
  onSelectionChange,
  onDelete,
  onRename,
  onNavigate,
  onOpen,
  onDownload
}) => {

  const toggleSelection = (name) => {
    if (selectedItems.includes(name)) {
      onSelectionChange(selectedItems.filter((n) => n !== name));
    } else {
      onSelectionChange([...selectedItems, name]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === files.length && files.length > 0) {
      onSelectionChange([]);
    } else {
      onSelectionChange(files.map(f => f.name));
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-900 rounded-lg shadow border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
            {/* ✅ Select All Checkbox */}
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedItems.length === files.length && files.length > 0}
                onChange={toggleSelectAll}
              />
            </th>

            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Type</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? files.map((file, idx) => (
            <tr key={idx} className="border-t border-gray-800 hover:bg-gray-800/70 transition">
              
              {/* ✅ Row Checkbox */}
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(file.name)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSelection(file.name);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>

              <td
                className={`px-4 py-2 flex items-center gap-2 ${
                  file.type === 'folder' ? 'text-blue-400 cursor-pointer font-semibold' : 'text-gray-200'
                }`}
                onClick={() => file.type === 'folder' && onNavigate(file.name)}
              >
                {file.type === 'folder'
                  ? <FaFolder className="text-yellow-400" />
                  : <FaFile className="text-gray-400" />}
                <span>{file.name}</span>
              </td>

              <td className="px-4 py-2 text-sm">
                {file.type === 'folder'
                  ? <FaFolder className="text-yellow-400" />
                  : <FaFile className="text-gray-400" />}
                {file.type === 'folder' ? ' Folder' : ' File'}
              </td>

              <td className="px-4 py-2 text-right space-x-4">
                {file.type === 'file' && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpen(file); }}
                      className="text-green-400 hover:underline"
                    >
                      Open
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDownload(file); }}
                      className="text-blue-400 hover:underline"
                    >
                      Download
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); onRename(file); }}
                  className="text-yellow-400 hover:underline"
                >
                  Rename
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(file); }}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center text-gray-500">No files found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
