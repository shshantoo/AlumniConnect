import { 
  CommunityQuestion, CommunityAnswer, CommunityReply, 
  CommunityCategory, CommunityReport, TargetAudience 
} from '../types/community.types';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS, INITIAL_REPORTS } from '../../../mock/communitySeedData';
import { UserProfile } from '../../../types/database.types';
import { supabase } from '../../../utils/supabase';

const QUESTIONS_STORAGE_KEY = 'alumniconnect_community_questions';
const SAVED_STORAGE_KEY = 'alumniconnect_community_saved_';
const VOTES_QUESTIONS_STORAGE_KEY = 'alumniconnect_community_q_votes_';
const VOTES_ANSWERS_STORAGE_KEY = 'alumniconnect_community_a_votes_';
const REPORTS_STORAGE_KEY = 'alumniconnect_community_reports';

// Initialize Local Data
export function getSavedQuestionsFromStorage(): CommunityQuestion[] {
  try {
    const saved = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading community questions storage:', e);
  }
  return INITIAL_QUESTIONS;
}

export function saveQuestionsToStorage(questions: CommunityQuestion[]): void {
  try {
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Error saving community questions:', e);
  }
}

// User Saved Discussions List
export function getUserSavedQuestionIds(userId: string): string[] {
  try {
    const saved = localStorage.getItem(`${SAVED_STORAGE_KEY}${userId}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
}

export function toggleSaveQuestion(userId: string, questionId: string): boolean {
  const currentSaved = getUserSavedQuestionIds(userId);
  const exists = currentSaved.includes(questionId);
  const updated = exists 
    ? currentSaved.filter(id => id !== questionId)
    : [...currentSaved, questionId];
  
  try {
    localStorage.setItem(`${SAVED_STORAGE_KEY}${userId}`, JSON.stringify(updated));
  } catch (e) {}
  return !exists;
}

// Upvote State Trackers
export function getUserQuestionVotes(userId: string): string[] {
  try {
    const saved = localStorage.getItem(`${VOTES_QUESTIONS_STORAGE_KEY}${userId}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
}

export function getUserAnswerVotes(userId: string): string[] {
  try {
    const saved = localStorage.getItem(`${VOTES_ANSWERS_STORAGE_KEY}${userId}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [];
}

// Calculate Deterministic Relevance Score for "My Feed"
export function calculateRelevanceScore(question: CommunityQuestion, profile: Partial<UserProfile> | null): number {
  if (!profile) return 0;
  let score = 0;

  // 1. Department Match (30 pts)
  const userDept = (profile.department || '').toLowerCase();
  const qDept = (question.author_department || '').toLowerCase();
  if (userDept && qDept && (qDept.includes(userDept) || userDept.includes(qDept))) {
    score += 30;
  }

  // 2. Target Career Interest Match (30 pts)
  const headline = (profile.headline || '').toLowerCase();
  const title = question.title.toLowerCase();
  const content = question.content.toLowerCase();
  if (headline) {
    const words = headline.split(/\s+/).filter(w => w.length > 3);
    for (const word of words) {
      if (title.includes(word) || content.includes(word)) {
        score += 30;
        break;
      }
    }
  }

  // 3. Tags & Skill Match (25 pts)
  const tags = question.tags || [];
  if (tags.some(t => headline.includes(t.toLowerCase()) || title.includes(t.toLowerCase()))) {
    score += 25;
  }

  // 4. Category Match (15 pts)
  if (question.category_name && headline.includes(question.category_name.toLowerCase())) {
    score += 15;
  }

  return score;
}

// Calculate Popularity Ranking Score for "Popular Feed"
export function calculatePopularityScore(question: CommunityQuestion): number {
  const upvoteWeight = (question.upvote_count || 0) * 3;
  const answerWeight = (question.answer_count || 0) * 5;
  const createdTime = new Date(question.created_at).getTime();
  const hoursAgo = Math.max(1, (Date.now() - createdTime) / (1000 * 3600));
  const recencyBonus = 100 / (hoursAgo + 2);

  return upvoteWeight + answerWeight + recencyBonus;
}

// Tag Normalizer
export function normalizeTag(rawTag: string): string {
  return rawTag.trim().toLowerCase().replace(/^#+/, '').replace(/\s+/g, '-');
}

// Community Reports Storage
export function getSavedReportsFromStorage(): CommunityReport[] {
  try {
    const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return INITIAL_REPORTS;
}

export function saveReportsToStorage(reports: CommunityReport[]): void {
  try {
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {}
}
