import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import Colors from 'frontend/constants/colors.js'
import BUTTON from 'frontend/components/buttons.js'

export default function SignupScreen() {

    const navigation = useNavigation();

    const handleLoginPress = ()=>{
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1, marginHorizontal: 22, marginTop:40, alignItems: 'center',}}>

            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop:50,
                color: Colors.primary,  
                }}>Create Your Account</Text>

            <Text style={{
                fontSize: 16,
                fontWeight: 'light',
                marginVertical:20,
                marginHorizontal:10,
                color: Colors.secondary,  
                textAlign: 'center'
                }}>To access the app features, and get personalised feed!</Text>

            <Text style={{
                fontSize: 16,
                fontWeight: '500',
                marginVertical:10,
                marginHorizontal:10,
                color: Colors.primary,  
                textAlign: 'center'
                }}>Already Have an account?</Text>
              
              <TouchableOpacity onPress={handleLoginPress}>
                    <Text style={{
                fontSize: 16,
                fontWeight: '500',
                marginHorizontal:10,
                color: Colors.primary,  
                textAlign: 'center',
                textDecorationLine: 'underline',
                }}>Login</Text>
                </TouchableOpacity>

                <TextInput 
                        style={styles.input}
                        placeholder="Username"
                        // placeholderTextColor={Colors.secondary}
                />

                <TextInput 
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                />

                <TextInput 
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                />

                <BUTTON
                    title="Sign Up"
                    onPress={handleLoginPress}
                />

                <View style={{flexDirection:'row', alignItems:'center', marginVertical:30}}>
                    <View style={{
                        flex:1,
                        height:1,
                        backgroundColor:Colors.primary,
                        marginHorizontal: 10,
                    }}>
                    </View>
                    <Text style={{fontSize:14, color:Colors.primary}}>Or Sign up with</Text>
                    <View style={{
                        flex:1,
                        height:1,
                        backgroundColor:Colors.primary,
                        marginHorizontal: 10,
                    }}>
                    </View>
                </View>

                <View style={{
                    flexDirection:'row',
                    justifyContent:'center'
                }}>
                    <TouchableOpacity 
                    onPress={()=>{console.log("Pressed")}}
                    style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        height:52,
                        borderWidth: 1,
                        borderColor:'grey',
                        marginRight:4,
                        borderRadius:10
                    }}
                    >
                    <Image
                       source={require('frontend/images/google.png')}
                       style={{
                           height:36,
                           width:36,
                           marginRight: 15,
                       }}
                       resizeMode='contain'
                    />
                    <Text>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>{console.log("Pressed")}}
                    style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        height:52,
                        borderWidth: 1,
                        borderColor:'grey',
                        marginRight:4,
                        borderRadius:10
                    }}
                    >
                    <Image
                       source={require('frontend/images/facebook.png')}
                       style={{
                           height:36,
                           width:36,
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
    input:{
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
