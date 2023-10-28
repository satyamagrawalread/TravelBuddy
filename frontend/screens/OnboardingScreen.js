import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'


export default function OnboardingScreen() {
    const navigation = useNavigation();

    
    const handleDone = ()=>{
       navigation.navigate('Signup')
    }

    return (
        <View style={styles.container}>
            
            <Onboarding bottomBarColor= '#fff'
               containerStyles={{padding: 50}}

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
                        image: <Image style={styles.img} source={require('../images/travel-guide_bg.png')} />,                        title: 'Onboarding',
                        title: 'Advice Feed',
                        subtitle: 'Get advices on your questions as a part of the feed!',
                    },
                    {
                        backgroundColor: '#fff',
                        // image: 
                        // <View>
                        //     <Text>Screen 2</Text>
                        // </View>,
                        image: <Image style={styles.img} source={require('../images/safety_bg.png')} />,                        title: 'Onboarding',
                        title: 'Stay Safe',
                        subtitle: 'Your safety and privacy are our top priority',
                    },
                    {

                        backgroundColor: '#fff',
                        // image: 
                        // <View>
                        //     <Text>Screen 2</Text>
                        // </View>,
                        image: <Image style={styles.img} source={require('../images/profile_bg.png')} />,                        title: 'Onboarding',
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
