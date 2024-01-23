import { View, Text, Image, StyleSheet, ScrollView, FlatList, Pressable, RefreshControl, Touchable } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRefresh } from '../componets/MovieContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function WishList({navigation}) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  async function fetchData() {
    setRefreshing(true);
    try {
      let response 
     await AsyncStorage.getItem('movierulzWhish',(err,res)=>{
        if(res){
            response=JSON.parse(res)
            console.log(response)
        }
      });
      if (response.status === 200) {
        console.log(response.status)
        setData(response.data);
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
  const { forRefresh, setRefresh } = useRefresh();

  useEffect(() => {
    fetchData();
  }, [forRefresh]);


  async function unWish(url){
    await AsyncStorage.getItem('movierulzWhish',async(err,res)=>{
        if(res!=null){
            let retriveData=JSON.parse(res)
            let newData={data:[],status:200}
            retriveData.data.forEach(async element => {
                if(element.link!=url){
                    console.log(element)
                    newData.data.push(element)
                }
                await AsyncStorage.setItem('movierulzWhish',JSON.stringify(newData),(err)=>{
                    if(!err){
                        setRefresh(forRefresh+1)
                    }
                })
            });
        }
    })
  }

  const renderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <View style={styles.row}>
          <View style={[styles.movie,{marginRight:"2%",marginLeft:"1%"}]}>
            <Pressable onPress={()=>{navigation.navigate('movie',{title:item.link})}} onLongPress={()=>{unWish(item.link)}} >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text} >{
                     item.title.slice(0,item.title.indexOf('(')) 
                        // item.title
                } 
              </Text>
          </Pressable>
          </View>
          {index + 1 < data.length && (
            <View style={[styles.movie]}>
              <Pressable onPress={()=>{navigation.navigate('movie',{title:data[index + 1].link})}} onLongPress={()=>{unWish(data[index + 1].link)}} >
              <Image source={{ uri: data[index + 1].image }} style={styles.image} />
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
      {data.length?<FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        keyboardDismissMode='on-drag'
        // refreshing={true}
        // onRefresh={fetchData}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />:<TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={{backgroundColor:'rgba(225,225,225,.2)',marginTop:'100%',width:300,marginLeft:"10%",borderRadius:10,padding:20}} ><Text style={{color:'white',fontSize:20,fontWeight:'bold',textAlign:'center'}} >Add Movies to Watch later</Text></TouchableOpacity>}
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
