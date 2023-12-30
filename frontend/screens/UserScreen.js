import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BUTTON from '../components/buttons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Config from '../config/config.index';
import { ActivityIndicator } from 'react-native';
import { ErrorHandler } from '../components/ErrorHandler/ErrorHandler';
import { useErrorBoundary } from 'react-error-boundary';




const { width } = Dimensions.get("window");

const UserScreen = () => {
  return (
    <ErrorHandler>
      <ChildUserScreen />
    </ErrorHandler>
  );
}


const ChildUserScreen = () => {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [profileImageData, setProfileImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [subject, setSubject] = useState(undefined)
  const [errorMsg, setErrorMsg] = useState(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    profileImageCheck();
  }, []);


  const profileImageCheck = async () => {
    setRefreshing(true);
    const user = await AsyncStorage.getItem('user');
    // console.log(user);
    if (user) {
      fetch(`${Config.LOCALHOST}/profileImageCheck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: JSON.parse(user).email })
      })
        .then(res => res.json())
        .then((data) => {
          if (data.profile_image) {
            console.log(data.profile_image);
            setProfileImageData(data.profile_image.profile_image_data)
          }
          else if (data.error) {
            setErrorMsg(data.error);
          }
        })
        .catch((error) => {
          console.error('line69', error);
          showBoundary({ myMessage: "Internal Server Error" });
        })
      setIsLoading(false);
    }
    setIsLoading(false);
    setRefreshing(false);
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }
  const toggleDialogVisibility = () => {
    setIsDialogVisible(!isDialogVisible);
  }


  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      console.log(image);
      setImageData(image);
      // console.log(imageData.path);
      uploadImage(image);
    });
    setIsDialogVisible(!isDialogVisible);
  }
  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      console.log(image);
      setImageData(image)
      // console.log(imageData.path);
      uploadImage(image);
    });
    setIsDialogVisible(!isDialogVisible);
  }

  const uploadImage = async (image) => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: image.path,
      type: 'image/jpeg',
      name: 'my_image.jpg'
    });
    profileImageData && formData.append('public_id', profileImageData.public_id);
    formData.append('email', JSON.parse(user).email);
    console.log(formData);

    try {
      const response = await fetch(`${Config.LOCALHOST}/uploadImage`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // Additional headers if needed
        },
      });
      // Handle the response as needed
        const result = await response.json();
        console.log('Image uploaded:', result);
        await profileImageCheck();
    } catch (error) {
      showBoundary({myMessage: "Couldn't upload the image"});
      console.error('Error uploading image:', error);
    }
    setIsLoading(false);
  }

  if (isLoading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size='large' />
    </View>
  )
  return (

    <View style={styles.container}>
      <Modal animationType="slide"
        transparent visible={isDialogVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleDialogVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text style={styles.chooseFromText}>Choose From:</Text>
            <TouchableOpacity style={styles.dialogBtn}
              onPress={() => {
                openGallery();
              }}>
              <Text>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dialogBtn}
              onPress={() => {
                openCamera();
              }}>
              <Text>Camera</Text>
            </TouchableOpacity>

            {/** This button is responsible to close the modal */}
            <Button title="Close" onPress={toggleDialogVisibility} />
          </View>
        </View>
      </Modal>
      <Text style={styles.headerTitle}>Profile</Text>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ffffee', '#9e9e9e', '#ffffee']} style={styles.horizontalLine}></LinearGradient>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={profileImageCheck} />
        }>
        <View>
          {/* <Text>{subject.toUpperCase}</Text> */}

          <TouchableOpacity style={styles.profileImgOuter}
            onPress={() => {
              navigation.navigate('ProfileImage', { profileImageData: profileImageData })
            }}>
            <Image source={profileImageData ? { uri: profileImageData.image_url } : require('../images/profile_bg.png')} style={styles.profileImg} />
            <TouchableOpacity style={styles.editIcon}
              onPress={() => { toggleDialogVisibility() }}>
              <AntDesign name='edit' size={25} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <BUTTON
          title='Profile'
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <BUTTON
          title='Logout'
          onPress={handleLogout}
        />
      </ScrollView>
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  loaderContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingLeft: 27,
    paddingRight: 27,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 24
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 18

  },
  profileImgOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#000000',
    borderWidth: 2,
    justifyContent: 'center'
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  editIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    // alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 200,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  chooseFromText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  dialogBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    marginBottom: 10,
  }
})