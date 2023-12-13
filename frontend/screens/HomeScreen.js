import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const Tab = createBottomTabNavigator();


export default function HomeScreen() {
    const [selectedTab, setSelectedTab] = useState('home');
    const [postText, setPostText] = useState('');
    const navigation = useNavigation();
    const ref = useRef();
    const [imageData, setImageData] = useState(null);

    const openCamera = async () => {
        const res = await launchCamera({ mediaType: 'photo' });
        if (!res.didCancel) {
            setImageData(res);
        }
    }
    const openGallery = async () => {
        const res = await launchImageLibrary({ mediaType: 'photo' });
        if (!res.didCancel) {
            setImageData(res);
        }
    }


    const handleUserPress = () => {
        navigation.navigate('User')
    }

    const handleTabPress = (tab) => {
        setSelectedTab(tab);

    };
    const handlePostTextChange = (text) => {
        setPostText(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../images/logo.png')} style={styles.logo} />
            </View>
            {imageData &&
                <View style={styles.selectedImageView}>
                    <Image source={{ uri: imageData.assets[0].uri }} style={styles.selectedImage} />
                    <TouchableOpacity style={styles.removeBtn} onPress={() => {
                        setImageData(null);
                    }}>
                        <Image source={require('../images/close.png')} style={styles.removeIcon} />
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.postContainer}>
                <View style={styles.postBox}>
                    <View style={styles.rowPost}>
                        <Image source={require('../images/portrait.jpg')} style={styles.profilePostImg} />
                        <TouchableOpacity activeOpacity={1} onPress={() => { ref.current.focus() }}>
                            <TextInput
                                style={styles.postInput}
                                placeholder="Write a post..."
                                multiline
                                value={postText}
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

                        <TouchableOpacity style={styles.postButton}>
                            <Text style={styles.buttonText}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
            <View style={styles.navbar}>
                <TouchableOpacity
                    style={[styles.iconContainer, selectedTab === 'home' && styles.highlight]}
                    onPress={() => handleTabPress('home')}
                >
                    <Image source={require('../images/home.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.iconContainer, selectedTab === 'chat' && styles.highlight]}
                    onPress={() => handleTabPress('chat')}
                >
                    <Image source={require('../images/chat.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.iconContainer, selectedTab === 'user' && styles.highlight]}
                    onPress={() => {
                        handleTabPress('user');
                        handleUserPress();
                    }}
                >
                    <Image source={require('../images/user.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16, // Add padding to separate the logo from the top
    },
    logo: {
        width: 80,
        height: 80,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
    },
    iconContainer: {
        flex: 1,
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
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    rowPost: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    postBox: {
        width: '80%',
        // height: '50%',
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 12,
    },
    postInput: {
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