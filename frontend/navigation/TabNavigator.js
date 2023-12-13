import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'AddPostScreen') {
                iconName = focused
                  ? 'feed'
                  : 'feed';
              return <MaterialIcons name={iconName} size={size} color={color} />;
              } else if (route.name === 'HomeScreen') {
                iconName = focused ? 'home' : 'home-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              }
              else if (route.name === 'ProfileScreen') {
                iconName = focused ? 'user' : 'user';
                return <EvilIcons name={iconName} size={size} color={color} />;
              }
  
              // You can return any component that you like here!
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <Tab.Screen name="AddPostScreen" component={AddPostScreen} options={{ headerShown: false }} />
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />

            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Onboarding" component={HomeScreen} /> */}
        </Tab.Navigator>
    )
}

export default TabNavigator