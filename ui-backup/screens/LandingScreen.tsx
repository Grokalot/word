import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ScrollView style={{ flex: 1, padding: 16, paddingTop: 50 }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Terminal Header */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 12, marginBottom: 8 }}>
              {formatTime(currentTime)} - LexCell Terminal v1.0.0
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 12, marginBottom: 16 }}>
              {formatDate(currentTime)}
            </Text>
            <View style={{ 
              width: '100%', 
              height: 1, 
              backgroundColor: '#00FF00', 
              marginBottom: 16 
            }} />
          </View>

          {/* App Title */}
          <View style={{ marginBottom: 48, alignItems: 'center' }}>
            <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 48, marginBottom: 16 }}>
              LEXCELL
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 16, textAlign: 'center' }}>
              VOCABULARY LEARNING TERMINAL
            </Text>
          </View>

          {/* App Description */}
          <View style={{ marginBottom: 48 }}>
            <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 16 }}>
              SYSTEM OVERVIEW:
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 14, lineHeight: 20, marginBottom: 16 }}>
              LexCell is a brutalist vocabulary learning application designed for maximum efficiency and minimal distraction.
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 14, lineHeight: 20, marginBottom: 16 }}>
              Features AI-powered definition scoring, adaptive difficulty, and comprehensive progress tracking.
            </Text>
          </View>

          {/* Feature List */}
          <View style={{ marginBottom: 48 }}>
            <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 16 }}>
              CORE MODULES:
            </Text>
            
            <View style={{ backgroundColor: '#006600', padding: 16, marginBottom: 8 }}>
              <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 16, marginBottom: 4 }}>
                {'>'} NEW WORD MODULE
              </Text>
              <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 12 }}>
                Learn new vocabulary with AI scoring
              </Text>
            </View>
            
            <View style={{ backgroundColor: '#006600', padding: 16, marginBottom: 8 }}>
              <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 16, marginBottom: 4 }}>
                {'>'} REVIEW MODULE
              </Text>
              <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 12 }}>
                Recall previously learned words
              </Text>
            </View>
            
            <View style={{ backgroundColor: '#006600', padding: 16, marginBottom: 8 }}>
              <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 16, marginBottom: 4 }}>
                {'>'} PROGRESS TRACKING
              </Text>
              <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 12 }}>
                Monitor streaks and accuracy
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 16 }}>
              INITIALIZE SYSTEM:
            </Text>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#00FF00',
                paddingVertical: 20,
                paddingHorizontal: 24,
                marginBottom: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('Main')}
            >
              <Ionicons name="play" size={24} color="#000000" style={{ marginRight: 8 }} />
              <Text style={{ color: '#000000', fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold' }}>
                START LEARNING
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#006600',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderWidth: 1,
                borderColor: '#00FF00',
              }}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={{ color: '#00FF00', fontFamily: 'monospace', textAlign: 'center', fontSize: 16 }}>
                ACCESS PROFILE
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={{ 
            borderTopWidth: 1, 
            borderTopColor: '#00FF00', 
            paddingTop: 16,
            alignItems: 'center'
          }}>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 12, textAlign: 'center' }}>
              LEXCELL TERMINAL - READY FOR INPUT{'\n'}
              PRESS ANY KEY TO CONTINUE...
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default LandingScreen; 