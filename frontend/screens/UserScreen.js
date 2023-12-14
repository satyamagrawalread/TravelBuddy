import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = () => {
  const navigation = useNavigation();
    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }
    return (
        <View>
            <Text>User Screen</Text>
            <BUTTON 
            title='Logout'
            onPress={handleLogout}
             />
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({})