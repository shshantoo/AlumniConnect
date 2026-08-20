export type SuggestionPriority = 'high' | 'medium' | 'low';
export type SuggestionStatus = 'pending' | 'applied' | 'rejected';

export interface ScoreCategoryBreakdown {
  category: string; // e.g. "Profile", "Summary", "Experience", "Skills", "Projects", "Education", "Contact"
  weightPercent: number; // e.g. 15
  earnedScorePercent: number; // 0 to 100
  status: 'excellent' | 'needs_work' | 'incomplete';
}

export interface CvScoreResult {
  overallScore: number; // 0 to 100
  previousScore?: number; // for tracking improvement delta
  categories: ScoreCategoryBreakdown[];
  missingSections: string[];
  weakSections: string[];
}

export interface AiCvSuggestion {
  id: string;
  section: string; // e.g. "Professional Summary", "Work Experience", "Projects", "Skills Gap", "Contact Info"
  priority: SuggestionPriority;
  issue: string;
  reason: string;
  originalText?: string;
  suggestedText: string;
  status: SuggestionStatus;
}

export interface AiCvReviewReport {
  id: string;
  cvId: string;
  title: string;
  targetCareer: string;
  score: CvScoreResult;
  overallFeedback: string;
  suggestions: AiCvSuggestion[];
  createdAt: string;
}
