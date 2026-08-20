import { CvScoreResult, ScoreCategoryBreakdown } from '../types/aiCv.types';

export const calculateCvScore = (profile: any, appliedSuggestionsCount: number = 0): CvScoreResult => {
  // 1. Profile Completion (15%)
  const hasPhoto = Boolean(profile?.photo);
  const hasHeadline = Boolean(profile?.headline && profile.headline.length > 5);
  const hasBio = Boolean(profile?.bio && profile.bio.length > 10);
  const profileEarned = (hasPhoto ? 40 : 0) + (hasHeadline ? 35 : 0) + (hasBio ? 25 : 0);

  // 2. Professional Summary (15%)
  const summaryText = profile?.professional_summary || profile?.career_objective || '';
  const summaryLength = summaryText.trim().length;
  let summaryEarned = 0;
  if (summaryLength > 120) summaryEarned = 100;
  else if (summaryLength > 50) summaryEarned = 70;
  else if (summaryLength > 0) summaryEarned = 40;

  // 3. Work Experience (20%)
  const experienceList = profile?.work_experience || [];
  let expEarned = 0;
  if (experienceList.length >= 2) expEarned = 100;
  else if (experienceList.length === 1) expEarned = 75;
  else expEarned = 35; // student baseline project experience

  // 4. Skills (15%)
  const skillsCategorized = profile?.skills_categorized || [];
  const totalSkills = skillsCategorized.reduce((acc: number, item: any) => acc + (item.skills?.length || 0), 0);
  let skillsEarned = 0;
  if (totalSkills >= 8) skillsEarned = 100;
  else if (totalSkills >= 4) skillsEarned = 75;
  else if (totalSkills > 0) skillsEarned = 50;

  // 5. Projects (20%)
  const projectsList = profile?.projects_list || [];
  let projectsEarned = 0;
  if (projectsList.length >= 3) projectsEarned = 100;
  else if (projectsList.length >= 1) projectsEarned = 80;
  else projectsEarned = 40;

  // 6. Education (10%)
  const eduEarned = profile?.university ? 100 : 50;

  // 7. Links & Contact (5%)
  const hasGithub = Boolean(profile?.github);
  const hasLinkedin = Boolean(profile?.linkedin);
  const hasEmail = Boolean(profile?.email);
  const contactEarned = (hasGithub ? 40 : 0) + (hasLinkedin ? 40 : 0) + (hasEmail ? 20 : 0);

  // Applied AI suggestions bonus (up to 15 points boost)
  const aiBonus = Math.min(15, appliedSuggestionsCount * 5);

  // Overall Weighted Score (0 to 100)
  const weightedBase =
    profileEarned * 0.15 +
    summaryEarned * 0.15 +
    expEarned * 0.20 +
    skillsEarned * 0.15 +
    projectsEarned * 0.20 +
    eduEarned * 0.10 +
    contactEarned * 0.05;

  const overallScore = Math.min(100, Math.round(weightedBase + aiBonus));

  const categories: ScoreCategoryBreakdown[] = [
    {
      category: 'Profile Completion',
      weightPercent: 15,
      earnedScorePercent: profileEarned,
      status: profileEarned >= 80 ? 'excellent' : profileEarned >= 50 ? 'needs_work' : 'incomplete',
    },
    {
      category: 'Professional Summary',
      weightPercent: 15,
      earnedScorePercent: summaryEarned,
      status: summaryEarned >= 80 ? 'excellent' : summaryEarned >= 50 ? 'needs_work' : 'incomplete',
    },
    {
      category: 'Work Experience',
      weightPercent: 20,
      earnedScorePercent: expEarned,
      status: expEarned >= 80 ? 'excellent' : expEarned >= 50 ? 'needs_work' : 'incomplete',
    },
    {
      category: 'Skills Portfolio',
      weightPercent: 15,
      earnedScorePercent: skillsEarned,
      status: skillsEarned >= 80 ? 'excellent' : skillsEarned >= 50 ? 'needs_work' : 'incomplete',
    },
    {
      category: 'Technical Projects',
      weightPercent: 20,
      earnedScorePercent: projectsEarned,
      status: projectsEarned >= 80 ? 'excellent' : projectsEarned >= 50 ? 'needs_work' : 'incomplete',
    },
    {
      category: 'Education',
      weightPercent: 10,
      earnedScorePercent: eduEarned,
      status: eduEarned >= 80 ? 'excellent' : 'incomplete',
    },
    {
      category: 'Links & Contact',
      weightPercent: 5,
      earnedScorePercent: contactEarned,
      status: contactEarned >= 80 ? 'excellent' : 'needs_work',
    },
  ];

  const missingSections: string[] = [];
  const weakSections: string[] = [];

  categories.forEach((cat) => {
    if (cat.status === 'incomplete') missingSections.push(cat.category);
    else if (cat.status === 'needs_work') weakSections.push(cat.category);
  });

  return {
    overallScore,
    previousScore: appliedSuggestionsCount > 0 ? Math.max(40, overallScore - aiBonus) : undefined,
    categories,
    missingSections,
    weakSections,
  };
};
