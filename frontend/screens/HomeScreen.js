import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BUTTON from '../components/buttons'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
