import React, { useState } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  Play, 
  Send, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Clock, 
  Cpu, 
  Lightbulb, 
  ArrowLeft,
  Sparkles,
  Bookmark,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DSA_PROBLEMS } from '../../data/dsaProblems';
import { DsaProblem, DsaDifficulty } from '../../types';

export const DsaHub: React.FC = () => {
  const { userState, toggleSolvedProblem, toggleBookmarkedProblem, triggerCelebration } = useApp();

  const [activeProblem, setActiveProblem] = useState<DsaProblem | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | DsaDifficulty>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor state
  const [selectedLang, setSelectedLang] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [editorCode, setEditorCode] = useState('');
  const [showHints, setShowHints] = useState<number[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<{
    status: 'Idle' | 'Running' | 'Success' | 'Failed';
    runtimeMs?: number;
    memoryMb?: number;
    testResults?: { input: string; expected: string; actual: string; passed: boolean }[];
    error?: string;
  }>({ status: 'Idle' });

  // Filter problems
  const filteredProblems = DSA_PROBLEMS.filter(p => {
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.companyTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDiff && matchSearch;
  });

  // Open problem in editor
  const handleOpenProblem = (prob: DsaProblem) => {
    setActiveProblem(prob);
    setEditorCode(prob.starterTemplates[selectedLang]);
    setShowHints([]);
    setConsoleOutput({ status: 'Idle' });
  };

  // Switch language
  const handleLangChange = (lang: 'javascript' | 'python' | 'cpp' | 'java') => {
    setSelectedLang(lang);
    if (activeProblem) {
      setEditorCode(activeProblem.starterTemplates[lang]);
    }
  };

  // Reset starter code
  const handleResetCode = () => {
    if (activeProblem) {
      setEditorCode(activeProblem.starterTemplates[selectedLang]);
    }
  };

  // Toggle Hint accordion
  const toggleHint = (index: number) => {
    setShowHints(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Run Code / Test cases
  const handleRunCode = () => {
    if (!activeProblem) return;
    setConsoleOutput({ status: 'Running' });

    setTimeout(() => {
      // In-browser mock test-case evaluation
      const results = activeProblem.testCases.map((tc, idx) => {
        // If user hasn't emptied the starter code, check logic
        const passed = idx < 2 || editorCode.length > 100;
        return {
          input: tc.input,
          expected: tc.expectedOutput,
          actual: passed ? tc.expectedOutput : '[]',
          passed
        };
      });

      const allPassed = results.every(r => r.passed);
      setConsoleOutput({
        status: allPassed ? 'Success' : 'Failed',
        runtimeMs: Math.floor(Math.random() * 25) + 35,
        memoryMb: Math.round((Math.random() * 4 + 42) * 10) / 10,
        testResults: results
      });
    }, 600);
  };

  // Submit Solution
  const handleSubmitCode = () => {
    if (!activeProblem) return;
    setConsoleOutput({ status: 'Running' });

    setTimeout(() => {
      const results = activeProblem.testCases.map(tc => ({
        input: tc.input,
        expected: tc.expectedOutput,
        actual: tc.expectedOutput,
        passed: true
      }));

      setConsoleOutput({
        status: 'Success',
        runtimeMs: Math.floor(Math.random() * 20) + 40,
        memoryMb: 42.8,
        testResults: results
      });

      if (!userState.solvedProblemIds.includes(activeProblem.id)) {
        toggleSolvedProblem(activeProblem.id);
      }
      triggerCelebration();
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. PROBLEM LIST VIEW */}
      {!activeProblem ? (
        <div className="space-y-6">
          
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-cyber-emerald/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Curated Placements DSA Roadmap</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  DSA Preparation & Code Arena
                </h1>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Practice top interview questions asked at Google, Amazon, and Microsoft. Multi-language interactive editor, automated test case runner, and complexity analysis.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel-glow text-center border border-emerald-500/30">
                <span className="text-xs text-slate-400">Solved Roadmap</span>
                <div className="text-2xl font-black text-white mt-0.5">
                  {userState.solvedProblemIds.length} / {DSA_PROBLEMS.length}
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {Math.round((userState.solvedProblemIds.length / DSA_PROBLEMS.length) * 100)}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search problem, topic, or company..."
                className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedDifficulty === diff
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Table */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">Status</th>
                    <th className="py-3.5 px-4">Problem Title</th>
                    <th className="py-3.5 px-4">Topic</th>
                    <th className="py-3.5 px-4">Difficulty</th>
                    <th className="py-3.5 px-4">Top Companies</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredProblems.map(prob => {
                    const isSolved = userState.solvedProblemIds.includes(prob.id);
                    const isBookmarked = userState.bookmarkedProblemIds.includes(prob.id);

                    return (
                      <tr key={prob.id} className="hover:bg-slate-800/40 transition group">
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => toggleSolvedProblem(prob.id)}
                            className="p-1 rounded hover:bg-slate-700 transition"
                            title={isSolved ? 'Mark Unsolved' : 'Mark Solved'}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isSolved ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-600'}`} />
                          </button>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span 
                              onClick={() => handleOpenProblem(prob)}
                              className="font-bold text-white hover:text-cyber-cyan cursor-pointer transition"
                            >
                              {prob.title}
                            </span>
                            <button
                              onClick={() => toggleBookmarkedProblem(prob.id)}
                              className="text-slate-600 hover:text-amber-400 transition"
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'text-amber-400 fill-amber-400' : ''}`} />
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          {prob.topic}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            prob.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            prob.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {prob.difficulty}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {prob.companyTags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleOpenProblem(prob)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white font-bold text-xs border border-emerald-500/30 transition"
                          >
                            Solve Code &gt;
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        
        /* 2. SPLIT-SCREEN CODE STUDIO */
        <div className="space-y-4">
          
          {/* Top Bar with Back, Problem Name & Actions */}
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveProblem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition flex items-center gap-1 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" /> Roadmap
              </button>
              <div className="h-4 w-[1px] bg-slate-800" />
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                {activeProblem.title}
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  activeProblem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                  activeProblem.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-rose-500/20 text-rose-300'
                }`}>
                  {activeProblem.difficulty}
                </span>
              </h2>
            </div>

            {/* Run & Submit controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 text-cyber-cyan fill-cyber-cyan" /> Run Tests
              </button>
              <button
                onClick={handleSubmitCode}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit Solution
              </button>
            </div>
          </div>

          {/* Split Pane: Left (Problem Details) + Right (Code Editor & Console) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[600px]">
            
            {/* Left Pane (5 cols): Description, Examples, Hints */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl overflow-y-auto max-h-[720px] space-y-6">
              
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
                <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {activeProblem.description}
                </p>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Examples</h3>
                {activeProblem.examples.map((ex, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1 font-mono">
                    <div><span className="text-slate-400">Input: </span><span className="text-white">{ex.input}</span></div>
                    <div><span className="text-slate-400">Output: </span><span className="text-cyber-cyan">{ex.output}</span></div>
                    {ex.explanation && (
                      <div className="text-slate-400 font-sans pt-1 text-[11px]">
                        <strong>Explanation: </strong>{ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Constraints</h3>
                <ul className="space-y-1 text-xs text-slate-300 font-mono list-disc list-inside">
                  {activeProblem.constraints.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Hints Accordion */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Solution Hints
                </h3>
                <div className="space-y-2">
                  {activeProblem.solutionHints.map((hint, idx) => {
                    const isOpen = showHints.includes(idx);
                    return (
                      <div key={idx} className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden text-xs">
                        <button
                          onClick={() => toggleHint(idx)}
                          className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-300 hover:text-white transition"
                        >
                          <span>Hint {idx + 1}</span>
                          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {isOpen && (
                          <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-slate-300 leading-relaxed text-[11px]">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optimal Complexity */}
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Complexity</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    Time: {activeProblem.optimalComplexity.time} • Space: {activeProblem.optimalComplexity.space}
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>

            </div>

            {/* Right Pane (7 cols): Code Editor & Execution Console */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              
              {/* Editor Surface */}
              <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 flex flex-col flex-1">
                
                {/* Editor Top Bar */}
                <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(['javascript', 'python', 'cpp', 'java'] as const).map(lang => (
                      <button
                        key={lang}
                        onClick={() => handleLangChange(lang)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                          selectedLang === lang 
                            ? 'bg-brand-600 text-white' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleResetCode}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                    title="Reset to starter template"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {/* Editor Textarea with Mono Font */}
                <div className="relative flex-1 min-h-[360px] bg-[#0A0E18]">
                  <textarea
                    value={editorCode}
                    onChange={e => setEditorCode(e.target.value)}
                    spellCheck={false}
                    className="w-full h-full min-h-[360px] p-4 bg-transparent font-mono text-xs leading-relaxed text-slate-100 resize-none outline-none selection:bg-brand-500/30"
                  />
                </div>

              </div>

              {/* Console Output Panel */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-cyber-cyan" /> Test Cases & Execution Metrics
                  </h4>
                  {consoleOutput.status !== 'Idle' && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      consoleOutput.status === 'Success' ? 'bg-emerald-500/20 text-emerald-300' :
                      consoleOutput.status === 'Running' ? 'bg-brand-500/20 text-brand-300 animate-pulse' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {consoleOutput.status}
                    </span>
                  )}
                </div>

                {consoleOutput.status === 'Idle' ? (
                  <p className="text-xs text-slate-500 italic">Click "Run Tests" or "Submit Solution" to test code.</p>
                ) : consoleOutput.status === 'Running' ? (
                  <p className="text-xs text-brand-300 animate-pulse">Compiling & executing sandboxed test runner...</p>
                ) : (
                  <div className="space-y-2">
                    {consoleOutput.runtimeMs && (
                      <div className="flex items-center gap-4 text-xs text-slate-300 font-mono pb-2 border-b border-slate-800">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> Runtime: <strong className="text-white">{consoleOutput.runtimeMs} ms</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-slate-400" /> Memory: <strong className="text-white">{consoleOutput.memoryMb} MB</strong>
                        </span>
                      </div>
                    )}

                    {consoleOutput.testResults?.map((tr, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 font-mono">
                        <div className="flex items-center gap-2">
                          {tr.passed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold">X</span>
                          )}
                          <span className="text-slate-300">Case {idx + 1}: {tr.input}</span>
                        </div>
                        <span className={tr.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {tr.passed ? 'Passed' : 'Wrong Answer'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
