import { InterviewQuestion, InterviewScore, ChatMessage } from '../types';

export class AiAssistantService {
  // Built-in intelligent response engine for placement questions
  private static KNOWLEDGE_BASE: { keywords: string[]; answer: string; followUps: string[] }[] = [
    {
      keywords: ['star', 'method', 'behavioral', 'story'],
      answer: `### The STAR Method for Behavioral Interviews
When an interviewer asks *"Tell me about a time when..."*, structure your answer using **STAR**:
- **Situation (S)**: Set the scene in 1-2 sentences (Project, team size, timeline).
- **Task (T)**: What was the specific technical or organizational challenge/goal you were responsible for?
- **Action (A)**: This is **60% of your answer**. Describe the exact engineering decisions, tools, and collaboration you performed. Use *"I"*, not *"we"*.
- **Result (R)**: The quantifiable payoff! Mention metrics: *e.g., "Reduced latency by 40%", "Saved $12,000 in cloud compute", "Shipped 2 weeks early"*.`,
      followUps: ['Give me an example STAR story for a bug fix', 'How to handle questions about failure?']
    },
    {
      keywords: ['google', 'interview', 'process', 'tips'],
      answer: `### Cracking the Google Technical Interview
1. **Coding (DSA)**: Focus on clean code, optimal Big-O complexity (O(N) vs O(N log N)), edge cases (nulls, empty lists, duplicates), and test your code dry-run before saying you're finished.
2. **Googleyness**: Intellectual humility, collaborative spirit, doing the right thing, and handling ambiguity with curiosity.
3. **Communication**: Think out loud continuously! Explain *why* you chose a hash map over a two-pointer approach before typing code.`,
      followUps: ['What are typical Google coding questions?', 'How to demonstrate Googleyness?']
    },
    {
      keywords: ['amazon', 'leadership', 'principles', 'oa'],
      answer: `### Cracking Amazon SDE Interviews
- **The 16 Leadership Principles**: Amazon weighs LP behavioral questions at 50% of your total interview score.
- Top principles for SDE-1:
  - **Customer Obsession**: Always work backwards from what helps the customer.
  - **Ownership**: Never say "that wasn't my job".
  - **Bias for Action**: Speed matters in software. Calculated risk-taking beats analysis paralysis.
  - **Deliver Results**: Overcome obstacles and ship on schedule.
- In technical rounds, expect questions on Object-Oriented Design (OOD), Trees, Graphs, and Hash Maps.`,
      followUps: ['Give me an Amazon Customer Obsession example', 'What is asked in Amazon Online Assessment?']
    },
    {
      keywords: ['tcs', 'nqt', 'prime', 'digital', 'ninja'],
      answer: `### TCS NQT Placement Strategy
- **Exam Pattern**:
  1. **Foundation Section**: Numerical Ability, Reasoning, Verbal Ability (Speed is key!).
  2. **Advanced Section**: Advanced Quantitative, Advanced Coding (1 Easy problem + 1 Medium DP/Matrix problem).
- **Cutoffs & Packages**:
  - Top scorers get invited for **TCS Prime (₹9.0 LPA)** or **TCS Digital (₹7.5 LPA)** interviews!
  - Normal qualification leads to **TCS Ninja (₹3.6 LPA)**.
- **Interview Focus**: Core Java/C++, DBMS (SQL Joins, Normalization), Operating Systems (Paging, Deadlocks), and Final Year Project.`,
      followUps: ['Practice TCS NQT mock test now', 'What DBMS questions are asked in TCS?']
    },
    {
      keywords: ['resume', 'ats', 'tips', 'format'],
      answer: `### High-Converting Tech Resume Checklist
1. **Single-Page Rule**: Freshers and candidates with under 5 years of experience must fit everything on **one page**.
2. **Google XYZ Formula**: *"Accomplished [X], as measured by [Y], by doing [Z]"*.
3. **No Fluff**: Remove objectives like *"seeking an entry-level position..."* - replace with an impactful Technical Skills summary.
4. **Quantify Everything**: Add % speedups, request volumes, user counts, or database row counts.
5. **Clean ATS Formatting**: Standard single-column layout, standard fonts (Inter, Helvetica), and standard headers (Education, Skills, Experience, Projects, Honors).`,
      followUps: ['Analyze my resume now', 'What action verbs should I use?']
    },
    {
      keywords: ['salary', 'negotiation', 'ctc', 'offer'],
      answer: `### Tech Salary Negotiation Rules for Freshers
1. **Know the Band**: Research on levels.fyi and Glassdoor. Companies have fixed bands for campus hires, but off-campus offers can be negotiated.
2. **Focus on Total CTC & Base**: Base salary is what determines future hikes and EPF. Watch out for clawback bonuses or esop vesting schedules.
3. **Use Competing Offers**: The strongest leverage is a written offer from another company.
4. **Be Gracious & Professional**: Express genuine excitement about the role and team first before discussing compensation adjustment.`,
      followUps: ['How to ask for a joining bonus?', 'What is the difference between CTC and Base?']
    },
    {
      keywords: ['dsa', 'roadmap', 'study', 'plan'],
      answer: `### 60-Day Placement DSA Roadmap
- **Week 1-2**: Arrays, Strings, Hash Maps, Two Pointers (Two Sum, 3Sum, Valid Palindrome).
- **Week 3-4**: Linked Lists, Stacks & Queues (Valid Parentheses, Reverse Linked List).
- **Week 5-6**: Binary Trees, BFS, DFS, Binary Search Trees.
- **Week 7-8**: Graphs (Dijkstra, Topological Sort, Disjoint Set Union).
- **Week 9**: Dynamic Programming (0/1 Knapsack, Longest Common Subsequence, Coin Change).
- **Week 10**: Timed mock contests and company tagged sheets.`,
      followUps: ['Solve Two Sum problem', 'Explain Dynamic Programming simply']
    }
  ];

  // Answer placement chat queries
  public static async answerChatQuery(query: string, apiKey?: string): Promise<{ text: string; followUps: string[] }> {
    const qLower = query.toLowerCase().trim();

    // If API key is provided, try calling Gemini 1.5 / 2.0 API
    if (apiKey && apiKey.trim().length > 15) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are Nexora AI, an elite placement preparation mentor and tech career coach for engineering candidates. Give an inspiring, technically precise, structured markdown response with bullet points and code/examples where helpful. Query: ${query}`
              }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return {
              text: generatedText,
              followUps: ['Can you elaborate on this?', 'Give me a mock interview question on this topic', 'What do recruiters look for?']
            };
          }
        }
      } catch (err) {
        console.warn('Gemini API call fell back to local engine:', err);
      }
    }

    // Heuristic matching against domain knowledge base
    for (const item of this.KNOWLEDGE_BASE) {
      const match = item.keywords.some(k => qLower.includes(k));
      if (match) {
        return {
          text: item.answer,
          followUps: item.followUps
        };
      }
    }

    // Default high-value response
    return {
      text: `### Nexora AI Guidance on: "${query}"

Here are 3 core pillars to master this topic for your placement preparation:

1. **Foundational Concept**: Break down the problem into first principles. Make sure you understand the core mechanics and trade-offs before memorizing solutions.
2. **Industry Context**: Placement interviewers value practical understanding over textbook recitation. Connect this concept with real-world scale, performance, or system trade-offs.
3. **Interview Delivery**: Practice explaining this clearly using simple analogies, followed by technical terminology (e.g. Big-O, concurrency, memory overhead).

*Tip*: Explore our **DSA Playground**, take a **Mock Aptitude Test**, or run your resume through our **Company-Specific Resume Analyzer** for targeted diagnostics!`,
      followUps: ['How to answer "Tell me about yourself"?', 'Review Amazon Leadership Principles', 'Give me a DSA Roadmap']
    };
  }

  // Evaluate candidate's mock interview answer
  public static evaluateInterviewAnswer(question: InterviewQuestion, answer: string): InterviewScore {
    const trimmed = answer.trim();
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const answerLower = trimmed.toLowerCase();

    // 1. Keyword matching
    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    question.expectedKeywords.forEach(kw => {
      if (answerLower.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordRatio = question.expectedKeywords.length > 0 
      ? matchedKeywords.length / question.expectedKeywords.length 
      : 0.8;
    const keywordScore = Math.min(100, Math.round(keywordRatio * 100));

    // 2. Clarity & Depth based on length and structure
    let clarityScore = 50;
    if (wordCount >= 70) clarityScore = 95;
    else if (wordCount >= 45) clarityScore = 85;
    else if (wordCount >= 25) clarityScore = 72;
    else if (wordCount >= 10) clarityScore = 55;
    else clarityScore = 30;

    // 3. Overall calculation
    const overallScore = Math.min(100, Math.round((keywordScore * 0.55) + (clarityScore * 0.45)));

    // 4. Confidence rating
    let confidenceRating = 'Needs Practice';
    if (overallScore >= 85) confidenceRating = 'Exceptional';
    else if (overallScore >= 70) confidenceRating = 'Strong';
    else if (overallScore >= 50) confidenceRating = 'Average';

    // 5. Strengths (Pros)
    const pros: string[] = [];
    if (matchedKeywords.length >= 2) {
      pros.push(`Solid technical terminology used: incorporated key concepts like ${matchedKeywords.slice(0, 3).join(', ')}.`);
    }
    if (wordCount >= 40) {
      pros.push('Detailed, well-elaborated response demonstrating good communication depth.');
    }
    if (answerLower.includes('because') || answerLower.includes('result') || answerLower.includes('impact') || answerLower.includes('example')) {
      pros.push('Structured reasoning: supported claims with rationale or practical outcomes.');
    }
    if (pros.length === 0) {
      pros.push('Attempted the question directly under interview conditions.');
    }

    // 6. Areas for Improvement
    const improvements: string[] = [];
    if (missingKeywords.length > 0) {
      improvements.push(`Missing key terminology: Try integrating ${missingKeywords.slice(0, 3).join(', ')} to signal mastery.`);
    }
    if (wordCount < 35) {
      improvements.push('Response was relatively brief. Aim for at least 60-90 seconds (approx. 60-100 words) of structured elaboration.');
    }
    if (question.category === 'hr_behavioral' && !answerLower.includes('result') && !answerLower.includes('measured')) {
      improvements.push('Remember to state the final quantifiable result (STAR method: Situation, Task, Action, Result).');
    }

    return {
      clarityScore,
      keywordScore,
      overallScore,
      confidenceRating,
      pros,
      improvements,
      transcribedAnswer: trimmed || '(No response recorded)',
      idealResponse: question.suggestedAnswer
    };
  }
}
