import { useState, useEffect } from 'react';
import { Word } from '../types';

// Mock word data - will be replaced with API calls
const mockWords: Word[] = [
  {
    id: '1',
    word: 'serendipity',
    definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    difficulty: 'medium',
    timesReviewed: 0,
    averageScore: 0,
  },
  {
    id: '2',
    word: 'ephemeral',
    definition: 'Lasting for a very short time; transitory.',
    difficulty: 'medium',
    timesReviewed: 0,
    averageScore: 0,
  },
  {
    id: '3',
    word: 'ubiquitous',
    definition: 'Present, appearing, or found everywhere.',
    difficulty: 'hard',
    timesReviewed: 0,
    averageScore: 0,
  },
];

export const useWordQueue = () => {
  const [words, setWords] = useState<Word[]>(mockWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState<Word[]>([]);

  const currentWord = words[currentIndex];

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset to beginning or fetch new words
      setCurrentIndex(0);
    }
  };

  const markWordAsLearned = (word: Word, score: number) => {
    const updatedWord = {
      ...word,
      timesReviewed: word.timesReviewed + 1,
      averageScore: (word.averageScore * word.timesReviewed + score) / (word.timesReviewed + 1),
      lastReviewed: new Date(),
    };

    setLearnedWords(prev => [...prev, updatedWord]);
    
    // Remove from current queue
    setWords(prev => prev.filter(w => w.id !== word.id));
  };

  const getReviewWords = () => {
    return learnedWords.filter(word => {
      const daysSinceReview = word.lastReviewed 
        ? (new Date().getTime() - word.lastReviewed.getTime()) / (1000 * 60 * 60 * 24)
        : 999;
      
      // Review words after 1 day, then 3 days, then 7 days, etc.
      return daysSinceReview >= 1;
    });
  };

  return {
    currentWord,
    words,
    learnedWords,
    nextWord,
    markWordAsLearned,
    getReviewWords,
  };
}; 