import React, { useState, useEffect, useRef } from 'react';
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
import { getPrioritizedWordList } from '../utils/wordlist';
import { loadUserProgress, getTotalUptime, incrementTotalUptime } from '../utils/storage';

const { width } = Dimensions.get('window');

const LandingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [metrics, setMetrics] = useState({
    wordsCollected: 0,
    wordsMastered: 0, // Placeholder, to be implemented
    accuracyRate: 0,
  });
  const [totalUptime, setTotalUptime] = useState(0);
  const sessionStartRef = useRef(Date.now());

  useEffect(() => {
    (async () => {
      const wordList = getPrioritizedWordList();
      const progress = await loadUserProgress();
      const attempted = Object.values(progress);
      const wordsCollected = wordList.length;
      // Placeholder: words mastered (to be implemented)
      const wordsMastered = 0;
      // Calculate average accuracy
      let accuracyRate = 0;
      if (attempted.length > 0) {
        const scores = attempted.map(w => w.lastScore || 0);
        accuracyRate = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      }
      setMetrics({ wordsCollected, wordsMastered, accuracyRate });
      // Load total uptime
      const uptime = await getTotalUptime();
      setTotalUptime(uptime);
      sessionStartRef.current = Date.now();
    })();
    // On unmount, update total uptime
    return () => {
      const sessionSeconds = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      if (sessionSeconds > 0) incrementTotalUptime(sessionSeconds);
    };
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Update uptime every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalUptime(uptime => uptime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatUptime(seconds: number) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

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
            color: theme.colors.success, // green
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
            UPTIME: {formatUptime(totalUptime)}
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

      <ScrollView
        style={{ flex: 1, paddingHorizontal: theme.spacing.xxxl }}
        contentContainerStyle={{ paddingBottom: theme.spacing.xxxxl }}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Header Section */}
          <View style={{
            paddingVertical: theme.spacing.lg, // smaller
            borderBottomWidth: theme.borderWidth.thick,
            borderBottomColor: theme.colors.borderMuted,
            marginBottom: theme.spacing.lg, // smaller
          }}>
            {/* Logo removed */}
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.monoBold,
              fontSize: theme.fontSize.md, // smaller
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
            padding: theme.spacing.lg, // smaller
            marginBottom: theme.spacing.lg, // smaller
          }}>
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.sm, // smaller
              marginBottom: theme.spacing.xs,
            }}>
              {'>'} INITIALIZING VOCABULARY PROCESSOR...
            </Text>
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.sm, // smaller
              marginBottom: theme.spacing.xs,
            }}>
              {'>'} LOADING WORD DATABASES...
            </Text>
            <Text style={{
              color: theme.colors.textMuted,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.sm, // smaller
              marginBottom: theme.spacing.xs,
            }}>
              {'>'} NEURAL NETWORKS READY
            </Text>
            <Text style={{
              color: theme.colors.text,
              fontFamily: fonts.mono,
              fontSize: theme.fontSize.sm, // smaller
            }}>
              {'>'} AWAITING INPUT_
            </Text>
          </View>

          {/* Mode Selection Section */}
          <View style={{
            marginBottom: theme.spacing.lg, // smaller
          }}>
            <Text style={{
              color: theme.colors.text,
              fontFamily: fonts.monoBlack,
              fontSize: theme.fontSize.lg, // smaller
              textTransform: 'uppercase',
              letterSpacing: theme.letterSpacing.normal,
              marginBottom: theme.spacing.md, // smaller
              textAlign: 'center',
            }}>
              SELECT OPERATION MODE
            </Text>
            <View style={{ gap: theme.spacing.md }}>
              {/* New Acquisition Mode */}
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.surface,
                  borderWidth: theme.borderWidth.thick,
                  borderColor: theme.colors.border,
                  padding: theme.spacing.lg, // smaller
                }}
                onPress={() => navigation.navigate('NewWord')}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing.sm, // smaller
                }}>
                  <View style={{
                    width: 28, // smaller
                    height: 28, // smaller
                    backgroundColor: theme.colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{
                      color: theme.colors.textInverted,
                      fontFamily: fonts.monoBlack,
                      fontSize: theme.fontSize.lg, // smaller
                    }}>
                      01
                    </Text>
                  </View>
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.monoBlack,
                    fontSize: theme.fontSize.lg, // smaller
                  }}>
                    ▶
                  </Text>
                </View>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBlack,
                  fontSize: theme.fontSize.md, // smaller
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.normal,
                  marginBottom: theme.spacing.xs, // smaller
                }}>
                  NEW ACQUISITION
                </Text>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.sm, // smaller
                  lineHeight: 18,
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
                  padding: theme.spacing.lg, // smaller
                }}
                onPress={() => navigation.navigate('Review')}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing.sm, // smaller
                }}>
                  <View style={{
                    width: 28, // smaller
                    height: 28, // smaller
                    backgroundColor: theme.colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{
                      color: theme.colors.textInverted,
                      fontFamily: fonts.monoBlack,
                      fontSize: theme.fontSize.lg, // smaller
                    }}>
                      02
                    </Text>
                  </View>
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.monoBlack,
                    fontSize: theme.fontSize.lg, // smaller
                  }}>
                    ↻
                  </Text>
                </View>
                <Text style={{
                  color: theme.colors.text,
                  fontFamily: fonts.monoBlack,
                  fontSize: theme.fontSize.md, // smaller
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.normal,
                  marginBottom: theme.spacing.xs, // smaller
                }}>
                  RETENTION DRILL
                </Text>
                <Text style={{
                  color: theme.colors.textMuted,
                  fontFamily: fonts.monoBold,
                  fontSize: theme.fontSize.sm, // smaller
                  lineHeight: 18,
                  textTransform: 'uppercase',
                  letterSpacing: theme.letterSpacing.tight,
                }}>
                  TEST RETENTION OF PREVIOUSLY PROCESSED VOCABULARY
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section */}
          <View style={{
            backgroundColor: theme.colors.surface,
            borderWidth: theme.borderWidth.thick,
            borderColor: theme.colors.border,
            marginBottom: theme.spacing.lg, // smaller
            overflow: 'hidden',
          }}>
            <View style={{
              backgroundColor: theme.colors.primary,
              paddingVertical: theme.spacing.sm, // smaller
              paddingHorizontal: theme.spacing.lg, // smaller
            }}>
              <Text style={{
                color: theme.colors.textInverted,
                fontFamily: fonts.monoBlack,
                fontSize: theme.fontSize.md, // smaller
                textTransform: 'uppercase',
                letterSpacing: theme.letterSpacing.normal,
              }}>
                SYSTEM METRICS
              </Text>
            </View>
            <View style={{
              flexDirection: width > 768 ? 'row' : 'column',
              height: width > 768 ? 80 : 'auto', // smaller
            }}>
              {[{
                number: metrics.wordsCollected,
                label: 'WORDS COLLECTED',
              }, {
                number: metrics.wordsMastered,
                label: 'WORDS MASTERED',
              }, {
                number: metrics.accuracyRate + '%',
                label: 'ACCURACY RATE',
              }].map((stat, index) => (
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
                    padding: theme.spacing.md, // smaller
                  }}
                >
                  <Text style={{
                    color: theme.colors.text,
                    fontFamily: fonts.monoBlack,
                    fontSize: theme.fontSize.xl, // smaller
                    marginBottom: theme.spacing.xs,
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