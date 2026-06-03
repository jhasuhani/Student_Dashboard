'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-bg-secondary border border-white/10 text-slate-400 hover:text-white transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar nav */}
  <nav
  className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-bg-secondary/95 backdrop-blur-xl py-6 transition-all duration-300 flex-shrink-0 ${
    collapsed ? 'w-[72px]' : 'w-[240px]'
  } ${
    mobileOpen
      ? 'translate-x-0'
      : '-translate-x-full'
  } lg:sticky lg:top-0 lg:translate-x-0 lg:h-screen`}
>
        {/* Header */}
        <div className="flex items-center justify-between px-4 mb-8">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-sm font-bold text-white">StudyDash</span>
            </div>
          )}

          {/* Close on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* Collapse toggle on desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Nav items */}
        <ul className="flex flex-col gap-1 px-3 flex-1 list-none m-0 p-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="list-none">
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    setMobileOpen(false);
                  }}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeItem === item.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {activeItem === item.id && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl border border-accent-primary/20"
                      style={{
                        background: 'linear-gradient(to right, rgba(99,102,241,0.15), rgba(139,92,246,0.08))',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <Icon className="relative z-10 h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="relative z-10 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Profile */}
        <div className="px-3 mt-4">
          <div className={`flex items-center gap-3 rounded-xl bg-white/5 p-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Suhani</p>
                <p className="text-xs text-slate-400 truncate">Student</p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
