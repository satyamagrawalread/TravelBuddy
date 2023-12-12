import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AddPostScreen" component={AddPostScreen} options={{ headerShown: false }} />
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />

            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Onboarding" component={HomeScreen} /> */}
        </Tab.Navigator>
    )
}

export default TabNavigator