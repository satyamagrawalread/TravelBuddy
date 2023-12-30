import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import SignupScreen from '../screens/SignupScreen.js';
import OnboardingScreen from '../screens/OnboardingScreen.js';
import VerificationScreen from '../screens/VerificationScreen.js';
import TabNavigator from './TabNavigator.js';
import AddFeedScreen from '../screens/AddFeedScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import ViewProfileImageScreen from '../screens/ViewProfileImageScreen.js';

const Stack = createNativeStackNavigator();


export default function appNavigation() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboarding'>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={TabNavigator} />
        <Stack.Screen name="Verify" options={{ headerShown: false }} component={VerificationScreen} />
        <Stack.Screen name="AddFeed" options={{ headerShown: false }} component={AddFeedScreen} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
        <Stack.Screen name="ProfileImage" options={{ headerShown: false }} component={ViewProfileImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

