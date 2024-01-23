import { View, Text, Image, Animated, ToastAndroid, Dimensions,Platform } from 'react-native';
import React, { useEffect,useState } from 'react';

export default function MovierulzScreen({ navigation }) {
  const value = new Animated.Value(0);
  const scale = new Animated.Value(0);
  const textScale = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const [tv,setTv]=useState(false)
  const rotation = () => {
    Animated.timing(value, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    Animated.timing(textOpacity, {
      toValue: 1,
      delay: 1500,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if(Dimensions.get('screen').width>500 && Dimensions.get('screen').height>500)
    setTv(true)
    rotation();
    setTimeout(() => {
      navigation.replace('topbar');
    }, 3500);

    setTimeout(() => {
      ToastAndroid.show('Developed By Hari Kiran', 1500);
    }, 3000);

    console.log(Dimensions.get('screen').width, Dimensions.get('screen').height);
  }, []);

  const rotationValue = value.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scaleValue = scale.interpolate({
    inputRange: [0, 1],
    outputRange:  [3, 1],
  });

  const textScaleValue = textScale.interpolate({
    inputRange: [0, 1],
    outputRange: tv ?[1,1] :[100, 1],
  });

  const textOpacityValue = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const deviceWidth = Dimensions.get('screen').width;
  const deviceHeight = Dimensions.get('screen').height;
  const imageWidth = tv ? 50 :deviceWidth * 0.8; 
  const imageHeight = tv? 50 : imageWidth; 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(6, 2, 38,1)' }}>
      {tv?
      <View>
        <Animated.View style={[{justifyContent:'center',alignItems:'center',}]} >
          <Animated.Image source={require('./icon.jpg')} style={{width:150,height:150,borderRadius:100,transform:[{rotate:rotationValue}]}}  />
          <Animated.Text style={{ color: 'white', fontSize:40, fontWeight: "700", letterSpacing: 5,opacity:textOpacityValue }}>MOVIE RULZ</Animated.Text>
        </Animated.View>
      </View>
      :
      <View>
      <Animated.View style={{ transform: [{ rotate: rotationValue }, { scale: scaleValue }] }}>
        <Image source={require('./icon.jpg')} style={{ width: imageWidth, height: imageHeight, borderRadius: imageWidth / 2 }} />
      </Animated.View>
      <Animated.Text style={{ color: 'white', fontSize: tv? 10:40, fontWeight: "700", letterSpacing: 5, transform: [{ scale: textScaleValue }], opacity: textOpacityValue }}>MOVIE RULZ</Animated.Text>
      </View>
      }
    </View>
  )
}
