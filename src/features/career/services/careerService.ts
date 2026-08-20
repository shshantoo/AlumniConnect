import { CareerPath, Skill, UserSkill, RoadmapPhase, RoadmapStep } from '../types/career';

export const INITIAL_SKILLS: Skill[] = [
  { id: 'sk-1', name: 'HTML', category: 'Frontend', description: 'Semantic web structure & markup' },
  { id: 'sk-2', name: 'CSS', category: 'Frontend', description: 'Styling, Flexbox, Grid, & Responsive layout' },
  { id: 'sk-3', name: 'JavaScript', category: 'Frontend', description: 'ES6+, Async/Await, DOM manipulation' },
  { id: 'sk-4', name: 'React', category: 'Frontend', description: 'Component architecture, Hooks, State & Context API' },
  { id: 'sk-5', name: 'TypeScript', category: 'Frontend', description: 'Static typing, Interfaces, & Type safety' },
  { id: 'sk-6', name: 'Git', category: 'Tools', description: 'Version control, branching, PRs & GitHub workflows' },
  { id: 'sk-7', name: 'REST APIs', category: 'Backend', description: 'HTTP verbs, JSON payloads, status codes, API consumption' },
  { id: 'sk-8', name: 'Node.js', category: 'Backend', description: 'Server-side JavaScript runtime & Express' },
  { id: 'sk-9', name: 'Python', category: 'Backend/Data', description: 'Python scripting, Data structures, FastAPI/Django' },
  { id: 'sk-10', name: 'SQL', category: 'Database', description: 'Relational queries, Joins, PostgreSQL & MySQL' },
  { id: 'sk-11', name: 'Figma', category: 'Design', description: 'Wireframing, High-fidelity UI prototypes & Design systems' },
  { id: 'sk-12', name: 'Cybersecurity', category: 'Security', description: 'Network security, Encryption, Vulnerability assessment' },
];

export const INITIAL_CAREER_PATHS: CareerPath[] = [
  {
    id: 'cp-frontend',
    title: 'Frontend Developer',
    description: 'Build modern, responsive, highly interactive web user interfaces using HTML, CSS, JavaScript, React, and TypeScript.',
    category: 'Engineering',
    skills: [
      { skillId: 'sk-1', skillName: 'HTML', importanceWeight: 8, requiredLevel: 'Intermediate' },
      { skillId: 'sk-2', skillName: 'CSS', importanceWeight: 8, requiredLevel: 'Intermediate' },
      { skillId: 'sk-3', skillName: 'JavaScript', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-4', skillName: 'React', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-5', skillName: 'TypeScript', importanceWeight: 8, requiredLevel: 'Intermediate' },
      { skillId: 'sk-6', skillName: 'Git', importanceWeight: 6, requiredLevel: 'Beginner' },
      { skillId: 'sk-7', skillName: 'REST APIs', importanceWeight: 8, requiredLevel: 'Intermediate' },
    ],
  },
  {
    id: 'cp-backend',
    title: 'Backend Developer',
    description: 'Design robust server architectures, database schemas, authentication systems, and scalable REST/GraphQL APIs.',
    category: 'Engineering',
    skills: [
      { skillId: 'sk-9', skillName: 'Python', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-8', skillName: 'Node.js', importanceWeight: 9, requiredLevel: 'Advanced' },
      { skillId: 'sk-10', skillName: 'SQL', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-7', skillName: 'REST APIs', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-6', skillName: 'Git', importanceWeight: 7, requiredLevel: 'Intermediate' },
    ],
  },
  {
    id: 'cp-fullstack',
    title: 'Full Stack Developer',
    description: 'Master end-to-end web software development combining rich frontend user interfaces with scalable backend infrastructure.',
    category: 'Engineering',
    skills: [
      { skillId: 'sk-3', skillName: 'JavaScript', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-4', skillName: 'React', importanceWeight: 9, requiredLevel: 'Advanced' },
      { skillId: 'sk-8', skillName: 'Node.js', importanceWeight: 9, requiredLevel: 'Advanced' },
      { skillId: 'sk-10', skillName: 'SQL', importanceWeight: 8, requiredLevel: 'Intermediate' },
      { skillId: 'sk-5', skillName: 'TypeScript', importanceWeight: 8, requiredLevel: 'Intermediate' },
      { skillId: 'sk-6', skillName: 'Git', importanceWeight: 7, requiredLevel: 'Intermediate' },
    ],
  },
  {
    id: 'cp-data',
    title: 'Data Analyst',
    description: 'Transform complex datasets into actionable business intelligence using SQL, Python, statistics, and visualization tools.',
    category: 'Data & Analytics',
    skills: [
      { skillId: 'sk-10', skillName: 'SQL', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-9', skillName: 'Python', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-6', skillName: 'Git', importanceWeight: 6, requiredLevel: 'Beginner' },
    ],
  },
  {
    id: 'cp-uiux',
    title: 'UI/UX Designer',
    description: 'Create intuitive, user-centered digital products, wireframes, interaction models, and visual design systems.',
    category: 'Design',
    skills: [
      { skillId: 'sk-11', skillName: 'Figma', importanceWeight: 10, requiredLevel: 'Expert' },
      { skillId: 'sk-1', skillName: 'HTML', importanceWeight: 6, requiredLevel: 'Beginner' },
      { skillId: 'sk-2', skillName: 'CSS', importanceWeight: 6, requiredLevel: 'Beginner' },
    ],
  },
  {
    id: 'cp-cybersecurity',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizational networks, analyze system vulnerabilities, conduct security audits, and enforce threat mitigation.',
    category: 'Security',
    skills: [
      { skillId: 'sk-12', skillName: 'Cybersecurity', importanceWeight: 10, requiredLevel: 'Advanced' },
      { skillId: 'sk-9', skillName: 'Python', importanceWeight: 8, requiredLevel: 'Intermediate' },
      { skillId: 'sk-6', skillName: 'Git', importanceWeight: 6, requiredLevel: 'Beginner' },
    ],
  },
];

export const INITIAL_USER_SKILLS: UserSkill[] = [
  { skillId: 'sk-1', skillName: 'HTML', proficiencyLevel: 'Advanced' },
  { skillId: 'sk-2', skillName: 'CSS', proficiencyLevel: 'Intermediate' },
  { skillId: 'sk-3', skillName: 'JavaScript', proficiencyLevel: 'Beginner' },
  { skillId: 'sk-6', skillName: 'Git', proficiencyLevel: 'Beginner' },
  { skillId: 'sk-4', skillName: 'React', proficiencyLevel: 'Not Learned' },
  { skillId: 'sk-5', skillName: 'TypeScript', proficiencyLevel: 'Not Learned' },
  { skillId: 'sk-7', skillName: 'REST APIs', proficiencyLevel: 'Not Learned' },
];

export const INITIAL_ROADMAP_STEPS: Record<string, RoadmapStep[]> = {
  'cp-frontend': [
    {
      id: 'rm-1',
      title: 'Web Fundamentals',
      description: 'Master HTML5 semantic tags, CSS Flexbox/Grid layout systems, and DOM structure.',
      phaseNumber: 1,
      stepOrder: 1,
      skillName: 'HTML',
      status: 'Completed',
    },
    {
      id: 'rm-2',
      title: 'JavaScript Core & ES6+',
      description: 'Understand functions, closures, promises, async/await, and array methods.',
      phaseNumber: 1,
      stepOrder: 2,
      skillName: 'JavaScript',
      status: 'In Progress',
    },
    {
      id: 'rm-3',
      title: 'React Fundamentals',
      description: 'Learn components, props, state hooks (useState, useEffect), and JSX syntax.',
      phaseNumber: 2,
      stepOrder: 1,
      skillName: 'React',
      status: 'Pending',
    },
    {
      id: 'rm-4',
      title: 'TypeScript for React',
      description: 'Add static typing, component prop interfaces, and generic types to modern React apps.',
      phaseNumber: 2,
      stepOrder: 2,
      skillName: 'TypeScript',
      status: 'Pending',
    },
    {
      id: 'rm-5',
      title: 'REST API Integration',
      description: 'Connect frontend interfaces with backend services, manage loading & error states.',
      phaseNumber: 3,
      stepOrder: 1,
      skillName: 'REST APIs',
      status: 'Pending',
    },
    {
      id: 'rm-6',
      title: 'Version Control & Git Workflows',
      description: 'Manage code repositories, create feature branches, and submit pull requests.',
      phaseNumber: 3,
      stepOrder: 2,
      skillName: 'Git',
      status: 'In Progress',
    },
    {
      id: 'rm-7',
      title: 'Capstone Project 1: Portfolio Web App',
      description: 'Build a production-ready responsive React & TypeScript portfolio web application.',
      phaseNumber: 4,
      stepOrder: 1,
      status: 'Pending',
    },
    {
      id: 'rm-8',
      title: 'Capstone Project 2: Industry Mentorship App',
      description: 'Collaborate with an alumni mentor to refine and deploy your full web product.',
      phaseNumber: 4,
      stepOrder: 2,
      status: 'Pending',
    },
  ],
};

// Local Storage Helper
const STORAGE_KEYS = {
  USER_GOAL: 'alumni_connect_user_goal',
  USER_SKILLS: 'alumni_connect_user_skills',
  ROADMAP_PROGRESS: 'alumni_connect_roadmap_progress',
};

export const getSavedUserGoal = (): string => {
  return localStorage.getItem(STORAGE_KEYS.USER_GOAL) || 'cp-frontend';
};

export const saveUserGoal = (careerPathId: string) => {
  localStorage.setItem(STORAGE_KEYS.USER_GOAL, careerPathId);
};

export const getSavedUserSkills = (): UserSkill[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.USER_SKILLS);
  return saved ? JSON.parse(saved) : INITIAL_USER_SKILLS;
};

export const saveUserSkills = (userSkills: UserSkill[]) => {
  localStorage.setItem(STORAGE_KEYS.USER_SKILLS, JSON.stringify(userSkills));
};

export const getSavedRoadmapSteps = (careerPathId: string): RoadmapStep[] => {
  const saved = localStorage.getItem(`${STORAGE_KEYS.ROADMAP_PROGRESS}_${careerPathId}`);
  if (saved) {
    return JSON.parse(saved);
  }
  return INITIAL_ROADMAP_STEPS[careerPathId] || INITIAL_ROADMAP_STEPS['cp-frontend'];
};

export const saveRoadmapSteps = (careerPathId: string, steps: RoadmapStep[]) => {
  localStorage.setItem(`${STORAGE_KEYS.ROADMAP_PROGRESS}_${careerPathId}`, JSON.stringify(steps));
};
