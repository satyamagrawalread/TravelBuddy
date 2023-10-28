import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors.js'

// const BUTTON = (props) => {
//     return (
//     <TouchableOpacity style={styles.button} onPress={props.onPress}>
//       <Text style={styles.buttonText}>{props.title}</Text>
//     </TouchableOpacity>
//     )
// }
const BUTTON = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    
        button: {
          marginTop: 30,
          width: 200,
          height: 40,
          backgroundColor: Colors.secondary,
          borderRadius: 20, // Half of the height to make it a perfect circle
          justifyContent: 'center',
          alignItems: 'center',
        },
        buttonText: {
          color: '#ffffff',
          fontSize: 14,
          fontWeight: '400',
        }
})

export default BUTTON;
