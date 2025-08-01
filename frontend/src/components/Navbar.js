import React from 'react';

const Navbar = ({ onHamburgerClick, ...props }) => {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 shadow-sm px-4 py-2 flex items-center m-0" {...props}>
      {onHamburgerClick && (
        <button
          className="mr-4 flex items-center justify-center text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={onHamburgerClick}
          aria-label="Toggle sidebar"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
      <span className="font-bold text-lg">Log Book</span>
    </nav>
  );
};

export default Navbar; 