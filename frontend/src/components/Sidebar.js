import React from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose, pushLayout, collapsed, collapsedWidth = 64, fullWidth = 256 }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  if (!auth) return null;
  const { user } = auth;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDashboardClick = () => {
    // Navigate to appropriate dashboard based on user role
    if (user.role === 'superadmin') {
      navigate('/dashboard/superadmin');
    } else if (user.role === 'supervisor') {
      navigate('/dashboard/supervisor');
    } else {
      navigate('/dashboard/officer');
    }
  };

  // Sidebar style
  const sidebarWidth = collapsed ? collapsedWidth : fullWidth;
  const sidebarClass = `
    min-h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 z-50
    fixed md:static top-0 left-0
    ${pushLayout ? '' : 'md:translate-x-0'}
    ${open ? 'translate-x-0' : '-translate-x-full'}
    md:block
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {open && !pushLayout && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={sidebarClass}
        style={{ width: sidebarWidth, minWidth: sidebarWidth, transition: 'all 0.3s' }}
      >
        {/* Only show profile and logout if not collapsed */}
        {!collapsed && (
          <>
            <div className="w-full flex flex-col items-center py-8 border-b border-gray-700">
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-4xl mb-2">
                <span role="img" aria-label="avatar">👤</span>
              </div>
              <div className="text-lg font-semibold text-white text-center">{user.nama_lengkap}</div>
              <div className="text-xs text-gray-300 mt-1">{user.role}</div>
              {user.pos && <div className="text-xs text-gray-400 mt-1">{user.pos}</div>}
            </div>
            
            {/* Navigation Menu */}
            <div className="flex-1 px-4 py-6">
              <div className="space-y-2">
                <button
                  onClick={handleDashboardClick}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar; 