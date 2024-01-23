import { View, Text, Image, StyleSheet, ScrollView, FlatList, Pressable, RefreshControl,Animated,Dimensions, Touchable } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';
export default function Home({navigation}) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tv,setTv]=useState(false)
  async function fetchData() {
    setRefreshing(true);
    try {
      const response = await axios.get('https://movierulz.vercel.app/');
      if (response.status === 200 ) {
        setData(response.data.data);
        console.log(response.data.data.length)
        setRefreshing(false);
      } else {
        console.log('Failed to fetch data');
        setRefreshing(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setRefreshing(false);
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    fetchData();
    if(Dimensions.get('screen').width>500 && Dimensions.get('screen').height>500)
    {
      setTv(true)
    console.log(tv)
    }
  }, []);

  const renderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <View style={styles.row}>
          
          <View style={[styles.movie,{marginRight:"2%",marginLeft:"2%"}]}>
            <Pressable focusable={true} onFocus={(e)=>{console.log(e.nativeEvent)}} onPress={()=>{navigation.navigate('movie',{title:item.link})}} >
            <Image sharedTransitionTag={`image-${item.image}`} source={{uri:item.image}} style={styles.image} />
            <Text style={styles.text} >{
                     item.title.slice(0,item.title.indexOf('(')) 
    
                } 
              </Text>
          </Pressable>
          </View>
          {index + 1 < data.length && (
            <View style={[styles.movie]}>
              <Pressable focusable={true} onPress={()=>{navigation.navigate('movie',{title:data[index + 1].link})}} >
              <Animated.Image sharedTransitionTag={`image-${item.image}`} source={{ uri: data[index + 1].image }} style={styles.image} />
              <Text style={styles.text}>{data[index + 1].title.slice(0,data[index + 1].title.indexOf("("))}</Text>
              </Pressable>
            </View>
          )}
          </View>
          
      );
    }
  };

  return (
    <View style={styles.view}>
      <TouchableOpacity style={{top:"10%",right:"-78%",height:"auto",width:70,backgroundColor:'rgba(10,100,10,.3)',justifyContent:'center',alignItems:'center',borderRadius:5}}
        onPress={()=>{
          navigation.navigate('seedr')
        }}
      >
        <Text style={{color:'white',padding:5}} >seedr</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        keyboardDismissMode='on-drag'
        style={{width:Dimensions.get('screen').width,height:"100%"}}
        // refreshing={true}
        // onRefresh={fetchData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 170,
    height: 260,
    borderRadius: 10,
  },
  text: {
    width: 170,
    fontSize: 20,
    // marginRight:5,
    color: 'black',
    textAlign:"center",
    color:"white",
    // borderWidth:1,
    // borderColor:"red"
  },
  movie: {
    flex: 1,
    height: 350,
    flexDirection: 'column',
    marginTop:10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:5,
    marginBottom: -30,
  },
  view: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(6, 2, 38,1)',
  },
});
