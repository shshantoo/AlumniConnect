import { AiCvReviewReport, AiCvSuggestion, SuggestionStatus } from '../types/aiCv.types';
import { calculateCvScore } from '../utils/calculateCvScore';
import { getSavedUserGoal, getSavedUserSkills, INITIAL_CAREER_PATHS } from '../../career/services/careerService';

const AI_CV_REVIEW_STORAGE_KEY = 'alumni_connect_ai_cv_review';

export const getSavedCvAiReport = (profile: any): AiCvReviewReport => {
  const saved = localStorage.getItem(AI_CV_REVIEW_STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return generateInitialAiCvReport(profile);
};

export const saveCvAiReport = (report: AiCvReviewReport) => {
  localStorage.setItem(AI_CV_REVIEW_STORAGE_KEY, JSON.stringify(report));
};

export const generateInitialAiCvReport = (profile: any): AiCvReviewReport => {
  const goalId = getSavedUserGoal();
  const careerPath = INITIAL_CAREER_PATHS.find((cp) => cp.id === goalId) || INITIAL_CAREER_PATHS[0];
  const userSkills = getSavedUserSkills().map((us) => us.skillName);

  // Check required skills for target career
  const requiredCareerSkills = careerPath.skills.map((s) => s.skillName);
  const missingCareerSkills = requiredCareerSkills.filter(
    (req) => !userSkills.some((us) => us.toLowerCase() === req.toLowerCase())
  );

  const appliedCount = 0;
  const scoreResult = calculateCvScore(profile, appliedCount);

  const initialSuggestions: AiCvSuggestion[] = [
    {
      id: 'sug-1',
      section: 'Professional Summary',
      priority: 'high',
      issue: 'The professional summary is too generic and lacks target career keywords.',
      reason: 'Recruiters scan summaries in 6 seconds to identify your target position and core technical stack.',
      originalText: profile?.professional_summary || profile?.career_objective || 'I am a hardworking Computer Science student seeking good opportunities.',
      suggestedText: `Computer Science & Engineering student specializing in ${careerPath.title} solutions (React, TypeScript, REST APIs). Experienced in building responsive web interfaces and eager to leverage modern development practices in a corporate software team.`,
      status: 'pending',
    },
    {
      id: 'sug-2',
      section: 'Work Experience & Projects',
      priority: 'high',
      issue: 'Project descriptions lack measurable action verbs and tech stack details.',
      reason: 'Framing work experience with [Action Verb + Technology + Impact] dramatically increases ATS resume parser ranking.',
      originalText: 'Worked on a university alumni web project using React.',
      suggestedText: 'Engineered an intelligent university alumni and career development web platform utilizing React 19, TypeScript, and Supabase PostgreSQL. Integrated dynamic skill gap detection algorithms and responsive spatial alumni mapping.',
      status: 'pending',
    },
    {
      id: 'sug-3',
      section: 'Skills Gap Analysis',
      priority: 'medium',
      issue: `Your CV is currently missing key skills required for a ${careerPath.title} role.`,
      reason: `Industry job postings for ${careerPath.title} heavily prioritize ${missingCareerSkills.slice(0, 3).join(', ')}.`,
      originalText: `Current Skills: ${userSkills.join(', ')}`,
      suggestedText: `Identified Missing Career Path Skills: ${missingCareerSkills.join(', ')}. Complete these skill milestones on your Career Roadmap before updating your CV skills section.`,
      status: 'pending',
    },
    {
      id: 'sug-4',
      section: 'Links & Portfolio',
      priority: 'low',
      issue: 'Portfolio and GitHub links should be explicitly formatted in contact header.',
      reason: 'Technical recruiters expect direct 1-click access to inspect your source code and live demo deployments.',
      originalText: profile?.github || 'GitHub: Not provided',
      suggestedText: `GitHub: github.com/${profile?.username || 'shshantoo'} • LinkedIn: linkedin.com/in/${profile?.username || 'shshantoo'} • Portfolio: shshantoo.github.io/AlumniConnect`,
      status: 'pending',
    },
  ];

  return {
    id: `rev-${Date.now()}`,
    cvId: 'cv-main-1',
    title: `${profile?.full_name || 'Student'}'s ${careerPath.title} CV`,
    targetCareer: careerPath.title,
    score: scoreResult,
    overallFeedback: `Your CV currently scores ${scoreResult.overallScore}/100. Addressing high-priority suggestions like action-oriented project descriptions and summary keywords will significantly boost ATS recruiter performance.`,
    suggestions: initialSuggestions,
    createdAt: new Date().toISOString(),
  };
};

export const updateSuggestionStatus = (
  report: AiCvReviewReport,
  profile: any,
  suggestionId: string,
  newStatus: SuggestionStatus
): AiCvReviewReport => {
  const updatedSuggestions = report.suggestions.map((sug) =>
    sug.id === suggestionId ? { ...sug, status: newStatus } : sug
  );

  const appliedCount = updatedSuggestions.filter((s) => s.status === 'applied').length;
  const recalculatedScore = calculateCvScore(profile, appliedCount);

  const updatedReport: AiCvReviewReport = {
    ...report,
    score: recalculatedScore,
    suggestions: updatedSuggestions,
  };

  saveCvAiReport(updatedReport);
  return updatedReport;
};

export const bulkApplyHighPrioritySuggestions = (
  report: AiCvReviewReport,
  profile: any
): AiCvReviewReport => {
  const updatedSuggestions = report.suggestions.map((sug) =>
    sug.priority === 'high' ? { ...sug, status: 'applied' as const } : sug
  );

  const appliedCount = updatedSuggestions.filter((s) => s.status === 'applied').length;
  const recalculatedScore = calculateCvScore(profile, appliedCount);

  const updatedReport: AiCvReviewReport = {
    ...report,
    score: recalculatedScore,
    suggestions: updatedSuggestions,
  };

  saveCvAiReport(updatedReport);
  return updatedReport;
};
