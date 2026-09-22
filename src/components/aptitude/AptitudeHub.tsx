import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Trophy, 
  HelpCircle, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Eraser, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { APTITUDE_QUESTIONS, PRESET_MOCK_EXAMS } from '../../data/aptitudeData';
import { AptitudeQuestion, AptitudeDomain, AptitudeTestResult, QuestionStatus } from '../../types';

export const AptitudeHub: React.FC = () => {
  const { addAptitudeResult, userState, triggerCelebration } = useApp();

  // 'home' | 'test' | 'result'
  const [viewMode, setViewMode] = useState<'home' | 'test' | 'result'>('home');
  const [activeExamTitle, setActiveExamTitle] = useState('Placement Aptitude Test');
  const [examQuestions, setExamQuestions] = useState<AptitudeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // User test responses: map questionId -> optionIndex
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Question statuses for the question palette
  const [questionStatuses, setQuestionStatuses] = useState<Record<string, QuestionStatus>>({});
  
  // Timer
  const [remainingSeconds, setRemainingSeconds] = useState(1800); // 30 mins
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const timerRef = useRef<any>(null);

  // Completed Test Result
  const [testResult, setTestResult] = useState<AptitudeTestResult | null>(null);

  // Start a preset mock test
  const startPresetExam = (exam: typeof PRESET_MOCK_EXAMS[0]) => {
    setActiveExamTitle(exam.title);
    const filtered = APTITUDE_QUESTIONS.filter(q => exam.domains.includes(q.domain));
    const selected = filtered.length > 0 ? filtered.slice(0, exam.totalQuestions) : APTITUDE_QUESTIONS.slice(0, 10);
    
    initializeExam(selected, exam.durationMinutes * 60, exam.title);
  };

  // Start domain-specific practice
  const startDomainExam = (domain: AptitudeDomain, title: string) => {
    const domainQuestions = APTITUDE_QUESTIONS.filter(q => q.domain === domain);
    initializeExam(domainQuestions, 15 * 60, title);
  };

  const initializeExam = (questions: AptitudeQuestion[], durationSec: number, title: string) => {
    setExamQuestions(questions);
    setActiveExamTitle(title);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    
    // Initial statuses: first is not_answered, rest unvisited
    const initialStatuses: Record<string, QuestionStatus> = {};
    questions.forEach((q, idx) => {
      initialStatuses[q.id] = idx === 0 ? 'not_answered' : 'unvisited';
    });
    setQuestionStatuses(initialStatuses);

    setRemainingSeconds(durationSec);
    setTimeSpentSeconds(0);
    setTestResult(null);
    setViewMode('test');
  };

  // Timer countdown
  useEffect(() => {
    if (viewMode === 'test') {
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpentSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewMode]);

  // Handle selecting an option
  const handleSelectOption = (optionIndex: number) => {
    const currentQ = examQuestions[currentQuestionIndex];
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optionIndex }));
    setQuestionStatuses(prev => ({ ...prev, [currentQ.id]: 'answered' }));
  };

  // Mark for review
  const handleMarkForReview = () => {
    const currentQ = examQuestions[currentQuestionIndex];
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQ.id]: prev[currentQ.id] === 'answered' ? 'answered_and_marked' : 'marked_for_review'
    }));
    handleNext();
  };

  // Clear current response
  const handleClearResponse = () => {
    const currentQ = examQuestions[currentQuestionIndex];
    setUserAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
    setQuestionStatuses(prev => ({ ...prev, [currentQ.id]: 'not_answered' }));
  };

  // Navigation
  const handleNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = examQuestions[nextIdx];
      setCurrentQuestionIndex(nextIdx);

      // Update next question's status if unvisited
      if (questionStatuses[nextQ.id] === 'unvisited') {
        setQuestionStatuses(prev => ({ ...prev, [nextQ.id]: 'not_answered' }));
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    const targetQ = examQuestions[index];
    setCurrentQuestionIndex(index);
    if (questionStatuses[targetQ.id] === 'unvisited') {
      setQuestionStatuses(prev => ({ ...prev, [targetQ.id]: 'not_answered' }));
    }
  };

  // Submit test
  const handleSubmitTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    const domainStats: Record<AptitudeDomain, { correct: number; total: number }> = {
      quantitative: { correct: 0, total: 0 },
      logical: { correct: 0, total: 0 },
      verbal: { correct: 0, total: 0 },
      core_cs: { correct: 0, total: 0 }
    };

    examQuestions.forEach(q => {
      domainStats[q.domain].total += 1;
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
        domainStats[q.domain].correct += 1;
      }
    });

    const attemptedCount = Object.keys(userAnswers).length;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 1000) / 10 : 0;
    const scorePct = Math.round((correctCount / examQuestions.length) * 100);

    const result: AptitudeTestResult = {
      id: 'apt-' + Date.now(),
      testTitle: activeExamTitle,
      date: new Date().toISOString().split('T')[0],
      totalQuestions: examQuestions.length,
      attempted: attemptedCount,
      correct: correctCount,
      accuracy,
      scorePercentage: scorePct,
      timeSpentSeconds,
      domainBreakdown: domainStats
    };

    setTestResult(result);
    addAptitudeResult(result);
    setViewMode('result');

    if (scorePct >= 70) {
      triggerCelebration();
    }
  };

  const currentQ = examQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* MODE: HOME (Test Selection) */}
      {viewMode === 'home' && (
        <div className="space-y-8">
          
          {/* Header Hero */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-cyber-cyan/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyber-cyan text-xs font-semibold">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>TCS iON / AMCAT Exam Engine</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  Placement Aptitude & Core CS Arena
                </h1>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Real company exam simulations with live countdown timers, official question palettes, and step-by-step mathematical explanations.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel-glow text-center border border-cyan-500/30">
                <span className="text-xs text-slate-400">Tests Completed</span>
                <div className="text-2xl font-black text-white mt-0.5">
                  {userState.aptitudeResults.length}
                </div>
                <span className="text-[11px] text-cyber-cyan font-semibold">
                  {userState.aptitudeResults.length > 0 
                    ? `${Math.round(userState.aptitudeResults.reduce((acc, r) => acc + r.scorePercentage, 0) / userState.aptitudeResults.length)}% Avg Score`
                    : 'Get started'}
                </span>
              </div>
            </div>
          </div>

          {/* Full Mock Placement Tests */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-cyber-cyan" /> Full-Length Company Mock Tests
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRESET_MOCK_EXAMS.map(exam => (
                <div 
                  key={exam.id}
                  className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyber-cyan/50 transition flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full">
                        {exam.company}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {exam.durationMinutes} mins
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyber-cyan transition">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {exam.description}
                    </p>
                  </div>

                  <button
                    onClick={() => startPresetExam(exam)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white font-bold text-xs shadow-lg shadow-brand-500/20 hover:opacity-95 transition flex items-center justify-center gap-2"
                  >
                    <span>Start Mock Exam ({exam.totalQuestions} Qs)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Practice Modules */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Topic-Wise Practice Sprints
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div 
                onClick={() => startDomainExam('quantitative', 'Quantitative Aptitude Sprint')}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-brand-500/50 cursor-pointer transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-brand-300 flex items-center justify-center mb-3 font-bold text-lg">
                  %
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Quantitative Aptitude</h3>
                <p className="text-xs text-slate-400 mb-3">
                  Time & Work, Profit/Loss, Speed & Distance, Probability, Permutations.
                </p>
                <span className="text-xs font-semibold text-brand-400 flex items-center gap-1">
                  Start Practice <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </span>
              </div>

              <div 
                onClick={() => startDomainExam('logical', 'Logical Reasoning Sprint')}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyber-cyan/50 cursor-pointer transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyber-cyan flex items-center justify-center mb-3 font-bold text-lg">
                  🧩
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Logical Reasoning</h3>
                <p className="text-xs text-slate-400 mb-3">
                  Blood relations, Syllogisms, Seating arrangements, Series, Coding.
                </p>
                <span className="text-xs font-semibold text-cyber-cyan flex items-center gap-1">
                  Start Practice <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </span>
              </div>

              <div 
                onClick={() => startDomainExam('verbal', 'Verbal English Ability Sprint')}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 font-bold text-lg">
                  Aa
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Verbal Ability</h3>
                <p className="text-xs text-slate-400 mb-3">
                  Sentence correction, Synonyms/Antonyms, Para-jumbles, Idioms.
                </p>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  Start Practice <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </span>
              </div>

              <div 
                onClick={() => startDomainExam('core_cs', 'Core Computer Science Sprint')}
                className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 cursor-pointer transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 font-bold text-lg">
                  &lt;/&gt;
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Core CS (OS, DBMS, CN)</h3>
                <p className="text-xs text-slate-400 mb-3">
                  Paging, Deadlocks, 3NF Normalization, TCP/UDP, OOP Polymorphism.
                </p>
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  Start Practice <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* MODE: ACTIVE TEST PORTAL */}
      {viewMode === 'test' && currentQ && (
        <div className="space-y-6">
          
          {/* Exam Header */}
          <div className="glass-panel px-6 py-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-white">{activeExamTitle}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-brand-500/20 text-brand-300 font-semibold uppercase">
                {currentQ.topic}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Countdown Timer */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                remainingSeconds < 180 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
                  : 'bg-slate-800 text-slate-200 border-slate-700/60'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(remainingSeconds / 60)}:{(remainingSeconds % 60).toString().padStart(2, '0')} remaining
                </span>
              </div>

              {/* Finish Test button */}
              <button
                onClick={handleSubmitTest}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Exam Portal Grid: Left (Question & Options) + Right (Palette) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col (8 cols): Question Area */}
            <div className="lg:col-span-8 glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                {/* Question meta */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Question {currentQuestionIndex + 1} of {examQuestions.length}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    currentQ.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-300' :
                    currentQ.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-300' :
                    'bg-rose-500/10 text-rose-300'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>

                {/* Question Statement */}
                <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed whitespace-pre-line">
                  {currentQ.question}
                </p>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQ.id] === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`p-4 rounded-xl cursor-pointer border transition flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-brand-600/20 border-brand-500 text-white shadow-md shadow-brand-500/10'
                            : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'border-brand-400 bg-brand-500 text-white' : 'border-slate-600 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Action Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkForReview}
                    className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Bookmark className="w-3.5 h-3.5" /> Mark for Review & Next
                  </button>

                  <button
                    onClick={handleClearResponse}
                    disabled={userAnswers[currentQ.id] === undefined}
                    className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition"
                  >
                    <Eraser className="w-3.5 h-3.5" /> Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === examQuestions.length - 1}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Col (4 cols): Official Question Palette */}
            <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Question Palette</h3>
                <p className="text-xs text-slate-400">Click any number to jump directly to that question</p>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" /> Answered
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" /> Not Answered
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" /> Marked Review
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-700" /> Not Visited
                </div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {examQuestions.map((q, idx) => {
                  const status = questionStatuses[q.id];
                  const isCurrent = idx === currentQuestionIndex;

                  let colorClass = 'bg-slate-800 text-slate-400 border-slate-700/60';
                  if (status === 'answered') colorClass = 'bg-emerald-600 text-white border-emerald-500';
                  else if (status === 'not_answered') colorClass = 'bg-rose-600/80 text-white border-rose-500';
                  else if (status === 'marked_for_review' || status === 'answered_and_marked') {
                    colorClass = 'bg-purple-600 text-white border-purple-500';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => jumpToQuestion(idx)}
                      className={`h-9 rounded-xl font-bold text-xs border transition ${colorClass} ${
                        isCurrent ? 'ring-2 ring-white scale-105 font-black' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Summary Counter */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Answered:</span>
                  <strong className="text-emerald-400">{Object.keys(userAnswers).length}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Remaining:</span>
                  <strong className="text-slate-400">
                    {examQuestions.length - Object.keys(userAnswers).length}
                  </strong>
                </div>
              </div>

              <button
                onClick={handleSubmitTest}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition"
              >
                Submit & View Scorecard
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODE: RESULT & DETAILED SOLUTIONS */}
      {viewMode === 'result' && testResult && (
        <div className="space-y-8 animate-in zoom-in-95 duration-200">
          
          {/* Header Score Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyber-cyan text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Exam Completed & Evaluated</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {testResult.testTitle}
                </h2>
                <p className="text-xs text-slate-300">
                  Completed in {Math.floor(testResult.timeSpentSeconds / 60)}m {testResult.timeSpentSeconds % 60}s
                </p>
              </div>

              <button
                onClick={() => setViewMode('home')}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition"
              >
                Back to Tests
              </button>
            </div>

            {/* 4 Score Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Score</span>
                <div className="text-2xl font-black text-cyber-cyan mt-1">{testResult.scorePercentage}%</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Accuracy</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">{testResult.accuracy}%</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Correct Answers</span>
                <div className="text-2xl font-black text-white mt-1">
                  {testResult.correct} / {testResult.totalQuestions}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Attempted</span>
                <div className="text-2xl font-black text-brand-300 mt-1">
                  {testResult.attempted} / {testResult.totalQuestions}
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Solutions Breakdown */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyber-cyan" /> Detailed Step-by-Step Solutions
            </h3>

            <div className="space-y-4">
              {examQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                const isSkipped = userAns === undefined;

                return (
                  <div 
                    key={q.id}
                    className={`glass-panel p-6 rounded-2xl border ${
                      isCorrect ? 'border-emerald-500/30' : isSkipped ? 'border-slate-800' : 'border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        Question {idx + 1} • {q.topic}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-300' :
                        isSkipped ? 'bg-slate-800 text-slate-400' :
                        'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isCorrect ? 'Correct (+1)' : isSkipped ? 'Not Attempted (0)' : 'Incorrect (0)'}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-white mb-4 whitespace-pre-line">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userAns === optIdx;
                        const isAnswer = optIdx === q.correctIndex;
                        return (
                          <div 
                            key={optIdx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${
                              isAnswer ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200' :
                              isChosen ? 'bg-rose-500/15 border-rose-500/40 text-rose-200' :
                              'bg-slate-900/40 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            {isAnswer && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-Step Explanation */}
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-cyan">
                        Mathematical & Conceptual Explanation:
                      </span>
                      <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
