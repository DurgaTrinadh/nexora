import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Trophy, 
  Bot, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Flame, 
  Layers,
  Send,
  History
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INTERVIEW_QUESTIONS } from '../../data/interviewQuestions';
import { InterviewCategory, InterviewQuestion, InterviewScore } from '../../types';
import { SpeechService } from '../../services/speechService';
import { AiAssistantService } from '../../services/aiAssistantService';

export const MockInterviewHub: React.FC = () => {
  const { userState, addInterviewHistory, triggerCelebration } = useApp();

  // State: 'lobby' | 'in_session' | 'evaluated' | 'summary'
  const [viewState, setViewState] = useState<'lobby' | 'in_session' | 'evaluated' | 'summary'>('lobby');
  const [selectedCategory, setSelectedCategory] = useState<InterviewCategory>('hr_behavioral');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState<InterviewQuestion[]>([]);

  // Session state
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(false);
  const [questionTimerSeconds, setQuestionTimerSeconds] = useState(120);
  const [evaluationResult, setEvaluationResult] = useState<InterviewScore | null>(null);
  const [sessionScores, setSessionScores] = useState<InterviewScore[]>([]);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Filter available questions by category
  const filteredQuestions = INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory);

  // Start interview session
  const startInterview = () => {
    const questions = filteredQuestions.length > 0 ? filteredQuestions : INTERVIEW_QUESTIONS.slice(0, 3);
    setActiveQuestions(questions);
    setActiveQuestionIndex(0);
    setCandidateAnswer('');
    setEvaluationResult(null);
    setSessionScores([]);
    setQuestionTimerSeconds(120);
    setViewState('in_session');
  };

  // When question changes, speak question aloud if not muted
  useEffect(() => {
    if (viewState === 'in_session' && activeQuestions.length > 0) {
      const currQ = activeQuestions[activeQuestionIndex];
      setCandidateAnswer('');
      setQuestionTimerSeconds(120);

      // Start countdown timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setQuestionTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Speak aloud
      if (!speechMuted) {
        setIsSpeaking(true);
        SpeechService.speak(currQ.question, () => {
          setIsSpeaking(false);
        });
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      SpeechService.stopSpeaking();
      SpeechService.stopListening();
    };
  }, [viewState, activeQuestionIndex, activeQuestions]);

  // Toggle Voice Recognition
  const toggleListening = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      SpeechService.stopSpeaking();
      setIsSpeaking(false);

      recognitionRef.current = SpeechService.startListening({
        onResult: (transcript, _isFinal) => {
          setCandidateAnswer(transcript);
        },
        onError: (err) => {
          console.warn('Speech recognition error:', err);
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
    }
  };

  // Replay question audio
  const handleReplayQuestion = () => {
    if (activeQuestions[activeQuestionIndex]) {
      setIsSpeaking(true);
      SpeechService.speak(activeQuestions[activeQuestionIndex].question, () => {
        setIsSpeaking(false);
      });
    }
  };

  // Submit answer for evaluation
  const handleSubmitAnswer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    SpeechService.stopListening();
    setIsListening(false);
    SpeechService.stopSpeaking();
    setIsSpeaking(false);

    const currentQuestion = activeQuestions[activeQuestionIndex];
    const score = AiAssistantService.evaluateInterviewAnswer(currentQuestion, candidateAnswer);
    setEvaluationResult(score);
    setSessionScores(prev => [...prev, score]);
    setViewState('evaluated');

    if (score.overallScore >= 80) {
      triggerCelebration();
    }
  };

  // Next Question or Finish Session
  const handleNextStep = () => {
    if (activeQuestionIndex < activeQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
      setEvaluationResult(null);
      setCandidateAnswer('');
      setViewState('in_session');
    } else {
      // Completed all questions!
      const totalAvg = Math.round(
        sessionScores.reduce((acc, s) => acc + s.overallScore, 0) / (sessionScores.length || 1)
      );

      addInterviewHistory({
        id: 'int-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        categoryTitle: selectedCategory.replace('_', ' ').toUpperCase(),
        role: userState.targetRole,
        overallScore: totalAvg,
        questionsAnswered: sessionScores.length,
        durationSeconds: sessionScores.length * 90
      });

      setViewState('summary');
      triggerCelebration();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* View: LOBBY */}
      {viewState === 'lobby' && (
        <div className="space-y-8">
          
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-brand-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
                  <Bot className="w-3.5 h-3.5 text-cyber-cyan" />
                  <span>AI-Powered Speech & Technical Evaluator</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  AI Mock Interview Studio
                </h1>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Practice high-stakes interviews with our speaking AI avatar. Test your answers against industry STAR benchmarks, technical keywords, and communication clarity in real time.
                </p>
              </div>

              <button
                onClick={startInterview}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyber-cyan text-white font-bold text-base shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-3"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Launch Mock Interview</span>
              </button>
            </div>
          </div>

          {/* Track Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" /> Choose Interview Track
              </h2>
              <span className="text-xs text-slate-400">Tailored question banks for each domain</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div
                onClick={() => setSelectedCategory('hr_behavioral')}
                className={`p-5 rounded-2xl cursor-pointer transition border ${
                  selectedCategory === 'hr_behavioral'
                    ? 'glass-panel-glow border-brand-500 bg-brand-500/10'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center mb-3 font-bold text-lg">
                  HR
                </div>
                <h3 className="text-sm font-bold text-white mb-1">HR & Behavioral</h3>
                <p className="text-xs text-slate-400">
                  STAR method questions, conflict resolution, leadership, and culture fit.
                </p>
              </div>

              <div
                onClick={() => setSelectedCategory('technical_sde')}
                className={`p-5 rounded-2xl cursor-pointer transition border ${
                  selectedCategory === 'technical_sde'
                    ? 'glass-panel-glow border-cyber-cyan bg-cyan-500/10'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyber-cyan flex items-center justify-center mb-3 font-bold text-lg">
                  SDE
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Technical SDE Core</h3>
                <p className="text-xs text-slate-400">
                  Data structures, time complexity, threads vs processes, B+ trees & OS concepts.
                </p>
              </div>

              <div
                onClick={() => setSelectedCategory('system_design')}
                className={`p-5 rounded-2xl cursor-pointer transition border ${
                  selectedCategory === 'system_design'
                    ? 'glass-panel-glow border-cyber-emerald bg-emerald-500/10'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-cyber-emerald flex items-center justify-center mb-3 font-bold text-lg">
                  SD
                </div>
                <h3 className="text-sm font-bold text-white mb-1">System Design</h3>
                <p className="text-xs text-slate-400">
                  Scalability, URL shorteners, Redis caching, microservices & throughput.
                </p>
              </div>

              <div
                onClick={() => setSelectedCategory('company_specific')}
                className={`p-5 rounded-2xl cursor-pointer transition border ${
                  selectedCategory === 'company_specific'
                    ? 'glass-panel-glow border-amber-500 bg-amber-500/10'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 font-bold text-lg">
                  TOP
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Company Specific</h3>
                <p className="text-xs text-slate-400">
                  Amazon Leadership Principles, Google Ambiguity questions, TCS rounds.
                </p>
              </div>

            </div>
          </div>

          {/* Past Sessions History */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-brand-400" /> Recent Mock Interview Sessions
            </h3>
            
            {userState.interviewHistory.length === 0 ? (
              <p className="text-xs text-slate-400">No previous sessions yet. Click Launch above to begin!</p>
            ) : (
              <div className="divide-y divide-slate-800">
                {userState.interviewHistory.map(item => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.categoryTitle}</h4>
                      <p className="text-[11px] text-slate-400">
                        {item.role} • {item.questionsAnswered} Questions • {item.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        item.overallScore >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-brand-500/20 text-brand-300'
                      }`}>
                        {item.overallScore}% Score
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* View: LIVE IN-SESSION INTERVIEW */}
      {viewState === 'in_session' && activeQuestions[activeQuestionIndex] && (
        <div className="space-y-6">
          
          {/* Top Session Bar */}
          <div className="flex items-center justify-between glass-panel px-6 py-3 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-500/10 px-3 py-1 rounded-lg border border-brand-500/20">
                Question {activeQuestionIndex + 1} of {activeQuestions.length}
              </span>
              <span className="text-xs text-slate-400">
                {activeQuestions[activeQuestionIndex].category.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Question Countdown Timer */}
              <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${
                questionTimerSeconds < 30 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700/60'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{Math.floor(questionTimerSeconds / 60)}:{(questionTimerSeconds % 60).toString().padStart(2, '0')}</span>
              </div>

              {/* Mute/Unmute Interviewer Voice */}
              <button
                onClick={() => {
                  if (!speechMuted) SpeechService.stopSpeaking();
                  setSpeechMuted(!speechMuted);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title={speechMuted ? 'Unmute AI voice' : 'Mute AI voice'}
              >
                {speechMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Main Interview Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col (5 cols): AI Robot Avatar & Question */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl flex flex-col items-center justify-between text-center space-y-6 relative overflow-hidden border border-brand-500/20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600/10 rounded-full blur-2xl pointer-events-none" />

              {/* Futuristic Avatar */}
              <div className="relative mt-2">
                <div className={`w-28 h-28 rounded-full bg-gradient-to-tr from-brand-600 via-indigo-700 to-cyber-cyan p-1 shadow-2xl transition-all duration-300 ${
                  isSpeaking ? 'ring-4 ring-cyber-cyan/50 scale-105' : ''
                }`}>
                  <div className="w-full h-full bg-[#0E1524] rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                    <Bot className="w-12 h-12 text-brand-300" />
                    {isSpeaking && (
                      <div className="absolute bottom-3 flex items-end h-5 gap-0.5">
                        <span className="audio-bar" />
                        <span className="audio-bar" />
                        <span className="audio-bar" />
                        <span className="audio-bar" />
                        <span className="audio-bar" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white">Nexora AI Interviewer</h3>
                  <p className="text-[11px] text-slate-400">
                    {isSpeaking ? 'Speaking question...' : 'Listening to candidate'}
                  </p>
                </div>
              </div>

              {/* Question Box */}
              <div className="w-full bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Interviewer asks:</span>
                  <button
                    onClick={handleReplayQuestion}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Replay Voice
                  </button>
                </div>
                <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                  "{activeQuestions[activeQuestionIndex].question}"
                </p>
              </div>

              {/* Rubric hints pill */}
              <div className="text-left w-full text-[11px] text-slate-400 bg-brand-500/5 p-3 rounded-xl border border-brand-500/10">
                <strong className="text-brand-300">Target Keywords: </strong>
                <span>{activeQuestions[activeQuestionIndex].expectedKeywords.slice(0, 4).join(', ')}...</span>
              </div>
            </div>

            {/* Right Col (7 cols): Candidate Voice & Text Input */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Mic className="w-4 h-4 text-cyber-cyan" /> Your Response (Voice or Type)
                  </label>
                  <span className="text-xs text-slate-400">
                    {candidateAnswer.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                {/* Big Answer Textarea */}
                <textarea
                  value={candidateAnswer}
                  onChange={e => setCandidateAnswer(e.target.value)}
                  placeholder="Click the microphone below to speak your answer, or type your response here..."
                  rows={8}
                  className="w-full glass-input p-4 rounded-2xl text-sm leading-relaxed placeholder:text-slate-500 resize-none font-sans"
                />

                {/* Speech Recognition Mic Control */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleListening}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                        isListening
                          ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/40 shadow-rose-600/30'
                          : 'bg-brand-600 text-white hover:bg-brand-500 shadow-brand-500/30'
                      }`}
                    >
                      {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {isListening ? 'Microphone Active (Speaking...)' : 'Voice Input Available'}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {isListening ? 'Live speech-to-text transcribing' : 'Click to toggle voice dictation'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    You can edit the transcribed text anytime.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setViewState('lobby')}
                  className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Exit Session
                </button>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={candidateAnswer.trim().length === 0}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  <span>Submit & Evaluate Answer</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* View: EVALUATION SCORECARD */}
      {viewState === 'evaluated' && evaluationResult && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Header Score Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Answer Evaluated by Nexora AI</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Round Score: <span className="gradient-text-brand">{evaluationResult.overallScore}%</span>
                </h2>
                <p className="text-xs text-slate-300">
                  Confidence Rating: <strong className="text-white">{evaluationResult.confidenceRating}</strong>
                </p>
              </div>

              {/* Next Question / Finish Button */}
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white font-bold text-xs shadow-xl shadow-brand-500/30 hover:opacity-95 transition flex items-center gap-2"
              >
                <span>
                  {activeQuestionIndex < activeQuestions.length - 1 ? 'Next Question' : 'View Full Summary'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Clarity & Elaboration</span>
                <div className="text-xl font-bold text-white mt-1">{evaluationResult.clarityScore}%</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Technical Keywords</span>
                <div className="text-xl font-bold text-cyber-cyan mt-1">{evaluationResult.keywordScore}%</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Confidence Rating</span>
                <div className="text-xl font-bold text-emerald-400 mt-1">{evaluationResult.confidenceRating}</div>
              </div>
            </div>
          </div>

          {/* Positives & Improvements 2-Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Positives */}
            <div className="glass-panel p-6 rounded-2xl space-y-3 border-l-4 border-emerald-500">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Strong Points (Positives)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {evaluationResult.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="glass-panel p-6 rounded-2xl space-y-3 border-l-4 border-amber-500">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Areas for Improvement (Negatives)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {evaluationResult.improvements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Ideal Suggested Response */}
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" /> Ideal Model Response for Comparison
            </h3>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono">
              {evaluationResult.idealResponse}
            </div>
          </div>

        </div>
      )}

      {/* View: FULL SESSION SUMMARY */}
      {viewState === 'summary' && (
        <div className="glass-panel p-8 rounded-3xl text-center space-y-6 max-w-xl mx-auto border border-brand-500/30">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyber-emerald mx-auto flex items-center justify-center text-white shadow-xl shadow-brand-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Interview Session Completed!</h2>
            <p className="text-xs text-slate-400 mt-1">
              Your results have been logged and factored into your overall Placement Readiness Index.
            </p>
          </div>

          <div className="py-4 border-y border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400">Questions Answered</span>
              <div className="text-2xl font-black text-white mt-1">{sessionScores.length}</div>
            </div>
            <div>
              <span className="text-xs text-slate-400">Average Score</span>
              <div className="text-2xl font-black text-cyber-cyan mt-1">
                {Math.round(sessionScores.reduce((acc, s) => acc + s.overallScore, 0) / (sessionScores.length || 1))}%
              </div>
            </div>
          </div>

          <button
            onClick={() => setViewState('lobby')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyber-cyan text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:opacity-95 transition"
          >
            Back to Interview Lobby
          </button>
        </div>
      )}

    </div>
  );
};
