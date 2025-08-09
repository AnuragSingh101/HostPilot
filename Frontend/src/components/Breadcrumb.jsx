// Breadcrumb.jsx
import React from 'react';

const Breadcrumb = ({ path = '', onNavigate = () => {} }) => {
  const parts = path.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <span
        className="cursor-pointer hover:underline"
        onClick={() => onNavigate('/')}
      >
        Root
      </span>
      {parts.map((part, idx) => {
        const subPath = '/' + parts.slice(0, idx + 1).join('/');
        return (
          <span key={idx}>
            {' / '}
            <span
              className="cursor-pointer hover:underline"
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
