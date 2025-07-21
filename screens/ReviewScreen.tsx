import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { fonts } from '../styles/fonts';
import { getPrioritizedWordList, WordEntry } from '../utils/wordlist';
import { loadUserProgress } from '../utils/storage';

const { width } = Dimensions.get('window');

const ReviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [reviewList, setReviewList] = useState<WordEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [userRecall, setUserRecall] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [realDefinition, setRealDefinition] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    (async () => {
      const allWords = getPrioritizedWordList();
      const progress = await loadUserProgress();
      // Only include words with attempts > 0
      const reviewed = allWords.filter(w => progress[w.word] && progress[w.word].attempts > 0);
      setReviewList(reviewed);
      setCurrentIndex(0);
      setCurrentWord(reviewed[0]?.word || '');
      setRealDefinition(reviewed[0]?.word || '');
      setStreak(0);
    })();
  }, []);

  const handleSubmit = () => {
    if (!userRecall.trim()) {
      Alert.alert('Error', 'Please enter your recall');
      return;
    }
    setIsRevealed(true);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < reviewList.length) {
      setCurrentIndex(nextIndex);
      setCurrentWord(reviewList[nextIndex].word);
      setRealDefinition(reviewList[nextIndex].word);
      setUserRecall('');
      setIsRevealed(false);
      setStreak(prev => prev + 1);
    } else {
      Alert.alert('End of review', 'You have reviewed all words!');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" />
      
      {/* Navigation Bar */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderBottomWidth: theme.borderWidth.thick,
        borderBottomColor: theme.colors.border,
        height: 60,
        paddingHorizontal: 0,
        marginTop: 50,
      }}>
        {/* Back Button */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            height: '100%',
            paddingHorizontal: theme.spacing.xl,
          }}
          onPress={() => navigation.navigate('Landing')}
        >
          <Ionicons name="arrow-back" size={20} color={theme.colors.textInverted} />
          <Text style={{
            color: theme.colors.textInverted,
            fontFamily: fonts.monoBold,
            fontSize: theme.fontSize.md,
            marginLeft: theme.spacing.sm,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
          }}>
            BACK
          </Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: theme.colors.text,
            fontFamily: fonts.monoBlack,
            fontSize: theme.fontSize.lg,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.normal,
          }}>
            RETENTION DRILL
          </Text>
        </View>

        {/* Streak Counter */}
        <View style={{
          backgroundColor: theme.colors.primary,
          height: '100%',
          paddingHorizontal: theme.spacing.xl,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: theme.colors.textInverted,
            fontFamily: fonts.monoBlack,
            fontSize: theme.fontSize.sm,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
          }}>
            STREAK: {streak}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={{
          paddingVertical: theme.spacing.xxxl,
          borderBottomWidth: theme.borderWidth.normal,
          borderBottomColor: theme.colors.borderMuted,
          marginBottom: theme.spacing.xl,
        }}>
          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: theme.fontSize.sm,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
            marginBottom: theme.spacing.lg,
          }}>
            VOCABULARY.PROCESSING.SYSTEM.V3 - RETENTION DRILL MODE
          </Text>
          
          <Text style={{
            color: theme.colors.text,
            fontFamily: fonts.monoBlack,
            fontSize: theme.fontSize.xxxxl,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.wide,
            textAlign: 'center',
          }}>
            {currentWord}
          </Text>
        </View>

        {!isRevealed ? (
          <View>
            {/* Input Section */}
            <View style={{
              backgroundColor: theme.colors.surface,
              borderWidth: theme.borderWidth.normal,
              borderColor: theme.colors.border,
              padding: theme.spacing.xl,
              marginBottom: theme.spacing.xl,
            }}>
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.lg,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
                marginBottom: theme.spacing.lg,
              }}>
                RECALL DEFINITION:
              </Text>
              
              <TextInput
                style={{
                  backgroundColor: theme.colors.background,
                  borderWidth: theme.borderWidth.normal,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  fontFamily: fonts.mono,
                  fontSize: theme.fontSize.md,
                  padding: theme.spacing.lg,
                  minHeight: 120,
                  textAlignVertical: 'top',
                }}
                value={userRecall}
                onChangeText={setUserRecall}
                placeholder="TYPE WHAT YOU REMEMBER..."
                placeholderTextColor={theme.colors.textMuted}
                multiline
                numberOfLines={6}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.lg,
                paddingHorizontal: theme.spacing.xl,
                alignItems: 'center',
                marginBottom: theme.spacing.lg,
              }}
              onPress={handleSubmit}
            >
              <Text style={{
                color: theme.colors.textInverted,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.xl,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
              }}>
                VERIFY RECALL
              </Text>
            </TouchableOpacity>
            {/* Skip Button (before submission) */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.surface,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.lg,
                paddingHorizontal: theme.spacing.xl,
                alignItems: 'center',
              }}
              onPress={handleNext}
            >
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.xl,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
              }}>
                SKIP
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Results Section */}
            <View style={{
              backgroundColor: theme.colors.surface,
              borderWidth: theme.borderWidth.normal,
              borderColor: theme.colors.border,
              padding: theme.spacing.xl,
              marginBottom: theme.spacing.xl,
            }}>
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.lg,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
                marginBottom: theme.spacing.lg,
              }}>
                VERIFICATION RESULTS:
              </Text>
              
              {/* User Recall */}
              <View style={{ marginBottom: theme.spacing.lg }}>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                  marginBottom: theme.spacing.sm,
                }}>
                  YOUR RECALL:
                </Text>
                <View style={{
                  backgroundColor: theme.colors.background,
                  borderWidth: theme.borderWidth.normal,
                  borderColor: theme.colors.borderMuted,
                  padding: theme.spacing.lg,
                }}>
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.mono,
                    fontSize: theme.fontSize.md,
                    lineHeight: 20,
                  }}>
                    {userRecall}
                  </Text>
                </View>
              </View>

              {/* Actual Definition */}
              <View style={{ marginBottom: theme.spacing.lg }}>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                  marginBottom: theme.spacing.sm,
                }}>
                  STORED DEFINITION:
                </Text>
                <View style={{
                  backgroundColor: theme.colors.background,
                  borderWidth: theme.borderWidth.normal,
                  borderColor: theme.colors.borderMuted,
                  padding: theme.spacing.lg,
                }}>
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.mono,
                    fontSize: theme.fontSize.md,
                    lineHeight: 20,
                  }}>
                    {realDefinition}
                  </Text>
                </View>
              </View>
            </View>

            {/* Next and Skip Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: theme.spacing.lg }}>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.primary,
                  borderWidth: theme.borderWidth.normal,
                  borderColor: theme.colors.border,
                  paddingVertical: theme.spacing.lg,
                  paddingHorizontal: theme.spacing.xl,
                  alignItems: 'center',
                  flex: 1,
                  marginRight: theme.spacing.lg / 2,
                }}
                onPress={handleNext}
              >
                <Text style={{
                  color: theme.colors.textInverted,
                  fontFamily: fonts.monoBlack,
                  fontSize: theme.fontSize.xl,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.normal,
                }}>
                  NEXT RETENTION UNIT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.surface,
                  borderWidth: theme.borderWidth.normal,
                  borderColor: theme.colors.border,
                  paddingVertical: theme.spacing.lg,
                  paddingHorizontal: theme.spacing.xl,
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: theme.spacing.lg / 2,
                }}
                onPress={handleNext}
              >
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBlack,
                  fontSize: theme.fontSize.xl,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.normal,
                }}>
                  SKIP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Status Bar */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
      }}>
        <Text style={{
          color: theme.colors.textInverted,
          fontFamily: fonts.monoBold,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        }}>
          {isRevealed ? 'VERIFICATION COMPLETE' : 'AWAITING RECALL'}
        </Text>
        <Text style={{
          color: theme.colors.textInverted,
          fontFamily: fonts.monoBold,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        }}>
          CPU: 45% | RAM: 768MB | NET: SECURE
        </Text>
        <Text style={{
          color: theme.colors.textInverted,
          fontFamily: fonts.monoBold,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        }}>
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </Text>
      </View>
    </View>
  );
};

export default ReviewScreen; 