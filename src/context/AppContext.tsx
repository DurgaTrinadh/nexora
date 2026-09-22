import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserState, 
  JobApplication, 
  AptitudeTestResult, 
  InterviewHistoryItem, 
  ResumeDiagnostic 
} from '../types';
import { INITIAL_JOB_APPLICATIONS } from '../data/sampleJobs';

export type NavigationTab = 
  | 'dashboard' 
  | 'interviews' 
  | 'aptitude' 
  | 'dsa' 
  | 'jobs' 
  | 'resume' 
  | 'assistant';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userState: UserState;
  updateUserState: (updater: (prev: UserState) => UserState) => void;
  // Feature-specific helpers
  toggleSolvedProblem: (problemId: string) => void;
  toggleBookmarkedProblem: (problemId: string) => void;
  addInterviewHistory: (item: InterviewHistoryItem) => void;
  addAptitudeResult: (result: AptitudeTestResult) => void;
  addJobApplication: (job: Omit<JobApplication, 'id' | 'appliedDate'>) => void;
  updateJobStage: (jobId: string, stage: JobApplication['stage']) => void;
  deleteJobApplication: (jobId: string) => void;
  setResumeAnalysis: (analysis: ResumeDiagnostic) => void;
  setGeminiApiKey: (key: string) => void;
  triggerCelebration: () => void;
  readinessScore: number;
}

const STORAGE_KEY = 'nexora_user_state_v1';

const DEFAULT_STATE: UserState = {
  name: 'Candidate',
  targetRole: 'Software Development Engineer (SDE-1)',
  dreamCompany: 'Google',
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  solvedProblemIds: ['dsa-1'], // Initially marked Two Sum
  bookmarkedProblemIds: ['dsa-3'],
  interviewHistory: [
    {
      id: 'int-init-1',
      date: '2026-09-20',
      categoryTitle: 'HR & Behavioral',
      role: 'SDE-1 Behavioral Round',
      overallScore: 84,
      questionsAnswered: 3,
      durationSeconds: 320
    }
  ],
  aptitudeResults: [
    {
      id: 'apt-init-1',
      testTitle: 'TCS NQT Full Placement Mock',
      date: '2026-09-21',
      totalQuestions: 15,
      attempted: 14,
      correct: 12,
      accuracy: 85.7,
      scorePercentage: 80,
      timeSpentSeconds: 1140,
      domainBreakdown: {
        quantitative: { correct: 3, total: 4 },
        logical: { correct: 3, total: 3 },
        verbal: { correct: 3, total: 4 },
        core_cs: { correct: 3, total: 4 }
      }
    }
  ],
  jobApplications: INITIAL_JOB_APPLICATIONS,
  lastResumeAnalysis: null,
  geminiApiKey: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse saved state:', e);
    }
    return DEFAULT_STATE;
  });

  // Persist state to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }, [userState]);

  const updateUserState = (updater: (prev: UserState) => UserState) => {
    setUserState(prev => updater(prev));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const toggleSolvedProblem = (problemId: string) => {
    setUserState(prev => {
      const exists = prev.solvedProblemIds.includes(problemId);
      const updated = exists 
        ? prev.solvedProblemIds.filter(id => id !== problemId)
        : [...prev.solvedProblemIds, problemId];
      
      if (!exists) {
        triggerCelebration();
      }
      return { ...prev, solvedProblemIds: updated };
    });
  };

  const toggleBookmarkedProblem = (problemId: string) => {
    setUserState(prev => ({
      ...prev,
      bookmarkedProblemIds: prev.bookmarkedProblemIds.includes(problemId)
        ? prev.bookmarkedProblemIds.filter(id => id !== problemId)
        : [...prev.bookmarkedProblemIds, problemId]
    }));
  };

  const addInterviewHistory = (item: InterviewHistoryItem) => {
    setUserState(prev => ({
      ...prev,
      interviewHistory: [item, ...prev.interviewHistory]
    }));
  };

  const addAptitudeResult = (result: AptitudeTestResult) => {
    setUserState(prev => ({
      ...prev,
      aptitudeResults: [result, ...prev.aptitudeResults]
    }));
    if (result.scorePercentage >= 70) {
      triggerCelebration();
    }
  };

  const addJobApplication = (job: Omit<JobApplication, 'id' | 'appliedDate'>) => {
    const newJob: JobApplication = {
      ...job,
      id: 'job-' + Date.now(),
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setUserState(prev => ({
      ...prev,
      jobApplications: [newJob, ...prev.jobApplications]
    }));
  };

  const updateJobStage = (jobId: string, stage: JobApplication['stage']) => {
    setUserState(prev => ({
      ...prev,
      jobApplications: prev.jobApplications.map(job => 
        job.id === jobId ? { ...job, stage } : job
      )
    }));
    if (stage === 'offer') {
      triggerCelebration();
    }
  };

  const deleteJobApplication = (jobId: string) => {
    setUserState(prev => ({
      ...prev,
      jobApplications: prev.jobApplications.filter(job => job.id !== jobId)
    }));
  };

  const setResumeAnalysis = (analysis: ResumeDiagnostic) => {
    setUserState(prev => ({
      ...prev,
      lastResumeAnalysis: analysis
    }));
    if (analysis.atsScore >= 75) {
      triggerCelebration();
    }
  };

  const setGeminiApiKey = (key: string) => {
    setUserState(prev => ({
      ...prev,
      geminiApiKey: key
    }));
  };

  // Calculate Placement Readiness Score (0 - 100)
  // Weighted:
  // - DSA Solved: 30%
  // - Aptitude Average: 25%
  // - Mock Interview Average: 25%
  // - Resume Score: 20%
  const calcReadiness = (): number => {
    const dsaWeight = Math.min(100, (userState.solvedProblemIds.length / 6) * 100) * 0.30;
    
    let aptScore = 65;
    if (userState.aptitudeResults.length > 0) {
      const sum = userState.aptitudeResults.reduce((acc, r) => acc + r.scorePercentage, 0);
      aptScore = sum / userState.aptitudeResults.length;
    }
    const aptWeight = aptScore * 0.25;

    let intScore = 70;
    if (userState.interviewHistory.length > 0) {
      const sum = userState.interviewHistory.reduce((acc, i) => acc + i.overallScore, 0);
      intScore = sum / userState.interviewHistory.length;
    }
    const intWeight = intScore * 0.25;

    const resumeScore = userState.lastResumeAnalysis ? userState.lastResumeAnalysis.atsScore : 72;
    const resumeWeight = resumeScore * 0.20;

    return Math.min(100, Math.round(dsaWeight + aptWeight + intWeight + resumeWeight));
  };

  const readinessScore = calcReadiness();

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userState,
        updateUserState,
        toggleSolvedProblem,
        toggleBookmarkedProblem,
        addInterviewHistory,
        addAptitudeResult,
        addJobApplication,
        updateJobStage,
        deleteJobApplication,
        setResumeAnalysis,
        setGeminiApiKey,
        triggerCelebration,
        readinessScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
