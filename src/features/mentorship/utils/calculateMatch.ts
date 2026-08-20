import { AlumniMentorProfile, StudentMentorPreference, MentorMatchResult } from '../../career/types/career';

export const calculateMentorMatch = (
  mentor: AlumniMentorProfile,
  studentGoal: string, // e.g. "Frontend Developer"
  studentSkills: string[], // e.g. ["HTML", "CSS", "JavaScript", "React"]
  preferences: StudentMentorPreference
): MentorMatchResult => {
  const reasons: string[] = [];

  // 1. Skill Score (35%)
  let matchingSkillsCount = 0;
  if (mentor.skills && mentor.skills.length > 0) {
    studentSkills.forEach((s) => {
      if (mentor.skills.some((ms: string) => ms.toLowerCase() === s.toLowerCase())) {
        matchingSkillsCount++;
      }
    });
  }
  const skillScore = studentSkills.length > 0 
    ? Math.min(100, Math.round((matchingSkillsCount / Math.min(4, studentSkills.length)) * 100)) 
    : 70;

  if (matchingSkillsCount >= 2) {
    reasons.push(`✓ ${matchingSkillsCount} matching technical skills (${mentor.skills.slice(0, 3).join(', ')})`);
  }

  // 2. Career Score (25%)
  const isCareerMatch = mentor.role.toLowerCase().includes(studentGoal.toLowerCase()) || 
    (preferences.preferredCareer && mentor.role.toLowerCase().includes(preferences.preferredCareer.toLowerCase()));
  const careerScore = isCareerMatch ? 100 : 75;
  if (isCareerMatch) {
    reasons.push(`✓ Exact career path match (${mentor.role})`);
  } else {
    reasons.push(`✓ Related engineering domain (${mentor.role})`);
  }

  // 3. Industry Score (15%)
  const isIndustryMatch = preferences.preferredIndustry 
    ? mentor.industry.toLowerCase().includes(preferences.preferredIndustry.toLowerCase())
    : true;
  const industryScore = isIndustryMatch ? 100 : 70;
  if (isIndustryMatch) {
    reasons.push(`✓ ${mentor.industry} industry match`);
  }

  // 4. Availability Score (15%)
  const hasCapacity = mentor.currentMenteesCount < mentor.maxActiveMentees;
  const availabilityScore = hasCapacity ? 100 : 50;
  if (hasCapacity) {
    reasons.push(`✓ Available for new mentees (${mentor.maxActiveMentees - mentor.currentMenteesCount} slot open)`);
  }

  // 5. Location / Meeting Type Score (10%)
  const isMeetingMatch = preferences.preferredMeetingType === 'Any' || mentor.preferredMeeting === 'Any' || preferences.preferredMeetingType === mentor.preferredMeeting;
  const locationScore = isMeetingMatch ? 100 : 70;
  if (isMeetingMatch) {
    reasons.push(`✓ Flexible ${mentor.preferredMeeting} mentorship format`);
  }

  // Final Weighted Compatibility Score (0 - 100)
  const finalScore = Math.round(
    0.35 * skillScore +
    0.25 * careerScore +
    0.15 * industryScore +
    0.15 * availabilityScore +
    0.10 * locationScore
  );

  return {
    mentor,
    matchScore: finalScore,
    breakdown: {
      skillScore,
      careerScore,
      industryScore,
      availabilityScore,
      locationScore,
    },
    reasons,
  };
};
