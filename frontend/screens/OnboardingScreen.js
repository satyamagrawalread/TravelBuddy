"use client";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text, Button } from 'react-native';
import Config from '../config/config.index';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { ErrorHandler } from '../components/ErrorHandler/ErrorHandler';
import { useErrorBoundary } from 'react-error-boundary';


const OnboardingScreen = () => {
  return(
    <ErrorHandler>
      <ChildOnboardingScreen />
    </ErrorHandler>
  )
}

function ChildOnboardingScreen() {
  const navigation = useNavigation();
  const [isValidating, setIsValidating] = useState(true);
  const [subject, setSubject] = useState(undefined);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    SplashScreen.hide();
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      const user = JSON.parse(savedUser);

      if (user) {
        console.log('token exists');
        // throw new Error("Simulated Error");
        fetch(`${Config.LOCALHOST}/validate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json()) // Parse the response as JSON
          .then((data) => {
            console.log('line27:', data);

            if (!data.error) {
              console.log('Who are you');
              navigation.navigate('Home');
            } else {
              console.log('Went to else');
              setIsValidating(false);
            }
          })
          .catch((error) => {
            console.log('Error fetching data:', error);
            showBoundary({myMessage: "Internal Server Error"});
            // throw error;
            
          })
      } else {
        setIsValidating(false);
      }
    } catch (error) {
      console.log('try Error fetching data:', error);
      setIsValidating(false);
      // throw error
    }
  };

  const handleDone = () => {
    navigation.navigate('Login');
  };
  

  return (
    <ErrorHandler>
      {isValidating ?
        <View style={[loaderStyles.container, loaderStyles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
        :
        <View style={styles.container}>
          {/* <Text>{subject.toUpperCase}</Text> */}
          <Onboarding
            bottomBarColor="#fff"
            containerStyles={{ padding: 50 }}
            onDone={handleDone}
            onSkip={handleDone}
            pages={[
              {
                backgroundColor: '#fff',
                image: <Image style={styles.img} source={require('../images/chat_bg.png')} />,
                title: 'Chat Buddy',
                subtitle: 'Get to know your buddy better talk one on one!',
              },
              {
                backgroundColor: '#fff',
                image: <Image style={styles.img} source={require('../images/travel-guide_bg.png')} />,
                title: 'Advice Feed',
                subtitle: 'Get advice on your questions as a part of the feed!',
              },
              {
                backgroundColor: '#fff',
                image: <Image style={styles.img} source={require('../images/safety_bg.png')} />,
                title: 'Stay Safe',
                subtitle: 'Your safety and privacy are our top priority',
              },
              {
                backgroundColor: '#fff',
                image: <Image style={styles.img} source={require('../images/profile_bg.png')} />,
                title: 'Customize Preferences',
                subtitle: 'Find matches based on your interests and location',
              },
            ]}
          />
        </View>
      }
    </ErrorHandler>
  );
}

export default OnboardingScreen;

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
});

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
