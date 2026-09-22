import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { MockInterviewHub } from './components/interviews/MockInterviewHub';
import { AptitudeHub } from './components/aptitude/AptitudeHub';
import { DsaHub } from './components/dsa/DsaHub';
import { JobTrackerHub } from './components/jobs/JobTrackerHub';
import { ResumeAnalyzerHub } from './components/resume/ResumeAnalyzerHub';
import { ChatbotHub } from './components/chatbot/ChatbotHub';
import { FloatingChatWidget } from './components/chatbot/FloatingChatWidget';
import { Sparkles, Trophy, Heart, Code2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem-6rem)]">
      {activeTab === 'dashboard' && <DashboardOverview />}
      {activeTab === 'interviews' && <MockInterviewHub />}
      {activeTab === 'aptitude' && <AptitudeHub />}
      {activeTab === 'dsa' && <DsaHub />}
      {activeTab === 'jobs' && <JobTrackerHub />}
      {activeTab === 'resume' && <ResumeAnalyzerHub />}
      {activeTab === 'assistant' && <ChatbotHub />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#080C15] text-slate-100 flex flex-col selection:bg-brand-500/30 selection:text-brand-300">
        
        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Dynamic Tab Body */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Global Floating AI Assistant Widget */}
        <FloatingChatWidget />

        {/* Platform Footer */}
        <footer className="border-t border-slate-800/80 bg-[#070A12] py-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-cyber-cyan flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-white tracking-tight">NEXORA</span>
              <span className="text-slate-500">•</span>
              <span>Next-Gen AI Placement Preparation Platform</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                <Trophy className="w-3 h-3 text-amber-400" /> Built for iQOO Hackathon
              </span>
              <span className="text-slate-500">100% Client-Side Persistent Architecture</span>
            </div>
          </div>
        </footer>

      </div>
    </AppProvider>
  );
};

export default App;
