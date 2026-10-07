import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/BrandLogo';
import { api } from '../services/api';
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  Image as ImageIcon,
  Star,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  User,
  Shield
} from 'lucide-react';

export const AdminLayout = ({ activeTab, setActiveTab, onExitAdmin, children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const res = await api.adminGetStats();
        if (res.success && res.data?.enquiries?.new) {
          setNewEnquiryCount(res.data.enquiries.new);
        }
      } catch (e) {
        // silent catch
      }
    };
    fetchBadge();
  }, [activeTab]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'enquiries', label: 'Enquiries', icon: Mail, badge: newEnquiryCount },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050814] flex text-slate-100">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#070B1F] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <BrandLogo size="small" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
              Management Portal
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,210,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>View Public Website</span>
            </div>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-[#070B1F]/90 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-cyan-400 uppercase tracking-wider">Admin</span>
              <span>/</span>
              <span className="text-white capitalize">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {newEnquiryCount > 0 && (
              <button
                onClick={() => setActiveTab('enquiries')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-500/40 text-amber-300 animate-pulse"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>{newEnquiryCount} New Enquiry</span>
              </button>
            )}

            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
                BD
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-semibold text-white">{user?.name || 'Administrator'}</div>
                <div className="text-[10px] text-cyan-400">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
