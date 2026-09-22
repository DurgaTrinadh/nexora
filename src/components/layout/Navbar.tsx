import React, { useState } from 'react';
import { 
  Flame, 
  Settings, 
  Menu, 
  X, 
  LayoutDashboard, 
  Mic2, 
  CheckSquare, 
  Code2, 
  Briefcase, 
  FileText, 
  BotMessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { SettingsModal } from './SettingsModal';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, userState, readinessScore } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'interviews', label: 'Mock Interviews', icon: <Mic2 className="w-4 h-4" /> },
    { id: 'aptitude', label: 'Aptitude Tests', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'dsa', label: 'DSA Arena', icon: <Code2 className="w-4 h-4" /> },
    { id: 'jobs', label: 'Job Tracker', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume Analyzer', icon: <FileText className="w-4 h-4" /> },
    { id: 'assistant', label: 'Nexora AI', icon: <BotMessageSquare className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090D16]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyber-cyan p-[1.5px] shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all duration-300">
                  <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-brand-400 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-cyber-emerald rounded-full ring-2 ring-[#090D16]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
                  NEXORA
                </span>
                <span className="text-[10px] font-medium tracking-wider text-brand-400/90 uppercase -mt-0.5">
                  Placement Suite
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
              {navItems.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Meta Badges & User Info */}
            <div className="flex items-center gap-3">
              {/* Streak Badge */}
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold shadow-sm"
                title="Your daily placement prep streak"
              >
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                <span>{userState.streakDays}d Streak</span>
              </div>

              {/* Placement Readiness Badge */}
              <div 
                onClick={() => setActiveTab('dashboard')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-medium cursor-pointer hover:border-brand-500/40 transition group"
                title="Overall placement readiness score based on tests, interviews & resume"
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <svg className="w-4 h-4 transform -rotate-90">
                    <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="#10B981"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="38"
                      strokeDashoffset={38 - (38 * readinessScore) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-slate-300 group-hover:text-white transition">
                  <strong className="text-emerald-400">{readinessScore}%</strong> Ready
                </span>
              </div>

              {/* Settings Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition"
                title="Configure profile & settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-b border-slate-800 bg-[#090D16]/95 backdrop-blur-2xl px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
