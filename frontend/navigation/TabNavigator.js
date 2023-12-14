import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FeedScreen from '../screens/FeedScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Feed') {
                iconName = focused
                  ? 'feed'
                  : 'feed';
              return <MaterialIcons name={iconName} size={size} color={color} />;
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              }
              else if (route.name === 'User') {
                iconName = focused ? 'user' : 'user';
                return <EvilIcons name={iconName} size={size} color={color} />;
              }
  
              // You can return any component that you like here!
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Chat" component={HomeScreen} options={{ headerShown: false }} />

            <Tab.Screen name="User" component={ProfileScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Onboarding" component={HomeScreen} /> */}
        </Tab.Navigator>
    )
}

export default TabNavigator