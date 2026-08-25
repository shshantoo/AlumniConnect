export type TargetAudience = 'Everyone' | 'Students' | 'Alumni';
export type QuestionStatus = 'active' | 'hidden' | 'deleted';
export type AnswerStatus = 'active' | 'hidden' | 'deleted';
export type ReplyStatus = 'active' | 'hidden' | 'deleted';
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';
export type ReportTargetType = 'question' | 'answer' | 'reply';

export interface CommunityCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface CommunityTag {
  id: string;
  name: string;
  slug: string;
}

export interface CommunityReply {
  id: string;
  answer_id: string;
  user_id: string;
  author_name: string;
  author_role: 'student' | 'alumni' | 'admin';
  author_photo?: string;
  content: string;
  status: ReplyStatus;
  created_at: string;
  updated_at: string;
}

export interface CommunityAnswer {
  id: string;
  question_id: string;
  user_id: string;
  author_name: string;
  author_role: 'student' | 'alumni' | 'admin';
  author_photo?: string;
  author_department?: string;
  content: string;
  is_accepted: boolean;
  status: AnswerStatus;
  upvote_count: number;
  reply_count: number;
  replies?: CommunityReply[];
  is_upvoted_by_user?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommunityQuestion {
  id: string;
  user_id: string;
  author_name: string;
  author_role: 'student' | 'alumni' | 'admin';
  author_photo?: string;
  author_department?: string;
  title: string;
  content: string;
  category_id: string;
  category_name?: string;
  tags: string[];
  target_audience: TargetAudience;
  status: QuestionStatus;
  view_count: number;
  upvote_count: number;
  answer_count: number;
  accepted_answer_id?: string;
  answers?: CommunityAnswer[];
  is_upvoted_by_user?: boolean;
  is_saved_by_user?: boolean;
  relevance_score?: number;
  popularity_score?: number;
  created_at: string;
  updated_at: string;
}

export interface CommunityReport {
  id: string;
  reporter_id: string;
  reporter_name: string;
  target_type: ReportTargetType;
  target_id: string;
  reason: string;
  description?: string;
  status: ReportStatus;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
  content_preview?: string;
}

export interface CommunityAnalytics {
  totalQuestions: number;
  totalAnswers: number;
  totalDiscussions: number;
  activeUsers: number;
  reportedContentCount: number;
  questionsToday: number;
  answersToday: number;
}
