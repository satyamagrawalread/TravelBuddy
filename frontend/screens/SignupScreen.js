import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Config from '../config/config.index'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import Colors from '../constants/colors.js'
import BUTTON from '../components/buttons.js'

export default function SignupScreen() {

    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const [errorMsg, setErrorMsg] = useState(null);

    const handleLoginPress = () => {
        console.log(userData);
        

        if(
            userData.name == '' || 
            userData.email == '' ||
            userData.password == '' ||
            userData.cpassword == ''
        ) {
            setErrorMsg("All fields are required");
        }
        else {
            if(userData.password != userData.cpassword) {
                setErrorMsg("Password & Confirm Password does not match");
            }
            else {
            console.log(process.env.REACT_APP_LOCALHOST);
                fetch(`http://${Config.LOCALHOST_IP}:3000/verify`, {
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
                        alert(data.message);
                        setUserData({...userData,
                            name: '',
                            email: '',
                            password: '',
                            cpassword: ''
                        })
                        setErrorMsg(null);
                        navigation.navigate('Verify', {'userData': data.userData});
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

                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginTop: 50,
                    color: Colors.primary,
                }}>Create Your Account</Text>

                <Text style={{
                    fontSize: 16,
                    fontWeight: 'light',
                    marginVertical: 20,
                    marginHorizontal: 10,
                    color: Colors.secondary,
                    textAlign: 'center'
                }}>To access the app features, and get personalised feed!</Text>

                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    color: Colors.primary,
                    textAlign: 'center'
                }}>Already Have an account?</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        marginHorizontal: 10,
                        color: Colors.primary,
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                    }}>Login</Text>
                </TouchableOpacity>

                {
                    errorMsg && <Text style={{color: 'red'}}>{errorMsg}</Text>
                }

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    // placeholderTextColor={Colors.secondary}
                    onPressIn={() => setErrorMsg(null)}
                    onChangeText={(text) => setUserData({ ...userData, name: text })}
                />

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

<TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onPressIn={() => setErrorMsg(null)}
                    onChangeText={(text) => setUserData({ ...userData, cpassword: text })}

                />



                <BUTTON
                    title="Sign Up"
                    onPress={handleLoginPress}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                    <View style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: Colors.primary,
                        marginHorizontal: 10,
                    }}>
                    </View>
                    <Text style={{ fontSize: 14, color: Colors.primary }}>Or Sign up with</Text>
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
