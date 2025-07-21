import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { fonts } from '../styles/fonts';

const { width } = Dimensions.get('window');

const LandingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />
      
      {/* Noise Overlay Effect */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.02,
        backgroundColor: '#333',
        zIndex: -1,
      }} />

      {/* System Info Bar */}
      <View style={{
        backgroundColor: theme.colors.surface,
        height: 80,
        marginTop: 50,
        marginRight: 60, // Reserve space for profile button
        paddingHorizontal: theme.spacing.lg,
        justifyContent: 'center',
      }}>
        {/* Top Row - Long Text */}
        <Text style={{
          color: theme.colors.textMuted,
          fontFamily: fonts.mono,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
          marginBottom: theme.spacing.sm,
        }}>
          VOCABULARY.PROCESSING.SYSTEM.V3
        </Text>
        
        {/* Bottom Row - Status and Uptime */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: theme.fontSize.sm,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
          }}>
            STATUS: ACTIVE
          </Text>
          
          <Text style={{
            color: theme.colors.textMuted,
            fontFamily: fonts.mono,
            fontSize: theme.fontSize.sm,
            textTransform: 'uppercase',
            letterSpacing: theme.letterSpacing.tight,
          }}>
            UPTIME: 127:45:32
          </Text>
        </View>
      </View>

      {/* Full Width Border */}
      <View style={{
        position: 'absolute',
        top: 130, // 50 + 80 to align with bottom of system info bar
        left: 0,
        right: 0,
        height: theme.borderWidth.thick,
        backgroundColor: theme.colors.border,
      }} />

      {/* Small Profile Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 50,
          right: theme.spacing.lg,
          width: 40,
          height: 40,
          backgroundColor: theme.colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
        onPress={() => navigation.navigate('Profile')}
      >
        <View style={{
          width: 16,
          height: 16,
          backgroundColor: theme.colors.primary,
          borderRadius: 8,
        }} />
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, paddingHorizontal: theme.spacing.xxxl }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header Section */}
          <View style={{
            paddingVertical: theme.spacing.xxxxl,
            borderBottomWidth: theme.borderWidth.thick,
            borderBottomColor: theme.colors.borderMuted,
            marginBottom: theme.spacing.xxxl,
          }}>
            {/* Logo */}
            <Text style={{
              color: theme.colors.text,
              fontFamily: fonts.monoBlack,
              fontSize: theme.fontSize.xxxxxl,
              marginBottom: theme.spacing.lg,
              letterSpacing: theme.letterSpacing.extraWide,
              textTransform: 'uppercase',
              lineHeight: 0.9,
            }}>
              WORD!
            </Text>
            
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.monoBold,
              fontSize: theme.fontSize.xl,
              textTransform: 'uppercase',
              letterSpacing: theme.letterSpacing.wide,
            }}>
              VOCABULARY ACQUISITION TERMINAL
            </Text>
          </View>

          {/* Terminal Output */}
          <View style={{
            backgroundColor: theme.colors.surface,
            borderWidth: theme.borderWidth.thick,
            borderColor: theme.colors.border,
            padding: theme.spacing.xl,
            marginBottom: theme.spacing.xxxl,
          }}>
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.md,
              marginBottom: theme.spacing.xs,
            }}>
              {'>'} INITIALIZING VOCABULARY PROCESSOR...
            </Text>
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.md,
              marginBottom: theme.spacing.xs,
            }}>
              {'>'} LOADING WORD DATABASES...
            </Text>
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.md,
              marginBottom: theme.spacing.xs,
            }}>
              {'>'} NEURAL NETWORKS READY
            </Text>
            <Text style={{
              color: theme.colors.text,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.md,
            }}>
              {'>'} AWAITING INPUT_
            </Text>
          </View>

          {/* Mode Selection Section */}
          <View style={{
            marginBottom: theme.spacing.xxxxl,
          }}>
            <Text style={{
              color: theme.colors.text,
              fontFamily: fonts.monoBlack,
              fontSize: theme.fontSize.xl,
              textTransform: 'uppercase',
              letterSpacing: theme.letterSpacing.normal,
              marginBottom: theme.spacing.xl,
              textAlign: 'center',
            }}>
              SELECT OPERATION MODE
            </Text>
            
            <View style={{ gap: theme.spacing.xl }}>
              {/* New Acquisition Mode */}
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.surface,
                  borderWidth: theme.borderWidth.thick,
                  borderColor: theme.colors.border,
                  padding: theme.spacing.xxxl,
                }}
                onPress={() => navigation.navigate('NewWord')}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing.lg,
                }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: theme.colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{
                      color: theme.colors.textInverted,
                      fontFamily: fonts.monoBlack,
                      fontSize: theme.fontSize.xxxl,
                    }}>
                      01
                    </Text>
                  </View>
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.monoBlack,
                    fontSize: theme.fontSize.xxxl,
                  }}>
                    ▶
                  </Text>
                </View>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBlack,
                  fontSize: theme.fontSize.xl,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.normal,
                  marginBottom: theme.spacing.md,
                }}>
                  NEW ACQUISITION
                </Text>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  lineHeight: 20,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                }}>
                  PROCESS UNKNOWN VOCABULARY UNITS FOR NEURAL INTEGRATION
                </Text>
              </TouchableOpacity>

              {/* Retention Drill Mode */}
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.surface,
                  borderWidth: theme.borderWidth.thick,
                  borderColor: theme.colors.border,
                  padding: theme.spacing.xxxl,
                }}
                onPress={() => navigation.navigate('Review')}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing.lg,
                }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: theme.colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{
                      color: theme.colors.textInverted,
                      fontFamily: fonts.monoBlack,
                      fontSize: theme.fontSize.xxxl,
                    }}>
                      02
                    </Text>
                  </View>
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.monoBlack,
                    fontSize: theme.fontSize.xxxl,
                  }}>
                    ↻
                  </Text>
                </View>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBlack,
                  fontSize: theme.fontSize.xl,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.normal,
                  marginBottom: theme.spacing.md,
                }}>
                  RETENTION DRILL
                </Text>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.md,
                  lineHeight: 20,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                }}>
                  REINFORCE EXISTING PATTERNS THROUGH SYSTEMATIC REPETITION
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section */}
          <View style={{
            backgroundColor: theme.colors.surface,
            borderWidth: theme.borderWidth.thick,
            borderColor: theme.colors.border,
            marginBottom: theme.spacing.xxxl,
            overflow: 'hidden',
          }}>
            <View style={{
              backgroundColor: theme.colors.primary,
              paddingVertical: theme.spacing.lg,
              paddingHorizontal: theme.spacing.xxxl,
            }}>
              <Text style={{
                color: theme.colors.textInverted,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.lg,
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
              }}>
                SYSTEM METRICS
              </Text>
            </View>
            
            <View style={{
              flexDirection: width > 768 ? 'row' : 'column',
              height: width > 768 ? 120 : 'auto',
            }}>
              {[
                { number: '4,096', label: 'WORDS PROCESSED' },
                { number: '32', label: 'ACTIVE DATASETS' },
                { number: '98.7%', label: 'ACCURACY RATE' },
              ].map((stat, index) => (
                <View
                  key={stat.label}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRightWidth: index < 2 ? theme.borderWidth.normal : 0,
                    borderRightColor: theme.colors.borderMuted,
                    borderBottomWidth: width <= 768 && index < 2 ? theme.borderWidth.normal : 0,
                    borderBottomColor: theme.colors.borderMuted,
                    padding: theme.spacing.lg,
                  }}
                >
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.monoBlack,
                    fontSize: theme.fontSize.xxxxl,
                    marginBottom: theme.spacing.sm,
                  }}>
                    {stat.number}
                  </Text>
                  <Text style={{
                    color: theme.colors.textMuted,
                    fontFamily: fonts.monoBlack,
                    fontSize: theme.fontSize.xs,
                    textTransform: 'uppercase',
                    letterSpacing: theme.letterSpacing.tight,
                    textAlign: 'center',
                  }}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
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
          READY
        </Text>
        <Text style={{
          color: theme.colors.textInverted,
          fontFamily: fonts.monoBold,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        }}>
          CPU: 23% | RAM: 512MB | NET: SECURE
        </Text>
        <Text style={{
          color: theme.colors.textInverted,
          fontFamily: fonts.monoBold,
          fontSize: theme.fontSize.sm,
          textTransform: 'uppercase',
          letterSpacing: theme.letterSpacing.tight,
        }}>
          {formatTime(currentTime)}
        </Text>
      </View>
    </View>
  );
};

export default LandingScreen; 