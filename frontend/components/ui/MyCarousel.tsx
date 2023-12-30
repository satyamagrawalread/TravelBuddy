import * as React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from "react-native-reanimated-carousel";

interface MyCarouselProps {
  imageData: string[];
}

const MyCarousel: React.FC<MyCarouselProps> = ({ imageData }) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width * 0.85;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        ref={ref}
        width={width}
        height={width / 2}
        style={{width: '100%'}}
        // autoPlay={true}
        pagingEnabled={true}
        overscrollEnabled={false}
        data={imageData}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        // onConfigurePanGesture={(gestureChain) => (
        //   gestureChain.activeOffsetX([-10, 10])
        // )}
        renderItem={({ index }) => (
          <View
          style={{ flex: 1, marginLeft: "2.5%" }}
          >
            {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
              hello
            </Text> */}
            <Image
                source={{ uri: imageData[index] }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
          </View>
        )}
      />
    </View>
  );
};

export default MyCarousel;
