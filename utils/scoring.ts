import { ScoringResponse } from '../types';

export const calculateDifficultyAdjustment = (
  currentDifficulty: 'easy' | 'medium' | 'hard',
  score: number
): 'easy' | 'medium' | 'hard' => {
  if (score >= 90) {
    // Move to harder difficulty
    switch (currentDifficulty) {
      case 'easy':
        return 'medium';
      case 'medium':
        return 'hard';
      case 'hard':
        return 'hard'; // Stay at hard
    }
  } else if (score <= 60) {
    // Move to easier difficulty
    switch (currentDifficulty) {
      case 'easy':
        return 'easy'; // Stay at easy
      case 'medium':
        return 'easy';
      case 'hard':
        return 'medium';
    }
  }
  
  // Keep current difficulty for scores 61-89
  return currentDifficulty;
};

export const mockScoringResponse = (
  userDefinition: string,
  realDefinition: string
): ScoringResponse => {
  // This is a mock implementation - will be replaced with OpenAI API call
  const similarity = calculateTextSimilarity(userDefinition, realDefinition);
  const score = Math.round(similarity * 100);
  
  return {
    score: Math.max(0, Math.min(100, score)),
    feedback: generateMockFeedback(score),
    confidence: 0.85,
  };
};

const calculateTextSimilarity = (text1: string, text2: string): number => {
  // Simple mock similarity calculation
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
};

const generateMockFeedback = (score: number): string => {
  if (score >= 90) {
    return 'Excellent understanding! You captured the essence perfectly.';
  } else if (score >= 75) {
    return 'Good grasp of the concept. Consider including more specific details.';
  } else if (score >= 60) {
    return 'Partial understanding. Review the definition to improve accuracy.';
  } else {
    return 'The definition needs work. Focus on the core meaning and context.';
  }
}; 