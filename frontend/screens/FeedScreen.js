import { View, Text, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import MyCarousel from '../components/ui/MyCarousel'
import Config from '../config/config.index';

const FeedScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isScollable, setIsScrollable] = useState(true);

  useEffect(() => {
    getAllPosts();
  }, [])

  const getAllPosts = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`${Config.LOCALHOST}/getAllPosts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.message) {
        setPosts(result.posts);
      }
      else {
        console.error('Error fetching posts:', result.error);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);

    }
    setIsLoading(false);
    setRefreshing(false);
  }
  return (
    <View>
      <View style={styles.navBar}>
        <Text>FeedScreen</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddFeed')
          }}>
          <Entypo name='plus' size={30} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainContainer}
      showsHorizontalScrollIndicator={true} 
      showsVerticalScrollIndicator={false}
      scrollEnabled={isScollable}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getAllPosts} />
      }>
        {posts.map((post, index) => {
          const temp_images_url = post.post_images_data.map((image, index) => {
            return image.image_url
          })
          return <View key={index} style={styles.postView}>
            {post.description && <Text>{post.description}</Text>}
            {temp_images_url && <MyCarousel imageData={temp_images_url} isScollable={isScollable} setIsScrollable={setIsScrollable} />}
          </View>
        })}
      </ScrollView>
    </View>
  )
}

export default FeedScreen

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  mainContainer: {
    marginBottom: 40
  },
  postView: {
    marginBottom: 20
  }
})