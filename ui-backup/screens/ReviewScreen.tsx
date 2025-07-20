import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState('serendipity');
  const [userRecall, setUserRecall] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [realDefinition] = useState('The occurrence and development of events by chance in a happy or beneficial way.');
  const [streak, setStreak] = useState(5);

  const handleSubmit = () => {
    if (!userRecall.trim()) {
      Alert.alert('Error', 'Please enter your recall');
      return;
    }
    setIsRevealed(true);
  };

  const handleNext = () => {
    setCurrentWord('ephemeral');
    setUserRecall('');
    setIsRevealed(false);
    setStreak(prev => prev + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <ScrollView style={{ flex: 1, padding: 16, paddingTop: 50 }}>
        {/* Header with Home Button */}
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
            onPress={() => navigation.navigate('Landing')}
          >
            <Ionicons name="home" size={20} color="#000000" />
          </TouchableOpacity>
          
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 2 }}>
              REVIEW MODE
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 14 }}>
              Recall previously learned words
            </Text>
            <Text style={{ color: '#00CC00', fontFamily: 'monospace', fontSize: 14, marginTop: 8 }}>
              STREAK: {streak} DAYS
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 32, marginBottom: 24, textAlign: 'center' }}>
            {currentWord.toUpperCase()}
          </Text>
          
          {!isRevealed ? (
            <View>
              <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 14, marginBottom: 16 }}>
                Recall the definition:
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#000000',
                  borderColor: '#00FF00',
                  borderWidth: 1,
                  color: '#00FF00',
                  fontFamily: 'monospace',
                  padding: 16,
                  marginBottom: 24,
                  minHeight: 100,
                  textAlignVertical: 'top',
                }}
                value={userRecall}
                onChangeText={setUserRecall}
                placeholder="Type what you remember..."
                placeholderTextColor="#006600"
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#00FF00',
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                }}
                onPress={handleSubmit}
              >
                <Text style={{ color: '#000000', fontFamily: 'monospace', textAlign: 'center', fontWeight: 'bold' }}>
                  SUBMIT RECALL
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 8 }}>
                  YOUR RECALL:
                </Text>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 14, backgroundColor: '#006600', padding: 16 }}>
                  {userRecall}
                </Text>
              </View>
              
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 8 }}>
                  ACTUAL DEFINITION:
                </Text>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 14, backgroundColor: '#00CC00', padding: 16 }}>
                  {realDefinition}
                </Text>
              </View>
              
              <TouchableOpacity
                style={{
                  backgroundColor: '#00CC00',
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                }}
                onPress={handleNext}
              >
                <Text style={{ color: '#000000', fontFamily: 'monospace', textAlign: 'center', fontWeight: 'bold' }}>
                  NEXT WORD
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewScreen; 