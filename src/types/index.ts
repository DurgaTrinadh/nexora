// ==========================================
// NEXORA CORE TYPE DEFINITIONS
// ==========================================

// --- Mock Interviews ---
export type InterviewCategory = 'hr_behavioral' | 'technical_sde' | 'system_design' | 'company_specific';
export type InterviewDifficulty = 'fresher' | 'intermediate' | 'expert';

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  companyTag?: string; // e.g. "Google", "Amazon", "TCS"
  question: string;
  expectedKeywords: string[];
  suggestedAnswer: string;
  starRubric?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface InterviewScore {
  clarityScore: number; // 0 - 100
  keywordScore: number; // 0 - 100
  overallScore: number; // 0 - 100
  confidenceRating: string; // "Exceptional", "Strong", "Average", "Needs Practice"
  pros: string[];
  improvements: string[];
  transcribedAnswer: string;
  idealResponse: string;
}

export interface InterviewHistoryItem {
  id: string;
  date: string;
  categoryTitle: string;
  role: string;
  overallScore: number;
  questionsAnswered: number;
  durationSeconds: number;
}

// --- Aptitude & Core CS Tests ---
export type AptitudeDomain = 'quantitative' | 'logical' | 'verbal' | 'core_cs';

export interface AptitudeQuestion {
  id: string;
  domain: AptitudeDomain;
  topic: string; // e.g. "Time and Work", "Syllogisms", "DBMS Indexing"
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export type QuestionStatus = 'unvisited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_and_marked';

export interface AptitudeTestResult {
  id: string;
  testTitle: string;
  date: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  accuracy: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  domainBreakdown: Record<AptitudeDomain, { correct: number; total: number }>;
}

// --- DSA Preparation & Tests ---
export type DsaDifficulty = 'Easy' | 'Medium' | 'Hard';
export type DsaTopic = 
  | 'Arrays & Hashing' 
  | 'Two Pointers' 
  | 'Sliding Window' 
  | 'Linked Lists' 
  | 'Trees & Binary Search' 
  | 'Dynamic Programming' 
  | 'Graphs' 
  | 'Recursion & Backtracking';

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface DsaProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: DsaDifficulty;
  topic: DsaTopic;
  companyTags: string[];
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterTemplates: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  testCases: TestCase[];
  solutionHints: string[];
  optimalComplexity: {
    time: string;
    space: string;
  };
  acceptanceRate: string;
}

export interface DsaSubmission {
  problemId: string;
  language: string;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
  runtimeMs: number;
  memoryMb: number;
  timestamp: string;
}

// --- Job Tracker (Kanban) ---
export type JobStage = 
  | 'wishlist' 
  | 'applied' 
  | 'online_assessment' 
  | 'interviewing' 
  | 'offer' 
  | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  packageCtc: string; // e.g. "₹14 - 18 LPA"
  location: string;
  stage: JobStage;
  appliedDate: string;
  deadline?: string;
  jobUrl?: string;
  notes?: string;
  tags?: string[];
  referralStatus?: 'None' | 'Requested' | 'Secured';
}

// --- Resume Analyzer ---
export interface CompanyProfile {
  id: string;
  name: string;
  tier: 'Tier 1 Tech' | 'Service MNC' | 'FinTech / Unicorn' | 'Product Startup';
  logoUrl?: string;
  description: string;
  mustHaveSkills: string[];
  goodToHaveSkills: string[];
  keyAttributes: string[];
  cultureHighlights: string;
  recommendedResumeFocus: string;
}

export interface ResumeDiagnostic {
  candidateName?: string;
  targetCompany: string;
  atsScore: number; // 0 - 100
  metricsScore: number; // 0 - 100
  actionVerbsScore: number; // 0 - 100
  keywordMatchPercentage: number; // 0 - 100
  strengths: {
    title: string;
    detail: string;
  }[];
  criticalNegatives: {
    issue: string;
    impact: string;
    fixSuggestion: string;
  }[];
  missingKeywords: string[];
  matchedKeywords: string[];
  bulletRewrites: {
    original: string;
    improved: string;
    formulaUsed: string; // e.g. "Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z]"
  }[];
  readinessVerdict: string;
}

// --- Chatbot ---
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

// --- User Profile & Global State ---
export interface UserState {
  name: string;
  targetRole: string;
  dreamCompany: string;
  streakDays: number;
  lastActiveDate: string;
  solvedProblemIds: string[];
  bookmarkedProblemIds: string[];
  interviewHistory: InterviewHistoryItem[];
  aptitudeResults: AptitudeTestResult[];
  jobApplications: JobApplication[];
  lastResumeAnalysis: ResumeDiagnostic | null;
  geminiApiKey: string;
}
