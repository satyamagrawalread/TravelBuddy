import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddPostScreen = () => {
    const [imageData, setImageData] = useState(null);
    const ref = useRef();

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
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>AddPostScreen</Text>
                <TouchableOpacity activeOpacity={1} style={styles.captionBox} onPress={() => { ref.current.focus() }}>
                    <TextInput ref={ref} placeholder='Type Caption Here...' style={styles.input} />

                </TouchableOpacity>
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
                <TouchableOpacity style={[styles.pickerBtn, { marginTop: 50 }]}
                    onPress={() => {
                        openCamera()
                    }}>
                    <Image source={require('../images/camera.png')} style={styles.icon} />
                    <Text style={styles.pickerTitle}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pickerBtn, { marginTop: 20 }]}
                    onPress={() => {
                        openGallery();
                    }}>
                    <Image source={require('../images/gallery.png')} style={styles.icon} />
                    <Text style={styles.pickerTitle}>Open Gallery</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    captionBox: {
        width: '94%',
        height: 130,
        borderWidth: 0.4,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#9e9e9e',
        padding: 10
    },
    input: {
        width: '100%'
    },
    pickerBtn: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        alignSelf: 'center',
        borderBottomWidth: 0.4,
        borderBottomColor: '#9e9e9e',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#9e9e9e'
    },
    pickerTitle: {
        marginLeft: 10,
        fontSize: 18
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
})