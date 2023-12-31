import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-crop-picker';
import MyCarousel from '../components/ui/MyCarousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorHandler } from '../components/ErrorHandler/ErrorHandler';
import { useErrorBoundary } from 'react-error-boundary';
import Config from '../config/config.index';
import { ActivityIndicator } from 'react-native';



const Tab = createBottomTabNavigator();

const AddFeedScreen = () => {
    return (
        <ErrorHandler>
            <ChildAddFeedScreen />
        </ErrorHandler>
    );
}


function ChildAddFeedScreen() {
    const [description, setDescription] = useState('');
    const navigation = useNavigation();
    const ref = useRef();
    const [imageData, setImageData] = useState([]);
    const { showBoundary } = useErrorBoundary();
    const [isLoading, setIsLoading] = useState(false);

    const openCamera = async () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setImageData([image.path])
        }).catch((error) => {
            console.error('line31:', error);
        });
    }
    const openGallery = async () => {
        ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            cropping: true,
        }).then(images => {
            console.log(images);
            let temp_images_path = images.map((image) => image.path)
            setImageData(temp_images_path);
        }).catch((error) => {
            console.error('line45:', error);
        });
    }



    const handlePostTextChange = (text) => {
        setDescription(text);
    };

    const onPost = async () => {
        const user = await AsyncStorage.getItem('user');
        if (!user) {
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        imageData.forEach((imagePath, index) => {
            console.log(imagePath);
            formData.append('images', {
                uri: imagePath,
                type: 'image/jpeg',
                name: `my_image${index + 1}.jpg`,
            });
        });
        formData.append('email', JSON.parse(user).email);
        formData.append('description', description);
        console.log(formData);
        try {
            console.log(Config.LOCALHOST);
            const response = await fetch(`${Config.LOCALHOST}/addPost`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle the response as needed
            const result = await response.json();
            if (result.error) {
                console.error('line95 Error uploading image:', result.error);
            }
            console.log('Image uploaded:', result);
            setImageData([]);
            setDescription('');
            setIsLoading(false);
            alert("Post added successfully");
        } catch (error) {
            showBoundary({ myMessage: "Couldn't upload the post" });
            console.error('Error uploading image:', error);
        }
    }
    if (isLoading) return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size='large' />
        </View>
    )
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                <AntDesign name='back' size={30} />
            </TouchableOpacity>
            <View style={styles.mainContainer}>
                <View style={styles.logoContainer}>
                    <Image source={require('../images/logo.png')} style={styles.logo} />
                </View>
                {/* {imageData &&
                    <View style={styles.selectedImageView}>
                        <Image source={{ uri: imageData.assets[0].uri }} style={styles.selectedImage} />
                        <TouchableOpacity style={styles.removeBtn} onPress={() => {
                            setImageData(null);
                        }}>
                            <Image source={require('../images/close.png')} style={styles.removeIcon} />
                        </TouchableOpacity>
                    </View>
                } */}
                {imageData.length > 0 && <View style={{height: 250}}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => {
                        setImageData([]);
                    }}>
                        <Image source={require('../images/close.png')} style={styles.removeIcon} />
                    </TouchableOpacity>
                    <MyCarousel imageData={imageData} />
                </View>}
                <View style={styles.postContainer}>
                    <View style={styles.postBox}>
                        <View style={styles.rowPost}>
                            <Image source={require('../images/portrait.jpg')} style={styles.profilePostImg} />
                            <TouchableOpacity activeOpacity={1} onPress={() => { ref.current.focus() }}>
                                <TextInput
                                    style={styles.descriptionInput}
                                    placeholder="Write a post..."
                                    multiline
                                    value={description}
                                    onChangeText={handlePostTextChange}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.addButton}
                                onPress={() => {
                                    openGallery();
                                }}>
                                <Image source={require('../images/addimage.png')} style={styles.buttonIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.addButton}
                                onPress={() => {
                                    openCamera();
                                }}>
                                <Image source={require('../images/camera.png')} style={styles.buttonIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.postButton} onPress={() => {
                                onPost();
                            }}>
                                <Text style={styles.buttonText}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>

        </View>
    );
}

export default AddFeedScreen;

const styles = StyleSheet.create({
    loaderContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        // backgroundColor: 'green',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    backBtn: {
        margin: 10
    },
    mainContainer: {
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'column',
        // justifyContent: 'flex-start',

    },
    logoContainer: {
        // position: 'absolute',
        // top: 0,
        // width: '100%',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
    },
    // navbar: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    //     width: '100%',
    //     height: 70,
    //     backgroundColor: '#fff',
    // },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    },
    icon: {
        width: 30,
        height: 30,
    },
    highlight: {
        backgroundColor: 'rgba(0, 128, 124, 0.22)',
        borderRadius: 25,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postContainer: {
        flex: 1,
        width: '100%',
        // minHeight: 200,
        flexDirection: 'column',
        // backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
        marginBottom: 16,
    },
    rowPost: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    postBox: {
        width: '80%',
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 12,
    },
    descriptionInput: {
        padding: 12,
        color: '#888',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',

    },
    addButton: {
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        borderRadius: 50,
    },
    buttonIcon: {
        width: 25,
        height: 25,
    },
    profilePostImg: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
    postButton: {
        width: 100,
        marginHorizontal: 90,
        backgroundColor: 'rgba(237, 114, 46, 0.8)',
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 50,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedImageView: {
        width: '90%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
        alignSelf: 'center'
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: 10,
    },
    removeBtn: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        right: 20,
    },
    removeIcon: {
        width: 20,
        height: 20,
    }
});