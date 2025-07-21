import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PROGRESS_KEY = 'user_progress';

export interface UserProgress {
  [word: string]: {
    attempts: number;
    lastScore: number;
    lastDefinition: string;
    lastFeedback: string;
    lastAIDefinition?: string;
    // Add more fields as needed
  };
}

export async function saveUserProgress(progress: UserProgress) {
  await AsyncStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(progress));
}

export async function loadUserProgress(): Promise<UserProgress> {
  const data = await AsyncStorage.getItem(USER_PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
}

export async function updateWordProgress(
  word: string,
  update: Partial<UserProgress[string]>
) {
  const progress = await loadUserProgress();
  progress[word] = { ...progress[word], ...update };
  await saveUserProgress(progress);
} 