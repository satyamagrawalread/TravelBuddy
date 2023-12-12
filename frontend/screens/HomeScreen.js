import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BUTTON from '../components/buttons'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();


export default function HomeScreen() {
    const navigation = useNavigation();
    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }
    return (
        <View>
            <Text>Home Page</Text>
            <BUTTON 
            title='Logout'
            onPress={handleLogout}
             />
        </View>
    )
}

const styles = StyleSheet.create({})
