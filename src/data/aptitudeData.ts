import { AptitudeQuestion, AptitudeDomain } from '../types';

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  // --- QUANTITATIVE APTITUDE ---
  {
    id: 'quant-1',
    domain: 'quantitative',
    topic: 'Time and Work',
    difficulty: 'Easy',
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together, in how many days will the work be completed?',
    options: ['7.2 days', '6.5 days', '8.0 days', '5.4 days'],
    correctIndex: 0,
    explanation: 'A\'s 1-day work = 1/12. B\'s 1-day work = 1/18. Together in 1 day = 1/12 + 1/18 = (3 + 2)/36 = 5/36. Therefore, total days required = 36/5 = 7.2 days.'
  },
  {
    id: 'quant-2',
    domain: 'quantitative',
    topic: 'Profit and Loss',
    difficulty: 'Medium',
    question: 'A shopkeeper marks his goods at 30% above the cost price and allows a discount of 15% on the marked price. What is his net profit percentage?',
    options: ['10.5%', '12.5%', '15.0%', '8.5%'],
    correctIndex: 0,
    explanation: 'Let Cost Price (CP) = 100. Marked Price (MP) = 100 + 30 = 130. Discount = 15% of 130 = 19.5. Selling Price (SP) = 130 - 19.5 = 110.5. Net Profit % = ((110.5 - 100) / 100) * 100 = 10.5%.'
  },
  {
    id: 'quant-3',
    domain: 'quantitative',
    topic: 'Time, Speed and Distance',
    difficulty: 'Medium',
    question: 'A train 180 meters long is traveling at a speed of 54 km/h. How many seconds will it take to pass an electric pole?',
    options: ['10 seconds', '12 seconds', '15 seconds', '8 seconds'],
    correctIndex: 1,
    explanation: 'Speed in m/s = 54 * (5/18) = 15 m/s. Distance to cover = length of train = 180 m. Time = Distance / Speed = 180 / 15 = 12 seconds.'
  },
  {
    id: 'quant-4',
    domain: 'quantitative',
    topic: 'Permutations & Combinations',
    difficulty: 'Hard',
    question: 'In how many different ways can the letters of the word "LEADING" be arranged such that the vowels always come together?',
    options: ['360', '720', '5040', '2880'],
    correctIndex: 1,
    explanation: 'Vowels in LEADING are E, A, I (3 vowels). Consonants are L, D, N, G (4 consonants). Treat the 3 vowels as one single unit. We now have 4 consonants + 1 group = 5 entities, which can be arranged in 5! = 120 ways. The 3 vowels among themselves can be arranged in 3! = 6 ways. Total arrangements = 120 * 6 = 720 ways.'
  },
  {
    id: 'quant-5',
    domain: 'quantitative',
    topic: 'Percentages',
    difficulty: 'Easy',
    question: 'If the price of petrol increases by 25%, by what percentage must a car owner reduce consumption so that his expenditure remains unchanged?',
    options: ['20%', '25%', '16.67%', '33.33%'],
    correctIndex: 0,
    explanation: 'Using formula: [R / (100 + R)] * 100 = [25 / (100 + 25)] * 100 = (25 / 125) * 100 = 20% reduction.'
  },
  {
    id: 'quant-6',
    domain: 'quantitative',
    topic: 'Pipes and Cisterns',
    difficulty: 'Medium',
    question: 'Pipe A can fill a tank in 6 hours, while pipe B can empty it in 8 hours. If both pipes are opened simultaneously, in how many hours will the empty tank be filled completely?',
    options: ['18 hours', '24 hours', '12 hours', '30 hours'],
    correctIndex: 1,
    explanation: 'Net filling rate per hour = (1/6) - (1/8) = (4 - 3)/24 = 1/24. Thus, it will take 24 hours to fill the tank.'
  },
  {
    id: 'quant-7',
    domain: 'quantitative',
    topic: 'Probability',
    difficulty: 'Hard',
    question: 'Two dice are rolled together. What is the probability that the sum of the numbers appearing on both dice is a prime number?',
    options: ['5/12', '7/18', '15/36', '11/36'],
    correctIndex: 0,
    explanation: 'Total outcomes = 6 * 6 = 36. Possible prime sums are 2, 3, 5, 7, 11.\nSum 2: (1,1) -> 1\nSum 3: (1,2),(2,1) -> 2\nSum 5: (1,4),(2,3),(3,2),(4,1) -> 4\nSum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) -> 6\nSum 11: (5,6),(6,5) -> 2\nTotal favorable = 1 + 2 + 4 + 6 + 2 = 15. Probability = 15/36 = 5/12.'
  },

  // --- LOGICAL REASONING ---
  {
    id: 'logic-1',
    domain: 'logical',
    topic: 'Blood Relations',
    difficulty: 'Medium',
    question: 'Pointing to a photograph, Rohit said, "She is the daughter of the only son of my grandfather." How is the girl in the photograph related to Rohit?',
    options: ['Mother', 'Sister', 'Cousin', 'Aunt'],
    correctIndex: 1,
    explanation: 'The "only son of Rohit\'s grandfather" is Rohit\'s father. The daughter of Rohit\'s father is Rohit\'s sister.'
  },
  {
    id: 'logic-2',
    domain: 'logical',
    topic: 'Syllogisms',
    difficulty: 'Medium',
    question: 'Statements:\n1. All cars are vehicles.\n2. All vehicles are machines.\nConclusions:\nI. All cars are machines.\nII. Some machines are cars.\nWhich of the conclusions follow?',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Neither I nor II follows', 'Both I and II follow'],
    correctIndex: 3,
    explanation: 'Since Cars ⊆ Vehicles ⊆ Machines, All cars are machines (I is true). Also, the intersection of machines and cars is non-empty, so Some machines are cars (II is true). Both follow.'
  },
  {
    id: 'logic-3',
    domain: 'logical',
    topic: 'Number Series',
    difficulty: 'Easy',
    question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: ['127', '125', '120', '95'],
    correctIndex: 0,
    explanation: 'Pattern: Each term is (previous term * 2) + 1. Or differences: +4, +8, +16, +32, so next is +64. 63 + 64 = 127.'
  },
  {
    id: 'logic-4',
    domain: 'logical',
    topic: 'Coding-Decoding',
    difficulty: 'Medium',
    question: 'In a certain code, "CLOUD" is written as "DMPVE". How will "SMILE" be written in that code?',
    options: ['TNJMF', 'TNIMF', 'TNLMF', 'SNJMF'],
    correctIndex: 0,
    explanation: 'Each letter is shifted forward by 1: C->D, L->M, O->P, U->V, D->E. Therefore S->T, M->N, I->J, L->M, E->F => "TNJMF".'
  },
  {
    id: 'logic-5',
    domain: 'logical',
    topic: 'Direction Sense',
    difficulty: 'Easy',
    question: 'A person walks 10 meters North, turns right and walks 6 meters, then turns right again and walks 10 meters. In which direction and how far is he from his starting point?',
    options: ['6 meters East', '6 meters West', '10 meters East', '10 meters South'],
    correctIndex: 0,
    explanation: 'Starting at (0,0): 10m North -> (0,10). 6m East -> (6,10). 10m South -> (6,0). He is exactly 6 meters East of the starting point.'
  },
  {
    id: 'logic-6',
    domain: 'logical',
    topic: 'Seating Arrangement',
    difficulty: 'Hard',
    question: 'Six friends A, B, C, D, E, F are sitting in a circle facing the center. B is between F and C. A is between E and D. F is to the left of D. Who is sitting opposite to A?',
    options: ['B', 'C', 'F', 'E'],
    correctIndex: 0,
    explanation: 'Placing them in order: D is followed to its left by F, then B, then C, then E, then A. In a 6-seat circle, opposite to A (index 0) is index 3, which is B.'
  },

  // --- VERBAL ABILITY ---
  {
    id: 'verb-1',
    domain: 'verbal',
    topic: 'Sentence Correction',
    difficulty: 'Medium',
    question: 'Identify the grammatically correct sentence:',
    options: [
      'Neither the manager nor the employees was present at the conference.',
      'Neither the manager nor the employees were present at the conference.',
      'Neither the manager or the employees was present at the conference.',
      'Neither the manager and the employees were present at the conference.'
    ],
    correctIndex: 1,
    explanation: 'When subjects are joined by "neither... nor", the verb agrees with the closer subject ("employees", which is plural), so "were" is correct.'
  },
  {
    id: 'verb-2',
    domain: 'verbal',
    topic: 'Vocabulary & Synonyms',
    difficulty: 'Easy',
    question: 'Choose the word that is most nearly SYNONYMOUS in meaning to "CANDID":',
    options: ['Deceptive', 'Frank', 'Secretive', 'Timid'],
    correctIndex: 1,
    explanation: '"Candid" means truthful, straightforward, and frank.'
  },
  {
    id: 'verb-3',
    domain: 'verbal',
    topic: 'Vocabulary & Antonyms',
    difficulty: 'Easy',
    question: 'Choose the word that is most OPPOSITE in meaning to "METICULOUS":',
    options: ['Careless', 'Diligent', 'Precise', 'Fastidious'],
    correctIndex: 0,
    explanation: '"Meticulous" means showing great attention to detail and precision. Its exact opposite is "Careless".'
  },
  {
    id: 'verb-4',
    domain: 'verbal',
    topic: 'Idioms and Phrases',
    difficulty: 'Medium',
    question: 'What is the meaning of the idiom "Bite the bullet"?',
    options: [
      'To eat aggressively',
      'To endure a painful or difficult situation with courage',
      'To make an irreversible mistake',
      'To act hastily without preparation'
    ],
    correctIndex: 1,
    explanation: '"Bite the bullet" means to face a difficult or unpleasant situation with courage and fortitude.'
  },
  {
    id: 'verb-5',
    domain: 'verbal',
    topic: 'Para Jumbles',
    difficulty: 'Hard',
    question: 'Arrange the sentences in logical order:\nP: It has revolutionized communication across the globe.\nQ: The internet is arguably the most transformative invention of the modern era.\nR: Today, billions of people rely on it daily for work and education.\nS: Furthermore, it continues to foster innovation across all sectors.',
    options: ['Q - P - R - S', 'P - Q - S - R', 'Q - R - P - S', 'R - Q - P - S'],
    correctIndex: 0,
    explanation: 'Q introduces the central topic (the internet). P explains its primary revolution (communication). R brings it to present-day daily usage. S concludes with the forward-looking "Furthermore" on ongoing innovation. Order: Q-P-R-S.'
  },

  // --- CORE COMPUTER SCIENCE (OS, DBMS, CN, OOP) ---
  {
    id: 'cs-1',
    domain: 'core_cs',
    topic: 'Operating Systems',
    difficulty: 'Medium',
    question: 'Which of the following is NOT one of Coffman\'s four necessary conditions for a Deadlock to occur?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemption allowed',
      'Circular Wait'
    ],
    correctIndex: 2,
    explanation: 'The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. "Preemption allowed" actually breaks deadlock, not causes it.'
  },
  {
    id: 'cs-2',
    domain: 'core_cs',
    topic: 'Database Management Systems',
    difficulty: 'Medium',
    question: 'Which normal form guarantees that every non-key attribute is non-transitively dependent on every candidate key?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'BCNF'],
    correctIndex: 2,
    explanation: '3NF requires that the table is in 2NF and has no transitive functional dependencies (i.e. non-prime attributes should not depend on other non-prime attributes).'
  },
  {
    id: 'cs-3',
    domain: 'core_cs',
    topic: 'Computer Networks',
    difficulty: 'Easy',
    question: 'In the OSI model, at which layer do TCP and UDP protocols operate?',
    options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Session Layer'],
    correctIndex: 1,
    explanation: 'TCP and UDP are Transport Layer (Layer 4) protocols responsible for end-to-end communication, reliability, and port multiplexing.'
  },
  {
    id: 'cs-4',
    domain: 'core_cs',
    topic: 'Object Oriented Programming',
    difficulty: 'Easy',
    question: 'Which OOP principle is demonstrated when a subclass provides a specific implementation of a method that is already defined in its superclass?',
    options: ['Method Overloading', 'Method Overriding', 'Encapsulation', 'Abstraction'],
    correctIndex: 1,
    explanation: 'Method Overriding allows a subclass to provide a specific implementation of a method that is already provided by one of its superclasses (runtime polymorphism).'
  },
  {
    id: 'cs-5',
    domain: 'core_cs',
    topic: 'Operating Systems',
    difficulty: 'Hard',
    question: 'In Virtual Memory management, what condition is known as "Thrashing"?',
    options: [
      'When the CPU spends more time paging than executing processes',
      'When cache memory is completely cleared on context switch',
      'When a deadlock occurs between kernel threads',
      'When disk read/write bandwidth exceeds RAM bus capacity'
    ],
    correctIndex: 0,
    explanation: 'Thrashing occurs when a computer\'s virtual memory resources are overused, causing the system to spend more time swapping pages in and out than actually executing user instructions, causing performance to plummet.'
  },
  {
    id: 'cs-6',
    domain: 'core_cs',
    topic: 'DBMS',
    difficulty: 'Medium',
    question: 'What does the "I" stand for in the ACID properties of database transactions?',
    options: ['Integrity', 'Isolation', 'Inheritance', 'Idempotency'],
    correctIndex: 1,
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation ensures that concurrent execution of transactions leaves the database in the same state as if transactions were executed sequentially.'
  },
  {
    id: 'cs-7',
    domain: 'core_cs',
    topic: 'Computer Networks',
    difficulty: 'Medium',
    question: 'What is the purpose of the Address Resolution Protocol (ARP)?',
    options: [
      'To map an IP address (logical) to a MAC address (physical)',
      'To map a domain name to an IP address',
      'To route packets between different subnets',
      'To encrypt data at the network layer'
    ],
    correctIndex: 0,
    explanation: 'ARP is used to dynamically discover the MAC address (Layer 2) corresponding to a known IPv4 address (Layer 3) on a local network.'
  },
  {
    id: 'cs-8',
    domain: 'core_cs',
    topic: 'Object Oriented Programming',
    difficulty: 'Medium',
    question: 'What is the key difference between an Abstract Class and an Interface in modern Java/C++?',
    options: [
      'An abstract class can maintain state (instance fields), whereas an interface cannot have state',
      'Interfaces can only have static methods',
      'Abstract classes cannot have any concrete methods',
      'A class can inherit multiple abstract classes in Java'
    ],
    correctIndex: 0,
    explanation: 'An abstract class can have constructors, instance fields (state), and method implementations, whereas an interface is a pure contract that cannot hold instance state (though it can have constants and default methods in Java 8+).'
  }
];

export const PRESET_MOCK_EXAMS = [
  {
    id: 'tcs-nqt-mock',
    title: 'TCS NQT Full Placement Mock',
    company: 'TCS',
    durationMinutes: 30,
    totalQuestions: 15,
    domains: ['quantitative', 'logical', 'verbal', 'core_cs'] as AptitudeDomain[],
    description: 'Simulates the exact pattern of TCS National Qualifier Test (Foundation + Advanced sections).'
  },
  {
    id: 'tech-giant-aptitude',
    title: 'Tier-1 Technical Aptitude (Amazon / Google OA)',
    company: 'Amazon / Tech',
    durationMinutes: 25,
    totalQuestions: 12,
    domains: ['logical', 'core_cs', 'quantitative'] as AptitudeDomain[],
    description: 'High-speed problem-solving combining algorithm logic, probability, and core OS/DBMS.'
  },
  {
    id: 'core-cs-fundamentals',
    title: 'Core CS Gateway Exam (OS, DBMS, CN, OOP)',
    company: 'All Companies',
    durationMinutes: 20,
    totalQuestions: 10,
    domains: ['core_cs'] as AptitudeDomain[],
    description: 'Essential core computer science fundamentals asked in campus technical rounds.'
  }
];
