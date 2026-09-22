import { COMPANY_PROFILES } from '../data/companyProfiles';
import { ResumeDiagnostic } from '../types';

export class ResumeAnalyzerService {
  private static ACTION_VERBS = [
    'architected', 'engineered', 'spearheaded', 'orchestrated', 'optimized',
    'benchmarked', 'deployed', 'developed', 'designed', 'scaled', 'implemented',
    'automated', 'refactored', 'reduced', 'increased', 'accelerated', 'authored',
    'streamlined', 'integrated', 'resolved', 'mentored', 'founded', 'built'
  ];

  private static WEAK_VERBS = [
    'worked on', 'helped with', 'responsible for', 'handled', 'assisted in',
    'participated', 'did', 'made', 'tried', 'learned'
  ];

  public static analyzeResume(resumeText: string, companyId: string): ResumeDiagnostic {
    const textLower = resumeText.toLowerCase();
    const company = COMPANY_PROFILES.find(c => c.id === companyId) || COMPANY_PROFILES[0];

    // 1. Metric / Quantifiable Data Detection (e.g. 42%, $10k, 1.2M, 500ms)
    const metricMatches = resumeText.match(/(\d+(\.\d+)?%|\$\d+[\d,]*|\b\d+[\d,]*\s*(users|clients|ms|seconds|req\/s|events\/sec|stars|k|m|lpa|gb|tb|hours)\b|\b\d+\b)/gi) || [];
    const metricCount = metricMatches.length;
    const metricsScore = Math.min(100, Math.round((metricCount / 8) * 100));

    // 2. Action Verbs vs Weak Verbs
    let actionVerbHits: string[] = [];
    this.ACTION_VERBS.forEach(verb => {
      if (textLower.includes(verb)) {
        actionVerbHits.push(verb);
      }
    });
    let weakVerbHits: string[] = [];
    this.WEAK_VERBS.forEach(verb => {
      if (textLower.includes(verb)) {
        weakVerbHits.push(verb);
      }
    });
    const actionVerbsScore = Math.max(20, Math.min(100, Math.round((actionVerbHits.length / 5) * 100) - (weakVerbHits.length * 10)));

    // 3. Company Skills Match
    const matchedMustHave: string[] = [];
    const missingMustHave: string[] = [];

    company.mustHaveSkills.forEach(skill => {
      if (textLower.includes(skill.toLowerCase())) {
        matchedMustHave.push(skill);
      } else {
        missingMustHave.push(skill);
      }
    });

    const matchedGoodToHave: string[] = [];
    company.goodToHaveSkills.forEach(skill => {
      if (textLower.includes(skill.toLowerCase())) {
        matchedGoodToHave.push(skill);
      }
    });

    const totalExpected = company.mustHaveSkills.length;
    const keywordMatchPercentage = Math.round((matchedMustHave.length / totalExpected) * 100);

    // 4. Section Presence Checks
    const hasEducation = /education|university|college|b\.tech|bachelor/i.test(resumeText);
    const hasProjects = /projects|project\b|portfolio/i.test(resumeText);
    const hasSkills = /skills|technologies|proficiencies/i.test(resumeText);
    const hasExperience = /experience|internship|work/i.test(resumeText);
    const hasAchievements = /achievements|awards|honors|rank|leetcode|codeforces|hackathon/i.test(resumeText);

    // 5. Calculate Overall ATS Score
    let atsScore = Math.round(
      (keywordMatchPercentage * 0.40) +
      (metricsScore * 0.25) +
      (actionVerbsScore * 0.20) +
      ((hasEducation ? 5 : 0) + (hasProjects ? 5 : 0) + (hasSkills ? 5 : 0))
    );
    atsScore = Math.max(25, Math.min(98, atsScore));

    // 6. Formulate Positives (Strengths)
    const strengths: { title: string; detail: string }[] = [];

    if (metricCount >= 4) {
      strengths.push({
        title: 'Strong Quantified Impact',
        detail: `Found ${metricCount} numerical metrics (% improvement, latency reduction, user volume). Recruiters at ${company.name} prioritize measurable outcomes over responsibilities.`
      });
    }

    if (actionVerbHits.length >= 3) {
      strengths.push({
        title: 'Executive Action-Oriented Phrasing',
        detail: `Great usage of proactive technical verbs (${actionVerbHits.slice(0, 4).join(', ')}). This portrays high engineering agency.`
      });
    }

    if (matchedMustHave.length >= Math.ceil(company.mustHaveSkills.length * 0.5)) {
      strengths.push({
        title: `Alignment with ${company.name} Core Stack`,
        detail: `Your resume validates key requirements: ${matchedMustHave.slice(0, 5).join(', ')}.`
      });
    }

    if (hasAchievements) {
      strengths.push({
        title: 'Competitive Standing & Highlights',
        detail: 'Recognizable achievements (e.g. coding profiles, contest ratings, or hackathons) set you apart from 90% of applicant pools.'
      });
    }

    if (strengths.length === 0) {
      strengths.push({
        title: 'Foundational Structure Present',
        detail: 'Resume includes standard academic and technical section headers.'
      });
    }

    // 7. Formulate Critical Negatives (Red Flags & Areas for Improvement)
    const criticalNegatives: { issue: string; impact: string; fixSuggestion: string }[] = [];

    if (metricCount < 3) {
      criticalNegatives.push({
        issue: 'Lack of Quantified Business / Performance Metrics',
        impact: `ATS parsers and senior engineering managers at ${company.name} scan for proof of scale and impact. Statements without numbers sound like basic school assignments.`,
        fixSuggestion: 'Add concrete numbers: percentage speedup, queries per second, user counts, or database sizes (e.g., "Reduced page load time by 38%").'
      });
    }

    if (missingMustHave.length > 0) {
      criticalNegatives.push({
        issue: `Missing Priority Keywords for ${company.name}`,
        impact: `Your resume is missing ${missingMustHave.length} vital skills: ${missingMustHave.slice(0, 4).join(', ')}. Automated ATS filters may reject before a human engineer reviews.`,
        fixSuggestion: `Incorporate these technologies into your project descriptions or technical skills table if you have hands-on familiarity.`
      });
    }

    if (weakVerbHits.length > 0) {
      criticalNegatives.push({
        issue: 'Passive and Weak Phrasing Detected',
        impact: `Found passive phrases such as: "${weakVerbHits.slice(0, 3).join('", "')}". This conveys passive participation rather than technical ownership.`,
        fixSuggestion: 'Replace "Worked on" with "Engineered", "Helped with" with "Architected", and "Handled" with "Optimized".'
      });
    }

    if (!hasExperience && company.tier === 'Tier 1 Tech') {
      criticalNegatives.push({
        issue: 'Absence of Production / Industry Exposure',
        impact: `${company.name} values production deployment, open source contributions, or internship experiences.`,
        fixSuggestion: 'Compensate by highlighting open-source GitHub pull requests or deploying full-stack projects to live cloud domains with CI/CD.'
      });
    }

    // 8. Bullet Point Rewrites (Google XYZ Formula)
    const bulletRewrites = [
      {
        original: 'Made an e-commerce website using HTML, CSS, and basic JavaScript with cart functionality.',
        improved: 'Engineered a responsive full-stack e-commerce portal handling 250+ SKU items with stateful cart management, reducing checkout step latency by 35%.',
        formulaUsed: 'Accomplished [e-commerce portal] as measured by [35% latency reduction] by doing [stateful cart architecture]'
      },
      {
        original: 'Worked on database queries and improved the search feature in our project.',
        improved: 'Optimized relational PostgreSQL search queries using B-Tree indexing and Redis caching, cutting average query response time from 480ms to 45ms.',
        formulaUsed: 'Accomplished [search query acceleration] as measured by [480ms to 45ms reduction] by doing [indexing & Redis caching]'
      },
      {
        original: 'Responsible for bug fixes and maintaining the team code repository.',
        improved: 'Spearheaded automated CI/CD GitHub Action workflows and authored unit test suites achieving 85% coverage, slashing production regressions by 40%.',
        formulaUsed: 'Accomplished [regression reduction by 40%] by doing [automated CI/CD & 85% test coverage]'
      }
    ];

    // 9. Readiness Verdict
    let readinessVerdict = '';
    if (atsScore >= 80) {
      readinessVerdict = `Exceptional Match! Your profile exhibits strong engineering depth and quantified impact tailored for ${company.name}.`;
    } else if (atsScore >= 60) {
      readinessVerdict = `Competitive Profile with Moderate Gaps. Address the missing keywords and amplify quantifiable metrics to ensure high shortlisting probability at ${company.name}.`;
    } else {
      readinessVerdict = `Needs Significant Optimization for ${company.name}. Focus on rewording bullet points with the XYZ formula and incorporating core technologies.`;
    }

    // Extract Candidate Name heuristic
    const firstLines = resumeText.trim().split('\n').filter(l => l.trim().length > 0);
    const candidateName = firstLines.length > 0 && firstLines[0].length < 40 ? firstLines[0].trim() : 'Candidate';

    return {
      candidateName,
      targetCompany: company.name,
      atsScore,
      metricsScore,
      actionVerbsScore,
      keywordMatchPercentage,
      strengths,
      criticalNegatives,
      missingKeywords: missingMustHave,
      matchedKeywords: matchedMustHave,
      bulletRewrites,
      readinessVerdict
    };
  }
}
