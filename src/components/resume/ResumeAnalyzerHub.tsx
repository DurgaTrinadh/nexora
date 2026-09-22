import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Building2, 
  ArrowRight, 
  Layers, 
  Zap, 
  RefreshCw,
  Award,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COMPANY_PROFILES } from '../../data/companyProfiles';
import { SAMPLE_STRONG_RESUME, SAMPLE_WEAK_RESUME } from '../../data/sampleResumes';
import { ResumeAnalyzerService } from '../../services/resumeAnalyzerService';
import { ResumeDiagnostic } from '../../types';

export const ResumeAnalyzerHub: React.FC = () => {
  const { setResumeAnalysis, userState, triggerCelebration } = useApp();

  const [resumeText, setResumeText] = useState(SAMPLE_STRONG_RESUME);
  const [selectedCompanyId, setSelectedCompanyId] = useState('google');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnostic, setDiagnostic] = useState<ResumeDiagnostic | null>(userState.lastResumeAnalysis);

  const selectedCompany = COMPANY_PROFILES.find(c => c.id === selectedCompanyId) || COMPANY_PROFILES[0];

  // Run analysis
  const handleAnalyze = () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = ResumeAnalyzerService.analyzeResume(resumeText, selectedCompanyId);
      setDiagnostic(result);
      setResumeAnalysis(result);
      setIsAnalyzing(false);

      if (result.atsScore >= 75) {
        triggerCelebration();
      }
    }, 700);
  };

  // Load sample resumes
  const handleLoadSample = (type: 'strong' | 'weak') => {
    if (type === 'strong') {
      setResumeText(SAMPLE_STRONG_RESUME);
    } else {
      setResumeText(SAMPLE_WEAK_RESUME);
    }
  };

  // File upload reader (txt or pdf extraction)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setResumeText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-amber-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Company-Specific ATS & Gap Analyzer</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Resume Diagnostic & Positives/Negatives Engine
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Find out exactly what Google, Amazon, Microsoft, or TCS ATS scanners look for. Pinpoint missing skills, weak bullet points, and get Google XYZ formula rewrites.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => handleLoadSample('strong')}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Load High-Impact SDE Resume
            </button>
            <button
              onClick={() => handleLoadSample('weak')}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Load Weak Fresher Resume
            </button>
          </div>
        </div>
      </div>

      {/* Input Configuration & Resume Text Box */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Company Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyber-cyan" /> 1. Select Target Company to Evaluate Against
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {COMPANY_PROFILES.map(comp => (
              <button
                key={comp.id}
                onClick={() => setSelectedCompanyId(comp.id)}
                className={`p-2.5 rounded-xl text-xs font-bold text-center border transition flex flex-col items-center justify-center gap-1 ${
                  selectedCompanyId === comp.id
                    ? 'bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{comp.name}</span>
                <span className="text-[9px] font-normal opacity-70 truncate max-w-[80px]">{comp.tier}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Company Focus Brief */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-brand-400" />
            <strong className="text-white">{selectedCompany.name} Recruitment Criteria:</strong>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {selectedCompany.recommendedResumeFocus}
          </p>
        </div>

        {/* Resume Text Input Area & File Upload */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" /> 2. Paste or Upload Resume Content
            </label>
            
            <label className="cursor-pointer text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 transition">
              <Upload className="w-3.5 h-3.5" /> Upload File (.txt, .md)
              <input type="file" accept=".txt,.md,.text" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={10}
            placeholder="Paste your plain text resume content here..."
            className="w-full glass-input p-4 rounded-2xl text-xs font-mono leading-relaxed resize-none selection:bg-brand-500/30"
          />
        </div>

        {/* Run Diagnostic Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeText.trim()}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyber-cyan text-white text-xs font-extrabold shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Running ATS Diagnostics for {selectedCompany.name}...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Analyze Resume for {selectedCompany.name}</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* DIAGNOSTIC RESULTS DISPLAY */}
      {diagnostic && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Header ATS Score Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/30 space-y-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              <div className="space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
                  <FileCheck className="w-3.5 h-3.5 text-cyber-cyan" />
                  <span>ATS Diagnostic Report Generated for {diagnostic.targetCompany}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Candidate: {diagnostic.candidateName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  {diagnostic.readinessVerdict}
                </p>
              </div>

              {/* Big ATS Circular Meter */}
              <div className="flex flex-col items-center p-5 rounded-2xl glass-panel-glow border border-brand-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  ATS Match Score
                </span>
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle cx="56" cy="56" r="44" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                    <circle
                      cx="56"
                      cy="56"
                      r="44"
                      stroke={diagnostic.atsScore >= 75 ? '#10B981' : diagnostic.atsScore >= 55 ? '#F59E0B' : '#F43F5E'}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="276"
                      strokeDashoffset={276 - (276 * diagnostic.atsScore) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-black text-white">{diagnostic.atsScore}%</span>
                    <span className="text-[9px] uppercase font-bold block text-slate-400">ATS Rating</span>
                  </div>
                </div>
              </div>

            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Quantified Impact & Metrics</span>
                <div className="text-xl font-bold text-cyber-cyan mt-1">{diagnostic.metricsScore}%</div>
                <p className="text-[10px] text-slate-400 mt-1">Numerical proof, % speedups & scale</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Action Verbs & Agency</span>
                <div className="text-xl font-bold text-brand-300 mt-1">{diagnostic.actionVerbsScore}%</div>
                <p className="text-[10px] text-slate-400 mt-1">Active verbs vs passive phrasing</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">{diagnostic.targetCompany} Keyword Match</span>
                <div className="text-xl font-bold text-emerald-400 mt-1">{diagnostic.keywordMatchPercentage}%</div>
                <p className="text-[10px] text-slate-400 mt-1">Must-have technology alignment</p>
              </div>
            </div>
          </div>

          {/* TWO COLUMN DIAGNOSTIC: POSITIVES & NEGATIVES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* POSITIVES (STRENGTHS) */}
            <div className="glass-panel p-6 rounded-3xl border-l-4 border-emerald-500 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Positives & Competitive Strengths</h3>
              </div>
              <p className="text-xs text-slate-400">
                Elements that strongly appeal to technical hiring managers and automated parsers:
              </p>

              <div className="space-y-3 pt-1">
                {diagnostic.strengths.map((str, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {str.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed pl-3">
                      {str.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* NEGATIVES (RED FLAGS & GAPS) */}
            <div className="glass-panel p-6 rounded-3xl border-l-4 border-rose-500 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Negatives, Red Flags & Critical Gaps</h3>
              </div>
              <p className="text-xs text-slate-400">
                Pitfalls that increase rejection likelihood at {diagnostic.targetCompany}:
              </p>

              <div className="space-y-3 pt-1">
                {diagnostic.criticalNegatives.map((neg, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                    <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {neg.issue}
                    </h4>
                    <p className="text-[11px] text-slate-300 pl-3">
                      <strong className="text-slate-200">Impact: </strong>{neg.impact}
                    </p>
                    <p className="text-[11px] text-amber-300 pl-3 font-medium">
                      💡 <strong className="text-amber-200">Recommended Fix: </strong>{neg.fixSuggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Company Skills Alignment: Matched vs Missing */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyber-cyan" /> {diagnostic.targetCompany} Core Skillset Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Matched */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Found In Your Resume ({diagnostic.matchedKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {diagnostic.matchedKeywords.length > 0 ? (
                    diagnostic.matchedKeywords.map(skill => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                        ✓ {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No direct matches identified.</span>
                  )}
                </div>
              </div>

              {/* Missing */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Missing Skills for {diagnostic.targetCompany} ({diagnostic.missingKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {diagnostic.missingKeywords.length > 0 ? (
                    diagnostic.missingKeywords.map(skill => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-medium">
                        ✕ {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-emerald-400">All primary skills present!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Google XYZ Formula Concrete Bullet Rewrites */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-400" /> Google XYZ Formula Bullet Rewrites
                </h3>
                <p className="text-xs text-slate-400">
                  Formula: "Accomplished [X], as measured by [Y], by doing [Z]"
                </p>
              </div>
              <span className="text-[11px] font-bold text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
                Senior Recruiter Approved
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {diagnostic.bulletRewrites.map((br, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold uppercase text-[10px] w-14 flex-shrink-0">Before:</span>
                    <span className="text-slate-400 line-through">{br.original}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold uppercase text-[10px] w-14 flex-shrink-0">After:</span>
                    <span className="text-white font-medium">{br.improved}</span>
                  </div>
                  <div className="text-[10px] text-brand-400 italic pl-16 pt-0.5">
                    Structure: {br.formulaUsed}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
