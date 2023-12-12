import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Config from '../config/config.index'
import Colors from '../constants/colors.js'
import BUTTON from '../components/buttons.js'

export default function VerificationScreen({route}) {
    const {userData} = route.params;
    console.log("From verification page, code:", userData?.verificationCode);
    const navigation = useNavigation();
    const [code, setCode] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    // useEffect(() => {
    //     alert("Code has been sent to your Email")
    // }, [])

    const handleSubmitPress = () => {
        console.log(userData);
        

        if(
            code == ''
        ) {
            setErrorMsg("Please enter the code");
        }
        else {
            if(userData.verificationCode != code) {
                setErrorMsg("Verification code is incorrect");
            }
            else {
                
                fetch(`http://${Config.LOCALHOST_IP}:3000/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.error) {
                        setErrorMsg(data.error)
                    }
                    else {
                        alert('Account created successfully');
                        
                        setErrorMsg(null);
                        navigation.navigate('Login');
                    }
                })
                .catch(error => console.error('Error message:', error));

                
            }
        }
        // navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, marginHorizontal: 22, marginTop: 40, alignItems: 'center', }}>

                {
                    errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>
                }

                <TextInput
                    style={styles.input}
                    placeholder="Enter 6 digits veriification code"
                    // keyboardType="number"
                    onPressIn={() => setErrorMsg(null)}
                    onChangeText={(text) => setCode(text)}
                />



                <BUTTON
                    title="Submit"
                    onPress={handleSubmitPress}
                />

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
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
                            source={require('frontend/images/google.png')}
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
                            source={require('frontend/images/facebook.png')}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 15,
                            }}
                            resizeMode='contain'
                        />
                        <Text>Facebook</Text>
                    </TouchableOpacity>


                </View> */}

            </View>





        </SafeAreaView>
    )
}

// const styles = StyleSheet.create({})
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