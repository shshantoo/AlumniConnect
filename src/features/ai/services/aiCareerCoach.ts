import { CareerReadinessResult } from '../../career/types/career';

export interface AICareerAdvice {
  summary: string;
  primaryPriority: string;
  weeklyPlan: string[];
  recommendation: string;
}

export const generateAICareerAdvice = async (
  readiness: CareerReadinessResult
): Promise<AICareerAdvice> => {
  // Simulate AI latency for realistic UX feel
  await new Promise((r) => setTimeout(r, 600));

  const goal = readiness.careerTitle;
  const score = readiness.readinessScore;
  const topGap = readiness.nextPrioritySkill || 'React';
  const gaps = readiness.skillGaps.map((g) => g.skillName).slice(0, 3).join(', ');

  let summary = `Based on your evaluation for ${goal}, your calculated readiness score is ${score}%. `;
  if (score >= 75) {
    summary += `You have built a strong foundational technical stack and are ready to prepare for corporate placements.`;
  } else if (score >= 45) {
    summary += `You have solid baseline skills in key areas, but addressing critical skill gaps like ${topGap} will rapidly boost your placement readiness.`;
  } else {
    summary += `You are at the start of your learning journey. Focus on completing Phase 1 fundamentals before moving into complex framework concepts.`;
  }

  const primaryPriority = `Focus 70% of your dedicated study time on mastering ${topGap} before picking up secondary frameworks.`;

  const weeklyPlan = [
    `Week 1: Complete 3 hands-on tutorials and build small demo projects focusing specifically on ${topGap}.`,
    `Week 2: Solve 5 real-world coding problems applying ${topGap} concepts with proper version control on GitHub.`,
    `Week 3: Connect with an alumni mentor who specializes in ${goal} for a 1-on-1 code review and mentorship session.`,
    `Week 4: Update your readiness assessment and deploy a live capstone project incorporating your new skills.`,
  ];

  const recommendation = `Priority focus: ${gaps ? `Focus next on ${gaps}.` : 'Prepare for technical mock interviews with alumni.'}`;

  return {
    summary,
    primaryPriority,
    weeklyPlan,
    recommendation,
  };
};

export interface AICVAnalysisResult {
  overallScore: number;
  summaryFeedback: string;
  suggestions: {
    section: string;
    currentText: string;
    suggestedText: string;
    reason: string;
  }[];
}

export const generateAICVAnalysis = async (
  profileData: any
): Promise<AICVAnalysisResult> => {
  await new Promise((r) => setTimeout(r, 600));

  return {
    overallScore: 8,
    summaryFeedback: 'Your CV professional summary is clear, but adding explicit mention of your target career role will significantly improve ATS keyword matching.',
    suggestions: [
      {
        section: 'Professional Summary',
        currentText: profileData?.professional_summary || 'Enthusiastic CSE student looking for tech opportunities.',
        suggestedText: `Motivated Computer Science & Engineering student specializing in modern web application development (React, TypeScript, REST APIs). Seeking a challenging Frontend / Full Stack Engineering role.`,
        reason: 'Adds high-impact technical keywords and explicit target position.',
      },
      {
        section: 'Technical Skills',
        currentText: 'HTML, CSS, JS, Git',
        suggestedText: 'Frontend: React, TypeScript, HTML5, CSS3/Tailwind; Backend: REST APIs, Node.js, SQL; Tools: Git/GitHub, Vite',
        reason: 'Categorizing technical skills into Frontend, Backend, and Tools improves recruiter readability.',
      },
    ],
  };
};
