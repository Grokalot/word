import React, { useState } from 'react';
import {
  View,
  Text,
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

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStats] = useState({
    wordsLearned: 47,
    currentStreak: 12,
    longestStreak: 23,
    averageAccuracy: 87,
  });

  const handleSignIn = () => {
    // TODO: Implement Google Sign-In
    Alert.alert('Sign In', 'Google Sign-In will be implemented here');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', onPress: () => setIsLoggedIn(false) }
      ]
    );
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
          onPress={() => navigation.goBack()}
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
            USER PROFILE
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
            VOCABULARY.PROCESSING.SYSTEM.V3 - USER CONFIGURATION
          </Text>
          
          <Text style={{
            color: theme.colors.text,
            fontFamily: fonts.monoBlack,
            fontSize: theme.fontSize.xxxxl,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.wide,
            textAlign: 'center',
          }}>
            PROFILE
          </Text>
        </View>

        {!isLoggedIn ? (
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
              AUTHENTICATION REQUIRED
            </Text>
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.md,
              lineHeight: 20,
              marginBottom: theme.spacing.xl,
            }}>
              Sign in to sync your progress and access all features
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.primary,
                borderWidth: theme.borderWidth.thick,
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.xl,
                paddingHorizontal: theme.spacing.xxxl,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleSignIn}
            >
              <Ionicons name="logo-google" size={20} color={theme.colors.textInverted} style={{ marginRight: theme.spacing.sm }} />
              <Text style={{
                color: theme.colors.textInverted,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.lg,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
              }}>
                SIGN IN WITH GOOGLE
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
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
              USER STATISTICS
            </Text>
            
            <View style={{ gap: theme.spacing.md }}>
              <View style={{
                backgroundColor: theme.colors.background,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.borderMuted,
                padding: theme.spacing.lg,
              }}>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                }}>
                  WORDS PROCESSED: {userStats.wordsLearned}
                </Text>
              </View>
              
              <View style={{
                backgroundColor: theme.colors.background,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.borderMuted,
                padding: theme.spacing.lg,
              }}>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                }}>
                  CURRENT STREAK: {userStats.currentStreak} DAYS
                </Text>
              </View>
              
              <View style={{
                backgroundColor: theme.colors.background,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.borderMuted,
                padding: theme.spacing.lg,
              }}>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                }}>
                  LONGEST STREAK: {userStats.longestStreak} DAYS
                </Text>
              </View>
              
              <View style={{
                backgroundColor: theme.colors.background,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.borderMuted,
                padding: theme.spacing.lg,
              }}>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                }}>
                  AVERAGE ACCURACY: {userStats.averageAccuracy}%
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.error,
                borderWidth: theme.borderWidth.thick,
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.xl,
                paddingHorizontal: theme.spacing.xxxl,
                alignItems: 'center',
                marginTop: theme.spacing.xl,
              }}
              onPress={handleSignOut}
            >
              <Text style={{
                color: theme.colors.textInverted,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.lg,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
              }}>
                TERMINATE SESSION
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Settings Section */}
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
            SYSTEM CONFIGURATION
          </Text>
          
          <View style={{ gap: theme.spacing.md }}>
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.background,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.borderMuted,
                padding: theme.spacing.lg,
              }}
              onPress={() => Alert.alert('Settings', 'Notification settings will be implemented here')}
            >
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBold,
                fontSize: theme.fontSize.md,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.tight,
              }}>
                NOTIFICATION PROTOCOLS
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.background,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.borderMuted,
                padding: theme.spacing.lg,
              }}
              onPress={() => Alert.alert('Settings', 'Difficulty settings will be implemented here')}
            >
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBold,
                fontSize: theme.fontSize.md,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.tight,
              }}>
                DIFFICULTY PARAMETERS
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.background,
                borderWidth: theme.borderWidth.normal,
                borderColor: theme.colors.borderMuted,
                padding: theme.spacing.lg,
              }}
              onPress={() => Alert.alert('Settings', 'Export data will be implemented here')}
            >
              <Text style={{
                color: theme.colors.text,
                fontFamily: fonts.monoBold,
                fontSize: theme.fontSize.md,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.tight,
              }}>
                EXPORT DATA STREAM
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
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
            SYSTEM INFORMATION
          </Text>
          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: theme.fontSize.md,
            lineHeight: 20,
          }}>
            WORD! v1.0.0{'\n'}
            VOCABULARY ACQUISITION TERMINAL{'\n'}
            BUILT WITH REACT NATIVE AND EXPO{'\n'}
            BRUTALIST UI DESIGN SYSTEM
          </Text>
        </View>
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
          {isLoggedIn ? 'AUTHENTICATED' : 'UNAUTHENTICATED'}
        </Text>
        <Text style={{
          color: theme.colors.textInverted,
          fontFamily: fonts.monoBold,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        }}>
          CPU: 12% | RAM: 256MB | NET: SECURE
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

export default ProfileScreen; 