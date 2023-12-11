import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OnboardingScreen() {
    const navigation = useNavigation();
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem('user');
                const user = JSON.parse(savedUser);
                if (user) {
                    console.log('token exists')
                    fetch(`http://${process.env.REACT_APP_LOCALHOST}:3000/validate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `bearer ${user.token}`
                        }
                    })
                        .then((data) => {
                            if (!data.error) {
                                // console.log("Who are you")
                                navigation.navigate('Home');

                            }
                            else {
                                setIsValidating(false)
                            }

                        })
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();


    }, []);


    const handleDone = () => {
        navigation.navigate('Login')
    }

    return isValidating ? (

        <View style={[loaderStyles.container, loaderStyles.horizontal]}>
            {/* <ActivityIndicator /> */}
            <ActivityIndicator size="large" />
            {/* <ActivityIndicator size="small" color="#0000ff" />
            <ActivityIndicator size="large" color="#00ff00" /> */}
        </View>

    )
        : (
            <View style={styles.container}>

                <Onboarding bottomBarColor='#fff'
                    containerStyles={{ padding: 50 }}

                    onDone={handleDone}
                    onSkip={handleDone}

                    pages={[
                        {
                            backgroundColor: '#fff',
                            // image: 
                            // <View>
                            //     <Text>Screen 1</Text>
                            // </View>,

                            image: <Image style={styles.img} source={require('../images/chat_bg.png')} />,
                            title: 'Chat Buddy',
                            subtitle: 'Get to know your buddy better talk one on one!',
                        },
                        {
                            backgroundColor: '#fff',
                            // image: 
                            // <View>
                            //     <Text>Screen 2</Text>
                            // </View>,
                            image: <Image style={styles.img} source={require('../images/travel-guide_bg.png')} />, title: 'Onboarding',
                            title: 'Advice Feed',
                            subtitle: 'Get advices on your questions as a part of the feed!',
                        },
                        {
                            backgroundColor: '#fff',
                            // image: 
                            // <View>
                            //     <Text>Screen 2</Text>
                            // </View>,
                            image: <Image style={styles.img} source={require('../images/safety_bg.png')} />, title: 'Onboarding',
                            title: 'Stay Safe',
                            subtitle: 'Your safety and privacy are our top priority',
                        },
                        {

                            backgroundColor: '#fff',
                            // image: 
                            // <View>
                            //     <Text>Screen 2</Text>
                            // </View>,
                            image: <Image style={styles.img} source={require('../images/profile_bg.png')} />, title: 'Onboarding',
                            title: 'Customize Preferences',
                            subtitle: 'Find matches based on your interests, and location',
                        },
                    ]}

                />
            </View>
        )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    img: {
        height: 420,
        width: 330,
        resizeMode: 'cover',
    },

})

const loaderStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
