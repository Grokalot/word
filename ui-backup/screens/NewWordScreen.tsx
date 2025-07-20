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
              NEW WORD MODE
            </Text>
            <Text style={{ color: '#006600', fontFamily: 'monospace', fontSize: 14 }}>
              Define the word in your own terms
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 32, marginBottom: 24, textAlign: 'center' }}>
            {currentWord.toUpperCase()}
          </Text>
          
          {!isSubmitted ? (
            <View>
              <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 14, marginBottom: 16 }}>
                Enter your definition:
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
                value={userDefinition}
                onChangeText={setUserDefinition}
                placeholder="Type your definition here..."
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
                  SUBMIT DEFINITION
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 8 }}>
                  YOUR DEFINITION:
                </Text>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 14, backgroundColor: '#006600', padding: 16 }}>
                  {userDefinition}
                </Text>
              </View>
              
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 8 }}>
                  SCORE: {score}/100
                </Text>
                <View style={{ width: '100%', backgroundColor: '#006600', height: 8, marginBottom: 8 }}>
                  <View 
                    style={{ backgroundColor: '#00FF00', height: 8, width: score ? `${score}%` : '0%' }}
                  />
                </View>
              </View>
              
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 18, marginBottom: 8 }}>
                  FEEDBACK:
                </Text>
                <Text style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: 14, backgroundColor: '#006600', padding: 16 }}>
                  {feedback}
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

export default NewWordScreen; 