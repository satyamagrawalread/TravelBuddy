import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BUTTON from '../components/buttons';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }
    return (
        <View>
            <Text>Profile Page</Text>
            <BUTTON 
            title='Logout'
            onPress={handleLogout}
             />
        </View>
    )
}

export default ProfileScreen