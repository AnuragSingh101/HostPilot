// Breadcrumb.jsx
import React from 'react';
import { FaFolderOpen } from 'react-icons/fa';

const Breadcrumb = ({ path = '', onNavigate = () => {} }) => {
  const parts = path.split('/').filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-gray-300 mb-4 bg-gray-800 px-3 py-2 rounded-lg shadow border border-gray-800">
      <FaFolderOpen className="text-yellow-400 mr-2" />
      <span
        className="cursor-pointer hover:text-blue-400 transition"
        onClick={() => onNavigate('/')}
      >
        Root
      </span>
      {parts.map((part, idx) => {
        const subPath = '/' + parts.slice(0, idx + 1).join('/');
        return (
          <span key={idx} className="flex items-center">
            <span className="mx-2 text-gray-600 font-bold">/</span>
            <span
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => onNavigate(subPath)}
            >
              {part}
            </span>
          </span>
        );
      })}
    </nav>
  );
};
export default Breadcrumb;
