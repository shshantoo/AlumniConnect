export type ProficiencyLevel = 'Not Learned' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface CareerSkillWeight {
  skillId: string;
  skillName: string;
  importanceWeight: number; // 1 to 10
  requiredLevel: ProficiencyLevel;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: CareerSkillWeight[];
}

export interface UserSkill {
  skillId: string;
  skillName: string;
  proficiencyLevel: ProficiencyLevel;
  lastUpdated?: string;
}

export interface CareerReadinessResult {
  careerPathId: string;
  careerTitle: string;
  readinessScore: number; // 0 to 100
  strongSkills: { skillName: string; proficiency: ProficiencyLevel }[];
  developingSkills: { skillName: string; proficiency: ProficiencyLevel }[];
  skillGaps: { skillName: string; requiredLevel: ProficiencyLevel; importanceWeight: number }[];
  nextPrioritySkill?: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  phaseNumber: number; // 1, 2, 3, 4
  stepOrder: number;
  skillName?: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  targetDate?: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  steps: RoadmapStep[];
  progressPercent: number;
  isUnlocked: boolean;
}

export interface StudentMentorPreference {
  helpTopics: string[];
  preferredIndustry: string;
  preferredCareer: string;
  preferredLocation: string;
  preferredMeetingType: 'Online' | 'In-Person' | 'Any';
}

export interface AlumniMentorProfile {
  alumniId: string;
  alumniName: string;
  headline: string;
  company: string;
  role: string;
  photoUrl?: string;
  isMentorEnabled: boolean;
  mentorshipTopics: string[];
  skills: string[];
  industry: string;
  yearsOfExperience: number;
  maxActiveMentees: number;
  currentMenteesCount: number;
  availability: string[];
  preferredMeeting: 'Online' | 'In-Person' | 'Any';
  location: string;
  rating: number;
}

export interface MentorMatchResult {
  mentor: AlumniMentorProfile;
  matchScore: number; // 0 - 100%
  breakdown: {
    skillScore: number;
    careerScore: number;
    industryScore: number;
    availabilityScore: number;
    locationScore: number;
  };
  reasons: string[];
}
