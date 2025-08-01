import React, { useState, useEffect } from 'react';
import Router from './Router';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useAuth } from './auth/useAuth';
import { useLocation } from 'react-router-dom';

const SIDEBAR_WIDTH = 256; // 64 * 4 (w-64)
const SIDEBAR_COLLAPSED_WIDTH = 16; // w-4

const App = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const showSidebar = auth && location.pathname !== '/login';
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // for desktop
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const isLogin = location.pathname === '/login';

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Push layout only on desktop and not collapsed
  const pushSidebar = showSidebar && !sidebarCollapsed && !isLogin && isDesktop;
  const sidebarWidth = isDesktop ? (sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH) : 0;

  // Hamburger click: toggle sidebar (desktop: collapse, mobile: overlay)
  const handleHamburger = () => {
    if (isDesktop) {
      setSidebarCollapsed(c => !c);
    } else {
      setSidebarOpen(true);
    }
  };

  return (
    <div className={`${isLogin ? 'h-screen' : 'min-h-screen'} bg-gray-50`}>
      <div className={`flex${isLogin ? ' h-screen' : ' min-h-screen'}`}>
        {showSidebar && (
          <Sidebar
            open={isDesktop ? !sidebarCollapsed : sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            pushLayout={pushSidebar}
            collapsed={isDesktop ? sidebarCollapsed : false}
            onHamburgerClick={handleHamburger}
            collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
            fullWidth={SIDEBAR_WIDTH}
          />
        )}
        <div className="flex-1 min-w-0 flex flex-col">
          {!isLogin && (
            <Navbar onHamburgerClick={handleHamburger} />
          )}
          <div
            className="flex-1"
            style={{
              transition: 'transform 0.3s',
              transform: pushSidebar ? 'scale(0.95)' : 'scale(1)',
              minHeight: '100vh',
            }}
          >
            <div className="w-full">
              <Router />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;