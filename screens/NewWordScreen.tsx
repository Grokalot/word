import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');

const NewWordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState('serendipity');
  const [userDefinition, setUserDefinition] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!userDefinition.trim()) {
      Alert.alert('Error', 'Please enter your definition');
      return;
    }
    
    // TODO: Send to OpenAI for scoring
    setIsSubmitted(true);
    setScore(85); // Mock score for now
    setFeedback('Good understanding! You captured the essence of unexpected discovery.');
  };

  const handleNext = () => {
    setCurrentWord('ephemeral');
    setUserDefinition('');
    setIsSubmitted(false);
    setScore(null);
    setFeedback('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />
      
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
            NEW ACQUISITION
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ width: 100 }} />
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: theme.spacing.xxxl }}>
        {/* Header Section */}
        <View style={{
          paddingVertical: theme.spacing.xxxxl,
          borderBottomWidth: theme.borderWidth.thick,
          borderBottomColor: theme.colors.borderMuted,
          marginBottom: theme.spacing.xxxl,
        }}>
          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: theme.fontSize.sm,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
            marginBottom: theme.spacing.lg,
          }}>
            VOCABULARY.PROCESSING.SYSTEM.V3 - NEW ACQUISITION MODE
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

        {!isSubmitted ? (
          <View>
            {/* Input Section */}
            <View style={{
              backgroundColor: theme.colors.surface,
              borderWidth: theme.borderWidth.thick,
              borderColor: theme.colors.border,
              padding: theme.spacing.xxxl,
              marginBottom: theme.spacing.xxxl,
            }}>
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.lg,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
                marginBottom: theme.spacing.lg,
              }}>
                ENTER DEFINITION:
              </Text>
              
              <TextInput
                style={{
                  backgroundColor: theme.colors.background,
                  borderWidth: theme.borderWidth.thick,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  fontFamily: fonts.mono,
                  fontSize: theme.fontSize.md,
                  padding: theme.spacing.xl,
                  minHeight: 120,
                  textAlignVertical: 'top',
                }}
                value={userDefinition}
                onChangeText={setUserDefinition}
                placeholder="TYPE YOUR DEFINITION HERE..."
                placeholderTextColor={theme.colors.textMuted}
                multiline
                numberOfLines={6}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderWidth: theme.borderWidth.thick,
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.xl,
                paddingHorizontal: theme.spacing.xxxl,
                alignItems: 'center',
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
                PROCESS DEFINITION
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {/* Results Section */}
            <View style={{
              backgroundColor: theme.colors.surface,
              borderWidth: theme.borderWidth.thick,
              borderColor: theme.colors.border,
              padding: theme.spacing.xxxl,
              marginBottom: theme.spacing.xxxl,
            }}>
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.lg,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
                marginBottom: theme.spacing.lg,
              }}>
                ANALYSIS RESULTS:
              </Text>
              
              {/* User Definition */}
              <View style={{ marginBottom: theme.spacing.xl }}>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                  marginBottom: theme.spacing.sm,
                }}>
                  YOUR DEFINITION:
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
                    {userDefinition}
                  </Text>
                </View>
              </View>

              {/* Score */}
              <View style={{ marginBottom: theme.spacing.xl }}>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                  marginBottom: theme.spacing.sm,
                }}>
                  ACCURACY SCORE: {score}/100
                </Text>
                <View style={{
                  width: '100%',
                  backgroundColor: theme.colors.background,
                  borderWidth: theme.borderWidth.normal,
                  borderColor: theme.colors.borderMuted,
                  height: 20,
                }}>
                  <View 
                    style={{
                      backgroundColor: theme.colors.primary,
                      height: '100%',
                      width: score ? `${score}%` : '0%',
                    }}
                  />
                </View>
              </View>

              {/* Feedback */}
              <View style={{ marginBottom: theme.spacing.xl }}>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                  marginBottom: theme.spacing.sm,
                }}>
                  NEURAL FEEDBACK:
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
                    {feedback}
                  </Text>
                </View>
              </View>
            </View>

            {/* Next Button */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderWidth: theme.borderWidth.thick,
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.xl,
                paddingHorizontal: theme.spacing.xxxl,
                alignItems: 'center',
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
                NEXT VOCABULARY UNIT
              </Text>
            </TouchableOpacity>
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
          {isSubmitted ? 'ANALYSIS COMPLETE' : 'AWAITING INPUT'}
        </Text>
        <Text style={{
          color: theme.colors.textInverted,
          fontFamily: fonts.monoBold,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        }}>
          CPU: 67% | RAM: 1.2GB | NET: SECURE
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

export default NewWordScreen; 