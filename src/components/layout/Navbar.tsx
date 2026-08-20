import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Bell, Search, User as UserIcon, LogOut, Menu,
  GraduationCap, Briefcase
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { currentUser, currentRole, profile, notifications, markNotificationRead, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#f8f6f0]/90 border-b border-[#e5e0d5] backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Section: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-[#f0ede6] transition lg:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#0a0a0a] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-[#0a0a0a] tracking-tight flex items-center gap-1">
                Alumni<span className="text-[#ff5500]">Connect</span>
                <span className="text-[10px] font-medium bg-[#fce8d5] text-zinc-950 border border-[#f8cbb0] px-2 py-0.5 rounded-full ml-1">CSE</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alumni by name, company, skill, or batch..."
              className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#ff5500] transition shadow-2xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  navigate(`/directory?search=${encodeURIComponent(target.value)}`);
                }
              }}
            />
          </div>
        </div>

        {/* Right Section: Notifications & User Profile */}
        <div className="flex items-center gap-3">
          
          {currentUser ? (
            <>
              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl text-zinc-800 hover:bg-[#f0ede6] transition relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#ff5500] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#e5e0d5] rounded-2xl shadow-xl z-50 p-4 divide-y divide-zinc-100">
                    <div className="flex items-center justify-between pb-3">
                      <h4 className="font-semibold text-sm text-zinc-950 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#ff5500]" /> Notifications
                      </h4>
                      <span className="text-xs bg-[#fce8d5] text-zinc-900 border border-[#f8cbb0] px-2 py-0.5 rounded-full font-medium">
                        {unreadCount} Unread
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto py-2 space-y-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-zinc-500 text-center py-4">No notifications right now.</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3 rounded-xl cursor-pointer transition text-xs ${
                              n.is_read ? 'bg-[#f8f6f0] text-zinc-500' : 'bg-[#fff5f0] border border-[#f8cbb0] text-zinc-900'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-bold text-[#ff5500]">{n.title}</span>
                              {!n.is_read && <span className="w-2 h-2 rounded-full bg-[#ff5500] mt-1" />}
                            </div>
                            <p className="mt-1 text-zinc-700 line-clamp-2">{n.message}</p>
                            <span className="text-[10px] text-zinc-400 mt-1.5 block">
                              {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#f0ede6] transition border border-transparent hover:border-[#e5e0d5]"
                >
                  <img
                    src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt="Profile Avatar"
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#ff5500]/30"
                  />
                  <div className="hidden lg:block text-left text-xs">
                    <div className="font-bold text-[#0a0a0a] truncate max-w-[120px]">
                      {profile?.full_name || 'User Account'}
                    </div>
                    <div className="text-[10px] text-[#ff5500] capitalize font-medium">
                      {currentRole}
                    </div>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e5e0d5] rounded-2xl shadow-xl z-50 p-2 text-xs">
                    <div className="p-2.5 border-b border-zinc-100">
                      <p className="font-bold text-zinc-950">{profile?.full_name || 'User Profile'}</p>
                      <p className="text-zinc-500 text-[11px] truncate">{currentUser?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#fce8d5] text-zinc-900 border border-[#f8cbb0] text-[10px] capitalize font-medium">
                        Role: {currentRole}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-zinc-700 hover:text-zinc-950 hover:bg-[#f8f6f0] rounded-lg transition"
                      >
                        <UserIcon className="w-4 h-4 text-[#ff5500]" />
                        My Profile & Resume
                      </Link>

                      <Link
                        to={`/dashboard/${currentRole}`}
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-zinc-700 hover:text-zinc-950 hover:bg-[#f8f6f0] rounded-lg transition"
                      >
                        <Briefcase className="w-4 h-4 text-[#ff5500]" />
                        {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Dashboard
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-zinc-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition text-left font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login?mode=login"
                className="text-zinc-700 hover:text-zinc-950 font-semibold text-sm px-3 py-2 transition"
              >
                Log in
              </Link>
              <Link
                to="/login?mode=register"
                className="px-6 py-2.5 rounded-full bg-[#1b64f2] hover:bg-[#1552cc] text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-105"
              >
                Join Now
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
