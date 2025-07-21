import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { fonts } from '../styles/fonts';
import { loadUserProgress, UserProgress } from '../utils/storage';

const AnalyticsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [wordsAttempted, setWordsAttempted] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    (async () => {
      const progress: UserProgress = await loadUserProgress();
      const words = Object.values(progress);
      setWordsAttempted(words.length);
      if (words.length > 0) {
        const scores = words.map(w => w.lastScore || 0);
        setAverageAccuracy(
          Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        );
        // Calculate best streak (consecutive scores >= 70)
        let streak = 0;
        let maxStreak = 0;
        for (const w of words) {
          if (w.lastScore >= 70) {
            streak++;
            if (streak > maxStreak) maxStreak = streak;
          } else {
            streak = 0;
          }
        }
        setBestStreak(maxStreak);
      } else {
        setAverageAccuracy(0);
        setBestStreak(0);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" />
      {/* Terminal-style header with Back Button */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderBottomWidth: theme.borderWidth.thick,
        borderBottomColor: theme.colors.border,
        paddingVertical: theme.spacing.xl,
        paddingHorizontal: theme.spacing.xl,
      }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            borderWidth: theme.borderWidth.thick,
            borderColor: theme.colors.border,
            marginRight: theme.spacing.xl,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{
            color: theme.colors.textInverted,
            fontFamily: fonts.monoBold,
            fontSize: theme.fontSize.md,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
          }}>
            BACK
          </Text>
        </TouchableOpacity>
        <Text style={{
          color: theme.colors.text,
          fontFamily: fonts.monoBlack,
          fontSize: theme.fontSize.lg,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.normal,
        }}>
          USER ANALYTICS
        </Text>
      </View>
      <ScrollView style={{ flex: 1, padding: theme.spacing.xl }}>
        <View style={{
          backgroundColor: theme.colors.surface,
          borderWidth: theme.borderWidth.normal,
          borderColor: theme.colors.border,
          padding: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
        }}>
          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.monoBold,
            fontSize: theme.fontSize.md,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
            marginBottom: theme.spacing.lg,
          }}>
            WORDS ATTEMPTED:
          </Text>
          <Text style={{
            color: theme.colors.text,
            fontFamily: fonts.monoBlack,
            fontSize: theme.fontSize.xl,
            marginBottom: theme.spacing.xl,
          }}>{wordsAttempted}</Text>

          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.monoBold,
            fontSize: theme.fontSize.md,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
            marginBottom: theme.spacing.lg,
          }}>
            AVERAGE ACCURACY:
          </Text>
          <Text style={{
            color: theme.colors.text,
            fontFamily: fonts.monoBlack,
            fontSize: theme.fontSize.xl,
            marginBottom: theme.spacing.xl,
          }}>{averageAccuracy}%</Text>

          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.monoBold,
            fontSize: theme.fontSize.md,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
            marginBottom: theme.spacing.lg,
          }}>
            BEST STREAK (≥ 70%):
          </Text>
          <Text style={{
            color: theme.colors.text,
            fontFamily: fonts.monoBlack,
            fontSize: theme.fontSize.xl,
          }}>{bestStreak}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AnalyticsScreen; 