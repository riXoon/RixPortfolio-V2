import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  FiFolder, 
  FiAward, 
  FiStar, 
  FiBriefcase, 
  FiMessageSquare, 
  FiLogOut 
} from 'react-icons/fi';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Projects', path: '/admin/projects', icon: FiFolder },
    { name: 'Certificates', path: '/admin/certificates', icon: FiAward },
    { name: 'Skills', path: '/admin/skills', icon: FiStar },
    { name: 'Experiences', path: '/admin/experiences', icon: FiBriefcase },
    { name: 'Messages', path: '/admin/messages', icon: FiMessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#0C0A12] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A1825] border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#7B4FD0] to-[#9B72EF] rounded-lg flex items-center justify-center">
              <FiBriefcase className="text-white text-sm" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Admin Portal</h2>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#7B4FD0]/20 to-[#9B72EF]/20 text-[#9B72EF] font-medium shadow-[0_0_10px_rgba(155,114,239,0.1)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon className="text-lg" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:bg-white/5 hover:text-red-400 rounded-lg transition-colors"
          >
            <FiLogOut className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-[#9B72EF] opacity-5 blur-[150px] pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
