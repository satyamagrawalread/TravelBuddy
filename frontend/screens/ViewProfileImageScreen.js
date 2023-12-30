import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const ViewProfileImageScreen = ({ route }) => {
    const { profileImageData } = route.params;

    // Log the image URL
    console.log(profileImageData?.image_url);

    return (
        <View style={styles.container}>
            <Image
                source={profileImageData ? { uri: profileImageData.image_url } : require('../images/profile_bg.png')}
                style={styles.profileImg}
                onError={(error) => console.error('Image load error:', error)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // width: '100%',
        backgroundColor: 'black'
    },
    profileImg: {
      width: '100%', // Adjust the width as needed
      height: 400, // Adjust the height as needed
      resizeMode: 'cover', // Adjust the resizeMode based on your needs
    }
})

export default ViewProfileImageScreen;
