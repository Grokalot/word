import wordListRaw from '../assets/wordList.js';

export interface WordEntry {
  word: string;
  count: number;
  firstIndex: number; // Lower = more recent
}

// Utility to clean a word: remove whitespace, non-text, lowercase
function cleanWord(raw: string): string {
  return raw
    .replace(/[^a-zA-Z\-\s']/g, '') // keep letters, hyphens, apostrophes, spaces
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim()
    .toLowerCase();
}

// Reads and processes the word list (now synchronous)
export function getPrioritizedWordList(): WordEntry[] {
  // Clean and filter out empty lines
  const cleanedWords = wordListRaw
    .map(cleanWord)
    .filter(Boolean);

  // Count occurrences and track first (most recent) index
  const wordMap = new Map<string, WordEntry>();
  cleanedWords.forEach((word, idx) => {
    if (!wordMap.has(word)) {
      wordMap.set(word, { word, count: 1, firstIndex: idx });
    } else {
      const entry = wordMap.get(word)!;
      entry.count += 1;
    }
  });

  // Convert to array and sort: highest count first, then most recent (lowest index)
  const prioritized = Array.from(wordMap.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.firstIndex - b.firstIndex;
  });

  return prioritized;
} 