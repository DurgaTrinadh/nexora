import pptxgen from 'pptxgenjs';
import path from 'path';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Durga Trinadh';
pptx.company = 'NEXORA';
pptx.title = 'NEXORA - iQOO Hackathon Presentation Deck';

// Palette
const BG_DARK = '080C15';
const CARD_BG = '111827';
const BRAND_PURPLE = '8B5CF6';
const BRAND_CYAN = '06B6D4';
const BRAND_EMERALD = '10B981';
const TEXT_WHITE = 'FFFFFF';
const TEXT_MUTED = '94A3B8';
const ACCENT_ROSE = 'F43F5E';
const ACCENT_AMBER = 'F59E0B';

// Helper for slides
function addSlideHeader(slide, category, title) {
  slide.background = { color: BG_DARK };
  
  // Category pill
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.5,
    w: 5.0,
    h: 0.3,
    fontSize: 10,
    bold: true,
    color: BRAND_CYAN,
    fontFace: 'Arial'
  });

  // Title
  slide.addText(title, {
    x: 0.8,
    y: 0.8,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: TEXT_WHITE,
    fontFace: 'Arial'
  });
}

// ==================== SLIDE 1: COVER ====================
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  // Tag
  slide.addText('iQOO HACKATHON PHASE 1 SUBMISSION', {
    x: 0.8,
    y: 1.2,
    w: 6.0,
    h: 0.4,
    fontSize: 11,
    bold: true,
    color: BRAND_PURPLE,
    fontFace: 'Arial'
  });

  // Main Title
  slide.addText('NEXORA', {
    x: 0.8,
    y: 1.6,
    w: 11.5,
    h: 1.2,
    fontSize: 54,
    bold: true,
    color: TEXT_WHITE,
    fontFace: 'Arial'
  });

  // Subtitle
  slide.addText('Next-Gen AI Placement Preparation & Career Readiness Suite', {
    x: 0.8,
    y: 2.8,
    w: 11.0,
    h: 0.6,
    fontSize: 20,
    color: BRAND_CYAN,
    fontFace: 'Arial'
  });

  // Description
  slide.addText(
    'An all-in-one platform integrating voice-enabled mock interviews, company-specific resume diagnostics, official TCS iON / AMCAT pattern aptitude exams, and real-time DSA code execution.',
    {
      x: 0.8,
      y: 3.6,
      w: 10.5,
      h: 1.0,
      fontSize: 14,
      color: TEXT_MUTED,
      fontFace: 'Arial'
    }
  );

  // Footer / Presenter Info Box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: 5.4,
    w: 11.7,
    h: 1.3,
    fill: { color: CARD_BG },
    line: { color: '1E293B', width: 1 }
  });

  slide.addText('Presented by: Durga Trinadh (Team NEXORA)', {
    x: 1.1,
    y: 5.6,
    w: 5.0,
    h: 0.4,
    fontSize: 12,
    bold: true,
    color: TEXT_WHITE,
    fontFace: 'Arial'
  });

  slide.addText('Live Demo: https://nexora-nine-ruddy.vercel.app', {
    x: 1.1,
    y: 6.1,
    w: 5.5,
    h: 0.35,
    fontSize: 11,
    color: BRAND_CYAN,
    fontFace: 'Courier New'
  });

  slide.addText('GitHub: https://github.com/DurgaTrinadh/nexora', {
    x: 7.0,
    y: 6.1,
    w: 5.2,
    h: 0.35,
    fontSize: 11,
    color: BRAND_PURPLE,
    fontFace: 'Courier New'
  });
}

// ==================== SLIDE 2: PROBLEM STATEMENT ====================
{
  const slide = pptx.addSlide();
  addSlideHeader(slide, 'Problem Statement', 'The Fragmented & High-Friction Placement Journey');

  slide.addText('Over 1.5M Indian engineering students face 4 major bottlenecks during campus recruitment:', {
    x: 0.8,
    y: 1.5,
    w: 11.5,
    h: 0.4,
    fontSize: 13,
    color: TEXT_MUTED,
    fontFace: 'Arial'
  });

  const cards = [
    {
      num: '01',
      title: 'Fragmented Tools',
      desc: 'Students juggle 5-6 disconnected sites: LeetCode for DSA, Indiabix for Aptitude, Notion for job tracking, and Docs for resumes.',
      color: ACCENT_ROSE
    },
    {
      num: '02',
      title: 'No Voice Practice',
      desc: 'Students solve algorithms on paper, but freeze in live interviews due to lack of speaking confidence and STAR-method structure.',
      color: ACCENT_AMBER
    },
    {
      num: '03',
      title: 'Blind ATS Rejections',
      desc: 'Candidates submit identical generic resumes to Google and TCS without knowing company-specific keywords, metrics, or red flags.',
      color: BRAND_PURPLE
    },
    {
      num: '04',
      title: 'Unrealistic Exams',
      desc: 'Standard practice apps lack real exam environments like TCS iON / AMCAT countdown timers, question palettes, and solutions.',
      color: BRAND_CYAN
    }
  ];

  cards.forEach((c, idx) => {
    const x = 0.8 + idx * 2.95;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x,
      y: 2.2,
      w: 2.8,
      h: 4.2,
      fill: { color: CARD_BG },
      line: { color: c.color, width: 1.5 }
    });

    slide.addText(c.num, {
      x: x + 0.2,
      y: 2.4,
      w: 1.0,
      h: 0.4,
      fontSize: 18,
      bold: true,
      color: c.color,
      fontFace: 'Arial'
    });

    slide.addText(c.title, {
      x: x + 0.2,
      y: 3.0,
      w: 2.4,
      h: 0.5,
      fontSize: 14,
      bold: true,
      color: TEXT_WHITE,
      fontFace: 'Arial'
    });

    slide.addText(c.desc, {
      x: x + 0.2,
      y: 3.6,
      w: 2.4,
      h: 2.5,
      fontSize: 11,
      color: TEXT_MUTED,
      fontFace: 'Arial'
    });
  });
}

// ==================== SLIDE 3: SOLUTION (5 PILLARS) ====================
{
  const slide = pptx.addSlide();
  addSlideHeader(slide, 'Our Solution', 'Introducing NEXORA: The All-In-One Unified Placement Suite');

  const pillars = [
    {
      title: '🎙️ AI Voice Mock Interviews',
      desc: 'Speaking avatar with natural speech synthesis + real-time microphone transcription. Delivers instant STAR scorecards and ideal answer comparisons.'
    },
    {
      title: '📝 TCS iON / AMCAT Exam Portal',
      desc: 'Real exam portal with countdown timer, official question palette (Answered, Marked for Review), and complete step-by-step mathematical explanations.'
    },
    {
      title: '📄 Company Resume Analyzer',
      desc: 'Evaluates resumes specifically for Google, Amazon, TCS, etc. Delivers ATS match score, Positives/Negatives, and Google XYZ formula rewrites.'
    },
    {
      title: '💻 DSA Code Arena & Runner',
      desc: 'Multi-language code editor (JavaScript, Python, C++, Java) with sandboxed test case execution, complexity guide, and company-tagged roadmaps.'
    },
    {
      title: '📋 Kanban Job Application Tracker',
      desc: '6 recruitment stages (Wishlist, Applied, OA, Interview, Offer, Rejected) with conversion funnel metrics and curated 2026/2027 off-campus drives.'
    },
    {
      title: '🤖 24/7 Nexora AI Career Mentor',
      desc: 'Full-page assistant + global floating widget for continuous placement guidance, salary negotiation tips, and optional Gemini 1.5 API integration.'
    }
  ];

  pillars.forEach((p, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.8 + col * 3.95;
    const y = 1.7 + row * 2.5;

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x,
      y,
      w: 3.75,
      h: 2.2,
      fill: { color: CARD_BG },
      line: { color: '1E293B', width: 1 }
    });

    slide.addText(p.title, {
      x: x + 0.2,
      y: y + 0.2,
      w: 3.35,
      h: 0.4,
      fontSize: 13,
      bold: true,
      color: TEXT_WHITE,
      fontFace: 'Arial'
    });

    slide.addText(p.desc, {
      x: x + 0.2,
      y: y + 0.7,
      w: 3.35,
      h: 1.3,
      fontSize: 11,
      color: TEXT_MUTED,
      fontFace: 'Arial'
    });
  });
}

// ==================== SLIDE 4: ARCHITECTURE ====================
{
  const slide = pptx.addSlide();
  addSlideHeader(slide, 'Technical Architecture', 'High-Performance, Zero-Downtime Client Architecture');

  // Left Box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: 1.7,
    w: 5.7,
    h: 4.8,
    fill: { color: CARD_BG },
    line: { color: BRAND_CYAN, width: 1.5 }
  });

  slide.addText('Client-Side Engine & Performance', {
    x: 1.1,
    y: 2.0,
    w: 5.1,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: BRAND_CYAN,
    fontFace: 'Arial'
  });

  const clientPoints = [
    '• React 18 + Vite + TypeScript: Sub-second hot reloading, strict type safety, zero compile runtime overhead.',
    '• Native Web Speech API: Real-time speech recognition (webkitSpeechRecognition) and natural voice synthesis without external API costs.',
    '• LocalStorage State Persistence: Solved DSA problems, test scores, interview scorecards, and job cards persist across browser reloads.',
    '• Tailwind CSS Design System: Cyber-modern dark glassmorphism with responsive layouts across mobile, tablet, and desktop.'
  ];

  slide.addText(clientPoints.join('\n\n'), {
    x: 1.1,
    y: 2.6,
    w: 5.1,
    h: 3.6,
    fontSize: 12,
    color: TEXT_MUTED,
    fontFace: 'Arial'
  });

  // Right Box
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8,
    y: 1.7,
    w: 5.7,
    h: 4.8,
    fill: { color: CARD_BG },
    line: { color: BRAND_PURPLE, width: 1.5 }
  });

  slide.addText('Hybrid AI & Domain Intelligence', {
    x: 7.1,
    y: 2.0,
    w: 5.1,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: BRAND_PURPLE,
    fontFace: 'Arial'
  });

  const aiPoints = [
    '• Heuristic Evaluation Engine: Pre-loaded with company profiles for Google, Amazon, Microsoft, TCS, and startups (works 100% offline).',
    '• Dynamic Readiness Index: Weighted algorithmic calculation: DSA Solved (30%), Aptitude Accuracy (25%), Mock Interviews (25%), Resume Match (20%).',
    '• Google XYZ Formula Rewrites: Parses weak statements and generates high-impact quantified bullet points automatically.',
    '• Optional Gemini 1.5 API: Candidate can optionally plug in their free Google Gemini key for live dynamic responses.'
  ];

  slide.addText(aiPoints.join('\n\n'), {
    x: 7.1,
    y: 2.6,
    w: 5.1,
    h: 3.6,
    fontSize: 12,
    color: TEXT_MUTED,
    fontFace: 'Arial'
  });
}

// ==================== SLIDE 5: LIVE VERIFICATION ====================
{
  const slide = pptx.addSlide();
  addSlideHeader(slide, 'Verification & Deployment', 'Production Live & Ready for Hackathon Judging');

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5,
    y: 1.8,
    w: 8.3,
    h: 4.6,
    fill: { color: CARD_BG },
    line: { color: BRAND_EMERALD, width: 2 }
  });

  slide.addText('🏆 STATUS: 100% PRODUCTION READY', {
    x: 2.8,
    y: 2.1,
    w: 7.7,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: BRAND_EMERALD,
    align: 'center',
    fontFace: 'Arial'
  });

  const linksText = [
    'Production Live URL:  https://nexora-nine-ruddy.vercel.app',
    'GitHub Repository:    https://github.com/DurgaTrinadh/nexora',
    'Build Status:         Compiled with 0 errors in 15 seconds on Vercel',
    'Persistence:          100% LocalStorage Saved Across Sessions',
    'Hackathon Focus:      iQOO Hackathon Phase 1 Submission'
  ];

  slide.addText(linksText.join('\n\n'), {
    x: 3.0,
    y: 2.8,
    w: 7.3,
    h: 2.5,
    fontSize: 12,
    color: TEXT_WHITE,
    fontFace: 'Courier New'
  });

  slide.addText('Empowering every engineering candidate to crack their dream placement!', {
    x: 2.8,
    y: 5.5,
    w: 7.7,
    h: 0.4,
    fontSize: 12,
    italic: true,
    color: BRAND_CYAN,
    align: 'center',
    fontFace: 'Arial'
  });
}

// Write to file
const outputPath = path.join(process.cwd(), 'NEXORA_Pitch_Deck.pptx');
pptx.writeFile({ fileName: outputPath }).then(() => {
  console.log('Successfully generated PPTX at: ' + outputPath);
});
