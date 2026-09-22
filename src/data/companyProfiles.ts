import { CompanyProfile } from '../types';

export const COMPANY_PROFILES: CompanyProfile[] = [
  {
    id: 'google',
    name: 'Google',
    tier: 'Tier 1 Tech',
    description: 'Focuses heavily on core computer science foundations, algorithmic efficiency, distributed scalability, and Googleyness (intellectual humility & collaboration).',
    mustHaveSkills: [
      'Data Structures & Algorithms',
      'System Design',
      'Time & Space Complexity',
      'C++',
      'Java',
      'Python',
      'Concurrency',
      'Distributed Systems'
    ],
    goodToHaveSkills: [
      'Kubernetes',
      'gRPC',
      'Microservices',
      'Machine Learning',
      'Go',
      'Linux Internals',
      'Open Source Contributions'
    ],
    keyAttributes: [
      'Googleyness (Navigating ambiguity, ethical integrity)',
      'Algorithmic rigor (O(n log n) vs O(n) thinking)',
      'Scalability and high-throughput thinking',
      'Measurable business/performance impact'
    ],
    cultureHighlights: 'Looks for candidates who take ownership, love data-backed decisions, and communicate thought processes clearly before coding.',
    recommendedResumeFocus: 'Quantify everything using the Google XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]". Highlight algorithmic optimization and distributed scale.'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tier: 'Tier 1 Tech',
    description: 'Values customer obsession, bias for action, deep dive capability, and ability to build scalable cloud-native architectures.',
    mustHaveSkills: [
      'Object Oriented Design',
      'Data Structures',
      'AWS Services (S3, DynamoDB, Lambda, EC2)',
      'Java or C++',
      'REST APIs',
      'Microservices Architecture',
      'SQL / NoSQL'
    ],
    goodToHaveSkills: [
      'Docker',
      'CI/CD Pipelines',
      'Kafka / SQS',
      'Event-Driven Architecture',
      'CloudWatch',
      'Unit Testing & TDD'
    ],
    keyAttributes: [
      '16 Leadership Principles (Customer Obsession, Deliver Results, Earn Trust)',
      'STAR method for all behavioral stories',
      'Pragmatic trade-off analysis',
      'Metrics-driven project impact'
    ],
    cultureHighlights: 'Frugality, rapid delivery, and writing clean maintainable code. Interviewers test your past conflict resolution and ownership.',
    recommendedResumeFocus: 'Ensure every bullet point includes tangible customer or operational impact (e.g. reduced latency by 35%, saved 40 dev hours/week). Align projects with AWS tech.'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tier: 'Tier 1 Tech',
    description: 'Emphasizes a Growth Mindset, platform thinking, inclusive engineering, enterprise software reliability, and cloud solutions (Azure).',
    mustHaveSkills: [
      'Data Structures & Algorithms',
      'C# / .NET or C++ or Java',
      'TypeScript / React',
      'Azure or Cloud Basics',
      'Operating Systems & Multithreading',
      'Object-Oriented Programming'
    ],
    goodToHaveSkills: [
      'CI/CD',
      'Git Workflows',
      'SQL Server',
      'Distributed Caching (Redis)',
      'Cross-Platform Development'
    ],
    keyAttributes: [
      'Growth Mindset (Learning from failure)',
      'Empathy and team collaboration',
      'Clean modular architecture',
      'System resilience and fault tolerance'
    ],
    cultureHighlights: 'Focuses on candidates who admit what they do not know, embrace continuous learning, and build products for global accessibility.',
    recommendedResumeFocus: 'Emphasize end-to-end full-stack or system reliability projects. Highlight automated testing, code modularity, and cross-team collaboration.'
  },
  {
    id: 'goldman_sachs',
    name: 'Goldman Sachs',
    tier: 'FinTech / Unicorn',
    description: 'High emphasis on mathematical rigor, data structures, low-latency execution, relational database optimization, and analytical reasoning.',
    mustHaveSkills: [
      'Data Structures & Algorithms',
      'Core Java or C++',
      'Relational Databases (PostgreSQL / MySQL)',
      'Multithreading & Concurrency',
      'Time Complexity Analysis',
      'Quantitative & Logical Aptitude'
    ],
    goodToHaveSkills: [
      'Spring Boot',
      'Kafka',
      'Financial Markets Basics',
      'Linux Shell Scripting',
      'Microservices'
    ],
    keyAttributes: [
      'Precision and attention to detail',
      'High-pressure problem solving',
      'Understanding of ACID properties and transactions',
      'Strong quantitative aptitude'
    ],
    cultureHighlights: 'Meritocracy, high velocity, client delivery, and adherence to security and regulatory compliance.',
    recommendedResumeFocus: 'Highlight academic excellence, quantitative achievements, hackathon rank, and high-performance backend systems with transactional reliability.'
  },
  {
    id: 'tcs',
    name: 'TCS (Digital / Prime / Ninja)',
    tier: 'Service MNC',
    description: 'Large-scale recruitment platform testing aptitude speed, core computer science concepts (DBMS, OS, Networks), and full-stack development skills.',
    mustHaveSkills: [
      'Quantitative Aptitude & Reasoning',
      'C, Java or Python fundamentals',
      'SQL Queries & Normalization',
      'OOP Concepts (Inheritance, Polymorphism)',
      'Basic Data Structures (Arrays, Linked Lists, Stacks)'
    ],
    goodToHaveSkills: [
      'Web Development (HTML, CSS, JS)',
      'Cloud Foundations (AWS/Azure)',
      'Git',
      'Basic Machine Learning / AI awareness'
    ],
    keyAttributes: [
      'Adaptability to new technologies',
      'Strong verbal and written English communication',
      'Quick aptitude calculations',
      'Academic consistency'
    ],
    cultureHighlights: 'Values reliability, continuous training capability, willingness to work across global client shifts, and solid basics.',
    recommendedResumeFocus: 'Clearly list your CGPA, key certifications (AWS/Azure/Java), final-year capstone project, and strong foundational technical competencies.'
  },
  {
    id: 'infosys',
    name: 'Infosys (SP / DSE / SE)',
    tier: 'Service MNC',
    description: 'Specialist Programmer (SP) and Digital Specialist Engineer (DSE) roles require hard competitive programming skills (DP, Graphs, Greedy).',
    mustHaveSkills: [
      'Competitive Programming (Dynamic Programming, Graphs, Bit Manipulation)',
      'Java or Python or C++',
      'DBMS and SQL',
      'Problem Solving Speed',
      'Aptitude & Verbal Ability'
    ],
    goodToHaveSkills: [
      'Spring Boot or Django',
      'React / Angular',
      'Cloud computing',
      'CodeChef / LeetCode ratings'
    ],
    keyAttributes: [
      'Competitive coding speed and edge case coverage',
      'Analytical reasoning under time limits',
      'Polite and professional demeanor'
    ],
    cultureHighlights: 'Focuses on strong competitive programming foundation for high-package roles (SP @ 9.5 LPA, DSE @ 6.25 LPA).',
    recommendedResumeFocus: 'Showcase your LeetCode / Codeforces / CodeChef profile handles, contest ratings, and clean algorithmic problem-solving track record.'
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    tier: 'Tier 1 Tech',
    description: 'Famous for Jira, Confluence, and Trello. Emphasizes clean code, pairing interviews, system design for collaborative tools, and open culture values.',
    mustHaveSkills: [
      'React / TypeScript',
      'Java / Kotlin / Node.js',
      'Data Structures & Algorithms',
      'System Design (Distributed messaging, WebSockets)',
      'Clean Code & Refactoring'
    ],
    goodToHaveSkills: [
      'GraphQL',
      'AWS / Kubernetes',
      'Unit & Integration Testing (Jest/JUnit)',
      'Event-Driven Architecture'
    ],
    keyAttributes: [
      'Open company, no bullshit value alignment',
      'Pair programming empathy and active listening',
      'Modularity and separation of concerns'
    ],
    cultureHighlights: 'Teamwork first! Interviewers assess whether you write readable code and take feedback positively during paired rounds.',
    recommendedResumeFocus: 'Highlight modern full-stack projects featuring real-time collaboration (WebSockets), responsive web architecture, and clean test coverage.'
  },
  {
    id: 'tech_startup',
    name: 'High-Growth Tech Startup',
    tier: 'Product Startup',
    description: 'Startups like Razorpay, Swiggy, Zerodha, and CRED value fast execution, production deployment experience, self-driven hacking, and product sense.',
    mustHaveSkills: [
      'Full-Stack Development (React/Next.js + Node.js/Go/Python)',
      'PostgreSQL / Redis / MongoDB',
      'Git & CI/CD Deployment (Vercel, AWS, Render)',
      'REST / GraphQL APIs',
      'Problem Solving'
    ],
    goodToHaveSkills: [
      'Tailwind CSS',
      'Docker',
      'WebSockets',
      'Payment Gateway Integration',
      'System Monitoring / Sentry'
    ],
    keyAttributes: [
      'Hacker mentality & high agency',
      'Speed of shipping production features',
      'Product intuition and empathy for user UX'
    ],
    cultureHighlights: 'Zero bureaucracy. They look for candidates who have deployed real side-projects with active users or open source stars.',
    recommendedResumeFocus: 'Provide live URLs for projects, GitHub repo links, highlight full-stack ownership, and metrics showing real user adoption or performance gains.'
  }
];
