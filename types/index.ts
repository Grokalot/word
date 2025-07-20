export interface Word {
  id: string;
  word: string;
  definition: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
  timesReviewed: number;
  averageScore: number;
}

export interface UserProgress {
  userId: string;
  wordsLearned: number;
  currentStreak: number;
  longestStreak: number;
  totalScore: number;
  averageAccuracy: number;
  lastStudyDate: Date;
}

export interface ScoringResponse {
  score: number;
  feedback: string;
  corrections?: string[];
  confidence: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 