import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // --- HR & BEHAVIORAL ---
  {
    id: 'hr-1',
    category: 'hr_behavioral',
    question: 'Tell me about yourself and why you are interested in this software engineering role.',
    expectedKeywords: ['passion for technology', 'projects', 'problem-solving', 'scalable', 'collaboration', 'continuous learning', 'contribution'],
    suggestedAnswer: 'Start with a crisp elevator pitch: (1) Your educational background and core technical passion, (2) 1-2 impactful projects or internships where you solved real problems using modern stacks, (3) Why this specific company\'s culture and technical challenges excite you, and how your skills will add value.',
    starRubric: {
      situation: 'Current academic/professional background and tech focus.',
      task: 'Identified passion in building scalable software systems.',
      action: 'Developed key projects, learned core architectures and collaborated.',
      result: 'Ready to contribute immediately to the team\'s mission.'
    }
  },
  {
    id: 'hr-2',
    category: 'hr_behavioral',
    question: 'Describe a challenging technical bug or hurdle you encountered in a project and how you resolved it using the STAR method.',
    expectedKeywords: ['situation', 'task', 'action', 'result', 'debugging', 'root cause', 'profiler', 'git', 'metrics', 'learned'],
    suggestedAnswer: 'Describe a specific production or project issue: state what broke (Situation), your goal to minimize latency or restore data (Task), how you systematically profiled or debugged the root cause (Action), and the measurable outcome, such as reducing query latency by 45% (Result).',
    starRubric: {
      situation: 'Database queries were timing out under concurrent load during our capstone demo.',
      task: 'Identify the bottleneck and improve response time without refactoring the entire backend.',
      action: 'Profiled SQL execution plans, found missing B-tree indexes and N+1 query loops, implemented indexing and Redis caching.',
      result: 'Query execution dropped from 1,200ms to 45ms, handling 500+ concurrent requests effortlessly.'
    }
  },
  {
    id: 'hr-3',
    category: 'hr_behavioral',
    question: 'Tell me about a time when you had a conflict or difference of opinion with a team member. How did you handle it?',
    expectedKeywords: ['empathy', 'active listening', 'data-driven', 'compromise', 'objective', 'team goal', 'respect', 'consensus'],
    suggestedAnswer: 'Focus on empathy and objective decision making. Explain that disagreements were based on technical architecture choices, you conducted a benchmark or prototype comparison, listened to their perspective, and arrived at a consensus that best served the end users.',
    starRubric: {
      situation: 'Teammates disagreed on whether to use SQL vs MongoDB for our hackathon project.',
      task: 'Reach a technical consensus without stalling development schedule.',
      action: 'Created a quick pros/cons matrix evaluating relational schema requirements and query complexity.',
      result: 'Agreed on PostgreSQL, shipped MVP ahead of deadline, and preserved great team camaraderie.'
    }
  },

  // --- TECHNICAL SDE ---
  {
    id: 'tech-1',
    category: 'technical_sde',
    question: 'Can you explain the internal working of a Hash Map / Hash Table and how hash collisions are resolved?',
    expectedKeywords: ['hash function', 'buckets', 'collisions', 'chaining', 'linked list', 'red-black tree', 'open addressing', 'linear probing', 'load factor', 'O(1) average time'],
    suggestedAnswer: 'A Hash Map uses a hash function to map keys to bucket array indices for O(1) average lookup. When two keys hash to the same bucket index (collision), it is handled via Chaining (storing collided entries in a linked list or self-balancing Red-Black Tree when chain length exceeds a threshold like 8 in Java 8+) or Open Addressing (linear/quadratic probing). When load factor exceeds ~0.75, resizing/rehashing occurs.',
  },
  {
    id: 'tech-2',
    category: 'technical_sde',
    question: 'Explain the difference between a Process and a Thread, and how inter-process communication (IPC) differs from inter-thread communication.',
    expectedKeywords: ['address space', 'memory', 'context switch', 'stack', 'heap', 'shared memory', 'IPC', 'pipes', 'sockets', 'race condition', 'mutex'],
    suggestedAnswer: 'A Process is an executing instance of a program with its own dedicated memory address space, file handles, and resources. A Thread is a lightweight unit of execution within a process that shares the parent process\'s heap, code, and global data, but has its own independent stack and registers. Threads communicate fast via shared memory (requiring mutexes/locks), while processes require IPC mechanisms like Pipes, Message Queues, Shared Memory, or Sockets.',
  },
  {
    id: 'tech-3',
    category: 'technical_sde',
    question: 'What is database indexing, how does a B+ Tree index work, and what are the trade-offs of having too many indexes?',
    expectedKeywords: ['b+ tree', 'binary search', 'leaf nodes', 'disk I/O', 'range queries', 'write overhead', 'insert/update performance', 'storage', 'clustered vs non-clustered'],
    suggestedAnswer: 'Database indexing creates an auxiliary data structure (typically a B+ Tree) to locate rows in O(log N) disk reads without full table scans. B+ Trees store all actual record pointers in leaf nodes linked sequentially, making range queries extremely fast. Trade-off: Every INSERT, UPDATE, or DELETE requires updating the B+ Tree, slowing down write-heavy workloads and consuming extra disk storage.',
  },

  // --- SYSTEM DESIGN & CLOUD ---
  {
    id: 'sys-1',
    category: 'system_design',
    question: 'How would you design a URL Shortener service like Bitly? Explain the high-level architecture, database choice, and base62 encoding.',
    expectedKeywords: ['base62', 'hashing', 'unique id generator', 'redis caching', 'nosql', 'relational db', 'load balancer', 'scale', 'read heavy', '301 vs 302 redirect'],
    suggestedAnswer: 'A URL shortener is read-heavy (100:1 read to write ratio). High-level design: Client -> API Gateway/Load Balancer -> App Servers -> Cache (Redis for top 20% URLs) -> Database (NoSQL or PostgreSQL). When shortening, generate a unique 64-bit integer ID and encode it in Base62 ([a-zA-Z0-9]) resulting in a 7-character slug. For redirection, return HTTP 302 (for analytics) or 301 (permanent cacheable redirect).',
  },

  // --- COMPANY SPECIFIC (AMAZON / GOOGLE / TCS) ---
  {
    id: 'comp-amazon-1',
    category: 'company_specific',
    companyTag: 'Amazon',
    question: 'Amazon Leadership Principle: "Customer Obsession" - Give an example of a time when you worked backwards from the customer\'s needs to build a solution.',
    expectedKeywords: ['customer obsession', 'working backwards', 'feedback', 'user experience', 'accessibility', 'metrics', 'measured impact', 'iteration'],
    suggestedAnswer: 'Highlight how you gathered user feedback directly, discovered friction points that users experienced, prioritized customer needs over technical shortcuts, and launched an intuitive feature that measurably improved user retention or task completion speed.',
  },
  {
    id: 'comp-google-1',
    category: 'company_specific',
    companyTag: 'Google',
    question: 'Googleyness & Ambiguity: Describe a situation where you had vague requirements and no clear roadmap. How did you take initiative?',
    expectedKeywords: ['ambiguity', 'initiative', 'prototyping', 'stakeholder alignment', 'incremental progress', 'data-driven', 'ownership'],
    suggestedAnswer: 'Focus on how you broke down a nebulous problem into smaller hypotheses, built quick prototypes to test assumptions, gathered early feedback from mentors or users, and iteratively refined the requirements into a clear technical spec.',
  },
  {
    id: 'comp-tcs-1',
    category: 'company_specific',
    companyTag: 'TCS',
    question: 'TCS Campus Round: Why do you want to join Tata Consultancy Services, and how adaptable are you to learning new enterprise technology stacks?',
    expectedKeywords: ['tata values', 'global impact', 'continuous learning', 'upskilling', 'adaptability', 'client satisfaction', 'team player', 'certifications'],
    suggestedAnswer: 'Express admiration for Tata\'s ethics, global client exposure, and commitment to nation-building. Mention your track record of quickly learning new languages (e.g., picking up TypeScript or Cloud tools in a few weeks) and readiness to upskill and deliver value in enterprise cloud projects.',
  }
];
