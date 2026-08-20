import { CareerPath, ProficiencyLevel, UserSkill, CareerReadinessResult } from '../types/career';

export const PROFICIENCY_VALUES: Record<ProficiencyLevel, number> = {
  'Not Learned': 0.0,
  'Beginner': 0.25,
  'Intermediate': 0.50,
  'Advanced': 0.75,
  'Expert': 1.00,
};

export const calculateCareerReadiness = (
  careerPath: CareerPath,
  userSkills: UserSkill[]
): CareerReadinessResult => {
  const skillMap = new Map<string, ProficiencyLevel>();
  userSkills.forEach((us) => {
    skillMap.set(us.skillName.toLowerCase(), us.proficiencyLevel);
  });

  let totalWeightSum = 0;
  let weightedScoreSum = 0;

  const strongSkills: { skillName: string; proficiency: ProficiencyLevel }[] = [];
  const developingSkills: { skillName: string; proficiency: ProficiencyLevel }[] = [];
  const skillGaps: { skillName: string; requiredLevel: ProficiencyLevel; importanceWeight: number }[] = [];

  careerPath.skills.forEach((cSkill) => {
    const userProficiency = skillMap.get(cSkill.skillName.toLowerCase()) || 'Not Learned';
    const pValue = PROFICIENCY_VALUES[userProficiency];
    const wValue = cSkill.importanceWeight;

    totalWeightSum += wValue;
    weightedScoreSum += wValue * pValue;

    if (pValue >= 0.75) {
      strongSkills.push({ skillName: cSkill.skillName, proficiency: userProficiency });
    } else if (pValue >= 0.25) {
      developingSkills.push({ skillName: cSkill.skillName, proficiency: userProficiency });
    } else {
      skillGaps.push({
        skillName: cSkill.skillName,
        requiredLevel: cSkill.requiredLevel,
        importanceWeight: cSkill.importanceWeight,
      });
    }
  });

  // Calculate final score percentage (0-100)
  const readinessScore = totalWeightSum > 0 ? Math.round((weightedScoreSum / totalWeightSum) * 100) : 0;

  // Sort skill gaps by highest importance weight to suggest the highest priority next step
  skillGaps.sort((a, b) => b.importanceWeight - a.importanceWeight);
  const nextPrioritySkill = skillGaps.length > 0 ? skillGaps[0].skillName : undefined;

  return {
    careerPathId: careerPath.id,
    careerTitle: careerPath.title,
    readinessScore,
    strongSkills,
    developingSkills,
    skillGaps,
    nextPrioritySkill,
  };
};
