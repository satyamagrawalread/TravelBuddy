import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

const FeedScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>FeedScreen</Text>
      <TouchableOpacity 
      onPress={() => {
        navigation.navigate('AddFeed')
      }}>
        <Entypo name='plus' size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default FeedScreen