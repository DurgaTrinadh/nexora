import { JobApplication } from '../types';

export const INITIAL_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: 'job-1',
    company: 'Google',
    role: 'Associate Software Engineer (SDE-1)',
    packageCtc: '₹32 - 40 LPA',
    location: 'Bangalore / Hyderabad',
    stage: 'interviewing',
    appliedDate: '2026-08-15',
    deadline: '2026-10-10',
    jobUrl: 'https://careers.google.com',
    notes: 'Cleared initial recruiter screen. Round 1 DSA & Algorithms scheduled for next Wednesday.',
    tags: ['Tier 1', 'Algorithms', 'High CTC'],
    referralStatus: 'Secured'
  },
  {
    id: 'job-2',
    company: 'Amazon',
    role: 'Software Development Engineer I',
    packageCtc: '₹28 - 34 LPA',
    location: 'Bangalore',
    stage: 'online_assessment',
    appliedDate: '2026-08-20',
    deadline: '2026-09-28',
    jobUrl: 'https://amazon.jobs',
    notes: 'Received OA link (HackerRank). 2 Coding questions (DP/Graphs) + Work Style Assessment.',
    tags: ['Tier 1', 'Leadership Principles'],
    referralStatus: 'Requested'
  },
  {
    id: 'job-3',
    company: 'Microsoft',
    role: 'Software Engineer - University Graduate',
    packageCtc: '₹25 - 30 LPA',
    location: 'Hyderabad / Noida',
    stage: 'applied',
    appliedDate: '2026-09-02',
    deadline: '2026-10-15',
    jobUrl: 'https://careers.microsoft.com',
    notes: 'Applied via campus portal. Resume status: Under review with hiring team.',
    tags: ['Cloud', 'Azure', 'Campus Drive'],
    referralStatus: 'None'
  },
  {
    id: 'job-4',
    company: 'Goldman Sachs',
    role: 'Analyst - Global Tech Engineering',
    packageCtc: '₹22 - 26 LPA',
    location: 'Bangalore',
    stage: 'applied',
    appliedDate: '2026-09-05',
    deadline: '2026-10-05',
    jobUrl: 'https://goldmansachs.com/careers',
    notes: 'Applied for engineering division. Preparing quantitative aptitude & Java multithreading.',
    tags: ['FinTech', 'Java', 'High Priority'],
    referralStatus: 'Requested'
  },
  {
    id: 'job-5',
    company: 'Atlassian',
    role: 'Associate Software Engineer',
    packageCtc: '₹35 - 42 LPA',
    location: 'Remote / Bangalore',
    stage: 'wishlist',
    appliedDate: '2026-09-10',
    deadline: '2026-10-20',
    jobUrl: 'https://atlassian.com/careers',
    notes: 'Need to tailor resume for TypeScript, React, and system design before applying.',
    tags: ['Remote', 'Full Stack'],
    referralStatus: 'None'
  },
  {
    id: 'job-6',
    company: 'TCS Digital',
    role: 'Digital Specialist Engineer',
    packageCtc: '₹7.5 - 9 LPA',
    location: 'Pan India',
    stage: 'offer',
    appliedDate: '2026-07-28',
    deadline: '2026-08-30',
    jobUrl: 'https://tcs.com/careers',
    notes: 'Offer letter received! Document verification completed. Joining expected in July 2027.',
    tags: ['Service MNC', 'Secured'],
    referralStatus: 'None'
  }
];

export const CURATED_OPENINGS = [
  {
    id: 'curated-1',
    company: 'Uber',
    role: 'Software Engineer - 1 (New Grad)',
    packageCtc: '₹38 - 45 LPA',
    location: 'Bangalore / Hyderabad',
    deadline: 'Oct 15, 2026',
    type: 'Off-Campus Hiring Drive',
    eligibility: 'B.Tech / M.Tech CSE, IT, ECE (2026/2027 batch)',
    tags: ['Tier 1', 'Distributed Systems', 'High CTC']
  },
  {
    id: 'curated-2',
    company: 'Razorpay',
    role: 'Product Engineer - Backend',
    packageCtc: '₹20 - 24 LPA',
    location: 'Bangalore (Hybrid)',
    deadline: 'Oct 05, 2026',
    type: 'Direct Application',
    eligibility: 'Strong skills in Go/Node.js, SQL, and APIs',
    tags: ['FinTech', 'High Growth', 'Product']
  },
  {
    id: 'curated-3',
    company: 'Salesforce',
    role: 'Associate Software Engineer',
    packageCtc: '₹30 - 36 LPA',
    location: 'Hyderabad / Bangalore',
    deadline: 'Oct 25, 2026',
    type: 'University Recruiting',
    eligibility: 'Graduating batch 2026 / 2027 with 7.0+ CGPA',
    tags: ['Cloud', 'Enterprise', 'Top Culture']
  },
  {
    id: 'curated-4',
    company: 'Swiggy',
    role: 'Software Engineer - Frontend',
    packageCtc: '₹18 - 22 LPA',
    location: 'Bangalore',
    deadline: 'Oct 12, 2026',
    type: 'Off-Campus Drive',
    eligibility: 'Proficient in React, Next.js, and Mobile Web optimization',
    tags: ['Consumer Tech', 'React']
  }
];
