import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BUTTON from '../components/buttons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

const { width } = Dimensions.get("window"); 

const UserScreen = () => {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }
  const toggleDialogVisibility = () => {
    setIsDialogVisible(!isDialogVisible);
  }

  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setImageData(image.path);
    });
    setIsDialogVisible(!isDialogVisible);
  }
  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImageData(image.path)
    });
    setIsDialogVisible(!isDialogVisible);
  }
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
      <View>
        <TouchableOpacity style={styles.profileImgOuter}>
          <Image source={imageData ? { uri: imageData } : require('../images/profile_bg.png')} style={styles.profileImg} />
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
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
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