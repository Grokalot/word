import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ScrollView style={{ flex: 1, padding: 16, paddingTop: 50 }}>
        {/* Header with Back Button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#00FF00',
              padding: 8,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#00FF00',
              marginRight: 16,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </TouchableOpacity>
          
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 24, marginBottom: 8 }}>
              PROFILE
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 14 }}>
              User settings and statistics
            </Text>
          </View>
        </View>

        {!isLoggedIn ? (
          <View style={{ marginBottom: 32 }}>
            <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 16 }}>
              SIGN IN REQUIRED
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 14, marginBottom: 24 }}>
              Sign in to sync your progress and access all features
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#00FF00',
                paddingVertical: 16,
                paddingHorizontal: 24,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleSignIn}
            >
              <Ionicons name="logo-google" size={20} color="#000000" style={{ marginRight: 8 }} />
              <Text style={{ color: '#000000', fontFamily: 'monospace', fontWeight: 'bold' }}>
                SIGN IN WITH GOOGLE
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginBottom: 32 }}>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 16 }}>
                USER STATISTICS
              </Text>
              
              <View style={{ backgroundColor: '#006600', padding: 16, marginBottom: 8 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 16 }}>
                  WORDS LEARNED: {userStats.wordsLearned}
                </Text>
              </View>
              
              <View style={{ backgroundColor: '#006600', padding: 16, marginBottom: 8 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 16 }}>
                  CURRENT STREAK: {userStats.currentStreak} DAYS
                </Text>
              </View>
              
              <View style={{ backgroundColor: '#006600', padding: 16, marginBottom: 8 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 16 }}>
                  LONGEST STREAK: {userStats.longestStreak} DAYS
                </Text>
              </View>
              
              <View style={{ backgroundColor: '#006600', padding: 16, marginBottom: 8 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 16 }}>
                  AVERAGE ACCURACY: {userStats.averageAccuracy}%
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={{
                backgroundColor: '#FF0000',
                paddingVertical: 16,
                paddingHorizontal: 24,
              }}
              onPress={handleSignOut}
            >
              <Text style={{ color: '#000000', fontFamily: 'monospace', textAlign: 'center', fontWeight: 'bold' }}>
                SIGN OUT
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ marginBottom: 32 }}>
          <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 16 }}>
            SETTINGS
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#006600',
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginBottom: 8,
            }}
            onPress={() => Alert.alert('Settings', 'Notification settings will be implemented here')}
          >
            <Text style={{ color: '#00FF00', fontFamily: 'monospace' }}>
              NOTIFICATIONS
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#006600',
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginBottom: 8,
            }}
            onPress={() => Alert.alert('Settings', 'Difficulty settings will be implemented here')}
          >
            <Text style={{ color: '#00FF00', fontFamily: 'monospace' }}>
              DIFFICULTY LEVEL
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#006600',
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginBottom: 8,
            }}
            onPress={() => Alert.alert('Settings', 'Export data will be implemented here')}
          >
            <Text style={{ color: '#00FF00', fontFamily: 'monospace' }}>
              EXPORT DATA
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 16 }}>
            ABOUT
          </Text>
          <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 14, lineHeight: 20 }}>
            LexCell v1.0.0{'\n'}
            A brutalist vocabulary learning app{'\n'}
            Built with React Native and Expo
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen; 