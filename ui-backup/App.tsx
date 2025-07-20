import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';

import NewWordScreen from './screens/NewWordScreen';
import ReviewScreen from './screens/ReviewScreen';
import ProfileScreen from './screens/ProfileScreen';
import LandingScreen from './screens/LandingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom header component with profile button
const CustomHeader = ({ navigation }: any) => (
  <View style={{
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1000,
  }}>
    <TouchableOpacity
      style={{
        backgroundColor: '#00FF00',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00FF00',
      }}
      onPress={() => {
        navigation.navigate('Profile');
      }}
    >
      <Ionicons name="person" size={20} color="#000000" />
    </TouchableOpacity>
  </View>
);

// Tab Navigator Component
const TabNavigator = ({ navigation }: any) => (
  <>
    <CustomHeader navigation={navigation} />
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#00FF00',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#00FF00',
        tabBarInactiveTintColor: '#006600',
        tabBarLabelStyle: {
          fontFamily: 'monospace',
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="NewWord"
        component={NewWordScreen}
        options={{
          tabBarLabel: 'NEW WORD',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          tabBarLabel: 'REVIEW',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="refresh-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  </>
);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Landing"
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
