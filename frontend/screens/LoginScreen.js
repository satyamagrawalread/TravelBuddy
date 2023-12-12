import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from '../config/config.index'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import Colors from '../constants/colors.js'
import BUTTON from '../components/buttons.js'

export default function LoginScreen() {

    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [errorMsg, setErrorMsg] = useState(null);

    const storeUser = async (user) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignupPress = () => {
        navigation.navigate('Signup')
    }

    const handleHomePress = async () => {
        if (userData.email == '' || userData.password == '') {
            setErrorMsg('All fields are required');
            return;
        }
        else {
            console.log(process.env.REACT_APP_LOCALHOST);
            fetch(`http://${Config.LOCALHOST_IP}:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        setErrorMsg(data.error)
                    }
                    else {
                        const user = {
                            email: userData.email,
                            token: data.token
                        }
                        storeUser(user)
                            .then((value) => {
                                setUserData({
                                    ...userData,
                                    email: '',
                                    password: ''
                                })
                                setErrorMsg(null);
                                navigation.navigate('Home');
                            });

                    }
                })
                .catch(error => console.error('Error message:', error));
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, marginHorizontal: 22, marginTop: 40, alignItems: 'center', }}>

                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginTop: 50,
                    color: Colors.primary,
                }}>HELLO AGAIN! 👋🏻 </Text>

                <Text style={{
                    fontSize: 16,
                    fontWeight: 'light',
                    marginVertical: 20,
                    marginHorizontal: 10,
                    color: Colors.secondary,
                    textAlign: 'center'
                }}>Welcome Back, You have been missed</Text>

                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    color: Colors.primary,
                    textAlign: 'center'
                }}>Don't Have an account?</Text>

                <TouchableOpacity onPress={handleSignupPress}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        marginHorizontal: 10,
                        color: Colors.primary,
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                    }}>Sign Up</Text>
                </TouchableOpacity>

                {
                    errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>
                }

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onPressIn={() => setErrorMsg(null)}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onPressIn={() => setErrorMsg(null)}
                    onChangeText={(text) => setUserData({ ...userData, password: text })}
                />



                <BUTTON
                    title="Login"
                    onPress={handleHomePress}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                    <View style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: Colors.primary,
                        marginHorizontal: 10,
                    }}>
                    </View>
                    <Text style={{ fontSize: 14, color: Colors.primary }}>Or Login with</Text>
                    <View style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: Colors.primary,
                        marginHorizontal: 10,
                    }}>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => { console.log("Pressed") }}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: 'grey',
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require('../images/google.png')}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 15,
                            }}
                            resizeMode='contain'
                        />
                        <Text>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { console.log("Pressed") }}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: 'grey',
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require('../images/facebook.png')}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 15,
                            }}
                            resizeMode='contain'
                        />
                        <Text>Facebook</Text>
                    </TouchableOpacity>


                </View>

            </View>





        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 341,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(46, 46, 46, 0.07)',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        paddingHorizontal: 15,
        marginTop: 22,
        fontSize: 12,
        color: 'black',
        borderColor: 'grey', // Border color
        borderWidth: 1, // Text color inside the input

    },
})


