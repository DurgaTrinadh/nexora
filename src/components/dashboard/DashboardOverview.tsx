import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Target, 
  ArrowRight, 
  Mic2, 
  CheckSquare, 
  Code2, 
  FileText, 
  Trophy, 
  TrendingUp, 
  Briefcase, 
  Zap, 
  CheckCircle2, 
  Clock,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CURATED_OPENINGS } from '../../data/sampleJobs';

export const DashboardOverview: React.FC = () => {
  const { userState, readinessScore, setActiveTab, addJobApplication } = useApp();

  // Compute stats
  const solvedCount = userState.solvedProblemIds.length;
  const interviewCount = userState.interviewHistory.length;
  const aptCount = userState.aptitudeResults.length;
  const avgAptitude = aptCount > 0
    ? Math.round(userState.aptitudeResults.reduce((acc, r) => acc + r.scorePercentage, 0) / aptCount)
    : 80;
  const avgInterview = interviewCount > 0
    ? Math.round(userState.interviewHistory.reduce((acc, i) => acc + i.overallScore, 0) / interviewCount)
    : 84;
  const activeJobsCount = userState.jobApplications.filter(j => j.stage !== 'rejected').length;

  const handleAddCuratedJob = (job: typeof CURATED_OPENINGS[0]) => {
    addJobApplication({
      company: job.company,
      role: job.role,
      packageCtc: job.packageCtc,
      location: job.location,
      stage: 'wishlist',
      deadline: job.deadline,
      notes: `Discovered from curated openings. Eligible for ${job.eligibility}.`,
      tags: job.tags
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome & Readiness Showcase */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-brand-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-brand-600/20 to-cyber-cyan/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 rounded-full bg-cyber-emerald/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Placement Season 2026 Ready</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Welcome back, <span className="gradient-text-brand">{userState.name}</span> 👋
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Targeting <strong className="text-white">{userState.targetRole}</strong> at{' '}
              <strong className="text-brand-300">{userState.dreamCompany}</strong>. Your preparation metrics show consistent momentum across aptitude, algorithms, and behavioral rounds.
            </p>

            {/* Target Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Target className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Target: {userState.dreamCompany}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{userState.streakDays} Day Continuous Streak</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Top 8% Candidate Percentile</span>
              </div>
            </div>
          </div>

          {/* Animated Placement Readiness Gauge Card */}
          <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-center p-6 rounded-2xl glass-panel-glow border border-brand-500/30">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
              Placement Readiness Index
            </span>
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="url(#readinessGradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="364.4"
                  strokeDashoffset={364.4 - (364.4 * readinessScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black tracking-tight text-white">
                  {readinessScore}%
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  {readinessScore >= 80 ? 'Tier-1 Ready' : readinessScore >= 60 ? 'Competitive' : 'Developing'}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 text-center max-w-[180px]">
              Calculated across DSA, Aptitude tests, Mock AI interviews & ATS resume score.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Primary Launchpad Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-400" /> Core Prep Modules
          </h2>
          <span className="text-xs text-slate-400">Select an engine to start training</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Mock Interviews */}
          <div 
            onClick={() => setActiveTab('interviews')}
            className="glass-panel p-5 rounded-2xl hover:border-brand-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
                <Mic2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition">
                AI Mock Interviews
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live voice speech recognition, speaking AI robot interviewer & real-time STAR scorecard.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-brand-400 font-semibold">
              <span>{interviewCount} Sessions Completed</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Aptitude Tests */}
          <div 
            onClick={() => setActiveTab('aptitude')}
            className="glass-panel p-5 rounded-2xl hover:border-cyber-cyan/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyber-cyan flex items-center justify-center group-hover:scale-110 transition">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyber-cyan transition">
                Aptitude & Core CS
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                TCS NQT & AMCAT pattern exams with live timers, question palette & step-by-step solutions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyber-cyan font-semibold">
              <span>{avgAptitude}% Avg Accuracy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: DSA Arena */}
          <div 
            onClick={() => setActiveTab('dsa')}
            className="glass-panel p-5 rounded-2xl hover:border-cyber-emerald/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-cyber-emerald flex items-center justify-center group-hover:scale-110 transition">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyber-emerald transition">
                DSA Code Arena
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Curated roadmaps with interactive code editor, test case runner & company tagged questions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyber-emerald font-semibold">
              <span>{solvedCount} Problems Solved</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: Resume Analyzer */}
          <div 
            onClick={() => setActiveTab('resume')}
            className="glass-panel p-5 rounded-2xl hover:border-amber-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
                Resume Analyzer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ATS scoring, company-specific keyword diagnostics & Google XYZ bullet rewrites.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>{userState.lastResumeAnalysis ? `${userState.lastResumeAnalysis.atsScore}% ATS Score` : 'Diagnose Now'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Section: Category Mastery & Active Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Category Mastery Breakdown */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-brand-400" /> Placement Competency Breakdown
              </h3>
              <p className="text-xs text-slate-400">Target metrics for {userState.dreamCompany} benchmark</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-brand-500/10 text-brand-300 border border-brand-500/20">
              Season Target: 90%+
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Competency 1: DSA */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">Data Structures & Algorithmic Rigor</span>
                <span className="text-cyber-cyan">{Math.round((solvedCount / 6) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyber-cyan to-brand-500 transition-all duration-700" 
                  style={{ width: `${Math.min(100, Math.round((solvedCount / 6) * 100))}%` }} 
                />
              </div>
            </div>

            {/* Competency 2: Aptitude */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">Quantitative & Logical Aptitude</span>
                <span className="text-cyber-emerald">{avgAptitude}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyber-cyan transition-all duration-700" 
                  style={{ width: `${avgAptitude}%` }} 
                />
              </div>
            </div>

            {/* Competency 3: Core CS */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">Core CS (OS, DBMS, Networks, OOP)</span>
                <span className="text-purple-400">78%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700" 
                  style={{ width: '78%' }} 
                />
              </div>
            </div>

            {/* Competency 4: HR & Behavioral */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">HR & Behavioral (STAR Communication)</span>
                <span className="text-brand-300">{avgInterview}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-pink-500 transition-all duration-700" 
                  style={{ width: `${avgInterview}%` }} 
                />
              </div>
            </div>

            {/* Competency 5: Resume Match */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-200">Resume Alignment & ATS Compatibility</span>
                <span className="text-amber-400">
                  {userState.lastResumeAnalysis ? `${userState.lastResumeAnalysis.atsScore}%` : '74%'}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-brand-400 transition-all duration-700" 
                  style={{ width: userState.lastResumeAnalysis ? `${userState.lastResumeAnalysis.atsScore}%` : '74%' }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Job Applications Snapshot */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyber-cyan" /> Job Applications
              </h3>
              <button 
                onClick={() => setActiveTab('jobs')}
                className="text-xs text-brand-400 hover:text-brand-300 font-semibold transition"
              >
                View Board ({userState.jobApplications.length})
              </button>
            </div>
            <p className="text-xs text-slate-400">Your active recruitment stages</p>

            {/* Recent jobs list */}
            <div className="space-y-2.5 mt-4">
              {userState.jobApplications.slice(0, 3).map(job => (
                <div 
                  key={job.id}
                  onClick={() => setActiveTab('jobs')}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition cursor-pointer flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-white truncate">{job.company}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{job.role}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    job.stage === 'offer' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    job.stage === 'interviewing' ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' :
                    job.stage === 'online_assessment' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {job.stage.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('jobs')}
            className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-bold text-white border border-slate-700/60 transition flex items-center justify-center gap-2"
          >
            <span>Manage All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Curated 2026/2027 Placement & Hackathon Hiring Ticker */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-400" /> Curated Off-Campus Drives (2026 - 2027)
            </h3>
            <p className="text-xs text-slate-400">Hand-picked high-CTC tech openings matching your target role</p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Opportunities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {CURATED_OPENINGS.map(item => {
            const alreadyAdded = userState.jobApplications.some(j => j.company.toLowerCase() === item.company.toLowerCase());
            return (
              <div 
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-brand-500/30 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{item.company}</span>
                    <span className="text-[10px] font-semibold text-brand-300 bg-brand-500/10 px-1.5 py-0.5 rounded">
                      {item.packageCtc}
                    </span>
                  </div>
                  <h4 className="text-xs text-slate-300 font-medium line-clamp-1">{item.role}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-500" /> Deadline: {item.deadline}
                  </p>
                </div>

                <button
                  disabled={alreadyAdded}
                  onClick={() => handleAddCuratedJob(item)}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                    alreadyAdded
                      ? 'bg-slate-800/50 text-slate-500 cursor-default'
                      : 'bg-brand-600/20 text-brand-300 hover:bg-brand-600 hover:text-white border border-brand-500/30'
                  }`}
                >
                  {alreadyAdded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> In Tracker
                    </>
                  ) : (
                    '+ Add to Tracker'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
