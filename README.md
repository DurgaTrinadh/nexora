# 🚀 NEXORA - Next-Gen AI Placement Preparation Platform

> Built for the **iQOO Hackathon** | An all-in-one, buttery smooth, cyber-modern placement platform designed to take students from campus preparation to top-tier software engineering offers.

![NEXORA Banner](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Key Features & Capabilities

### 1. 🎙️ AI Mock Interview Studio
- **Speaking AI Interviewer Avatar**: Speaks interview questions aloud with real-time natural voice speech synthesis (`speechSynthesis`) and dynamic audio frequency visualizer waves.
- **Voice Speech-to-Text Recognition**: Speak your answer naturally using the Web Speech API (`webkitSpeechRecognition`), transcribed in real time on screen (with manual typing fallback).
- **Multiple Interview Tracks**:
  - **HR & Behavioral** (Evaluated against the STAR method: *Situation, Task, Action, Result*)
  - **Technical SDE Core** (Hash maps, concurrency, OS threads vs processes, B+ trees, system scalability)
  - **System Design** (URL shorteners, distributed caching, microservices)
  - **Company-Specific Tracks** (Amazon Leadership Principles, Google Ambiguity, TCS campus rounds)
- **Instant Detailed Scorecard**:
  - Overall Score (0-100), Clarity Score, Technical Keyword Match %
  - Confidence Rating badge (*Exceptional, Strong, Average, Needs Practice*)
  - **Positives / Strong Points** in your response
  - **Negatives / Areas for Improvement & Missing Terminology**
  - **Sample Ideal Model Answer** comparison

---

### 2. 📝 Aptitude & Core CS Exam Portal (TCS iON / AMCAT Simulator)
- **Realistic Exam Interface**:
  - Countdown timer with visual warnings when time runs low.
  - Official **Question Palette** showing live status:
    - 🟢 **Green**: Answered
    - 🔴 **Red**: Not Answered
    - 🟣 **Purple**: Marked for Review & Next
    - ⚪ **Gray**: Not Visited
  - Number grid allowing instant jump to any question.
- **Rich Question Bank**:
  - **Quantitative Aptitude** (Time & Work, Profit & Loss, Speed & Distance, Probability, Permutations)
  - **Logical Reasoning** (Blood Relations, Syllogisms, Seating Arrangements, Coding-Decoding)
  - **Verbal Ability** (Sentence Correction, Synonyms/Antonyms, Para-jumbles, Idioms)
  - **Core Computer Science** (Operating Systems, DBMS Normalization & ACID, Computer Networks, OOP)
- **Comprehensive Step-by-Step Solutions**:
  - Detailed mathematical step-by-step solutions and conceptual formulas for every question upon submission.

---

### 3. 💻 DSA Preparation & Code Arena
- **Curated Topic Roadmaps**: Arrays & Hashing, Two Pointers, Linked Lists, Trees & Binary Search, Dynamic Programming, Graphs.
- **Difficulty & Company Badges**: Easy, Medium, Hard problems tagged with companies (*Google, Amazon, Microsoft, Goldman Sachs, Meta*).
- **Split-Screen Code Studio**:
  - **Left Pane**: Problem description, input/output examples, constraints, progressive hint accordion, and target Big-O time/space complexity guide.
  - **Right Pane**: Multi-language support (**JavaScript, Python, C++, Java**), custom test case runner, console output with Pass/Fail badges, runtime execution metrics (ms), and memory usage (MB).

---

### 4. 📋 Job Application Tracker (Kanban Pipeline)
- **Interactive Kanban Board**:
  - 6 recruitment stages: *Wishlist, Applied, Online Assessment, Interview Scheduled, Offer Received, Archived/Rejected*.
  - Move cards easily between stages or switch to **Table View**.
- **Application Conversion Funnel Analytics**:
  - Tracks total applications, OA shortlist rate, interview call percentage, and offers secured.
- **Curated 2026 - 2027 Off-Campus Drives Feed**:
  - Top new-grad hiring drives (*Uber, Razorpay, Salesforce, Swiggy*) with 1-click "Add to My Tracker".

---

### 5. 📄 Company-Specific Resume Analyzer & Positives/Negatives Engine
- **Target Company Selector**: Evaluates your resume against custom benchmarks for:
  - **Google** (Algorithmic rigor, scalability, Google XYZ formula)
  - **Amazon** (Customer obsession, metrics-driven leadership principles, AWS)
  - **Microsoft** (Growth mindset, clean architecture, Azure/cloud)
  - **Goldman Sachs** (Mathematical precision, transactional reliability, Java/C++)
  - **TCS & Infosys** (Core CS foundations, competitive programming, certifications)
  - **High-Growth Tech Startups** (Full-stack speed, live deployments)
- **1-Click Sample Resumes**:
  - Instant buttons to load a **High-Impact SDE Resume** or a **Weak Fresher Resume** for zero-friction judging and testing!
- **Diagnostics Output**:
  - **ATS Compatibility Match Meter (0 - 100)**
  - **Quantified Impact Score**: Identifies numerical data, metrics, and % speedups.
  - **Executive Action Verbs Score**: Flags strong engineering verbs vs passive phrasing.
  - **🟢 Positives & Strengths**: Key competitive advantages found in your resume.
  - **🔴 Negatives, Red Flags & Critical Gaps**: Specific missing skills, weak statements, lack of metrics.
  - **Company Skill Alignment**: Must-have skills found vs missing.
  - **Google XYZ Formula Rewrites**: Line-by-line concrete bullet before-and-after improvements.

---

### 6. 🤖 Nexora AI Chatbot & Floating Assistant
- **24/7 Dedicated Placement Mentor**:
  - Full-page assistant + global floating drawer widget accessible anywhere.
  - Instant guidance on STAR stories, company hiring processes, and salary negotiation.
  - Quick prompt pills for 1-click answers.
  - **Hybrid AI Engine**: Works 100% out of the box using built-in domain intelligence, with an optional setting to connect your free Google Gemini API key for live dynamic responses!

---

### 7. 🛡️ 100% Client-Side Persistent Architecture
- **Zero Backend Required**: All your data (test scores, interview history, DSA solutions, job applications, analyzed resumes, daily streak) automatically saves to browser `localStorage`.
- **Zero Server Costs & Instant Deploy**: Deploy in 1 click to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Dark glassmorphism theme, custom glow animations)
- **Icons**: Lucide React
- **Celebration**: Canvas-Confetti
- **Speech APIs**: Native Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)

---

## 🏁 Quick Start Guide

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run Local Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit `http://localhost:5173` in your browser.

### 3. Production Build
\`\`\`bash
npm run build
\`\`\`
Builds clean production assets to the `dist/` directory.

---

Built with passion for the **iQOO Hackathon**. Empowering every student to crack their dream placement! 🏆
