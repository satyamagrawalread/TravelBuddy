import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import Config from '../config/config.index';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    const getUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(savedUser);

        if (user) {
          console.log('token exists');
          fetch(`http://${Config.LOCALHOST_IP}:3000/validate`, {
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
              console.error('Error fetching data:', error);
              setIsValidating(false);
            });
        } else {
          setIsValidating(false);
        }
      } catch (error) {
        console.log(error);
        setIsValidating(false);
      }
    };

    getUser();
  }, []);

  const handleDone = () => {
    navigation.navigate('Login');
  };

  return isValidating ? (
    <View style={[loaderStyles.container, loaderStyles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
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
  );
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
