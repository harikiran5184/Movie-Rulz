import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity,Pressable,Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

export default function Search({navigation}) {
  const [data,setData]=useState([])
  const flatlist=useRef(null);
  const [input,setInput]=useState(null)
  const inputRef = useRef()
  const [tv,setTV]=useState(false)
  const [DWH,setDWH]=useState({DWidth:0,DHeight:0})
  useEffect(()=>{
    if(Dimensions.get('screen').width>500 && Dimensions.get('screen').height>500){
        setTV(true)
        setDWH({DWidth:Dimensions.get('screen').width,DHeight:Dimensions.get('screen').height})
    }
  },[])
  async function fetchData() {
    try {
      const response = await axios.get(`https://movierulz.vercel.app/search?query=${input}`);
      if (response.status === 200) {
        setData(response.data.data)
      } else {
        console.log('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=>{
    if(input!= null){
    fetchData()
    }
  },[input])
  function h(index) {
    if (index === data.length - 2) {
      if (pageno === 1) {
        return (
          <View style={{ position: 'absolute', bottom: 80,width:'100%',left:5 }}>
            <TouchableOpacity onPress={() => {setPageno(pageno + 1);flatlist.current?.scrollToOffset({ offset: 0, animated: true });}} style={[styles.tooglebutton,]} >
              <Text style={[{color:'white',fontSize:20,textAlign:'center'}]}>back</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={{ position: 'absolute', bottom: 70,width:'100%',left:5 }}>
            <TouchableOpacity onPress={() => {setPageno(pageno + 1);flatlist.current?.scrollToOffset({ offset: 0, animated: true });}} style={styles.tooglebutton} >
              <Text style={[{color:'white',fontSize:20,textAlign:'center'}]}>prev</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setPageno(pageno - 1);flatlist.current?.scrollToOffset({ offset: 0, animated: true });}} style={[styles.tooglebutton,{position:'absolute',bottom:0,right:15}]} >
              <Text style={[{color:'white',fontSize:20,textAlign:'center'}]}>New</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      return null;
    }
  }
  

  const renderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <View>
        <View style={styles.row}>
          <View style={[styles.movie, { marginRight:"2%",marginLeft:"1%" }]}>
          <Pressable onPress={()=>{navigation.navigate('movie',{title:item.link})}} >
            <Image source={{ uri: item.image }} style={styles.image} />
            {/* <Text style={styles.text}>{item.title.slice(0, item.title.indexOf("("))}</Text> */}
            <Text style={[styles.text]} >{
                     item.title.includes("DVDScr") ||   item.title.includes("HDRip")  ?
                    item.title.slice(0,item.title.indexOf('(')) :
                     item.title.includes("Season") ? item.title.slice(0,item.title.indexOf('(')) + item.title.slice(item.title.indexOf('[')+1,item.title.indexOf(']'))
                        : item.title
                } 
              </Text>
            </Pressable>
          </View>
          {index + 1 < data.length && (
            <View style={[styles.movie]}>
              <Pressable onPress={()=>{navigation.navigate('movie',{title:data[index + 1].link})}} >
              <Image source={{ uri: data[index + 1].image }} style={styles.image} />
{/*               <Text style={styles.text}>{data[index + 1].title.slice(0, data[index + 1].title.indexOf("("))}</Text>
 */}              
            <Text style={[styles.text]} >{
                                data[index + 1].title.includes("DVDScr") ||   data[index + 1].title.includes("HDRip")  ?
                                data[index + 1].title.slice(0,data[index + 1].title.indexOf('(')) :
                                data[index + 1].title.includes("Season") ? data[index + 1].title.slice(0,data[index + 1].title.indexOf('(')) + data[index + 1].title.slice(data[index + 1].title.indexOf('[')+1,data[index + 1].title.indexOf(']'))
                                    : data[index + 1].title
                            } 
              </Text>
             </Pressable>
            </View>
          )}
          
        </View>
        {index>=data.length-2?
        <View style={{width:"100%",height:50,backgroundColor:'rgba(0,0,0,0)'}} ></View>:null
    }
          {/* {h(index)} */}
        {/* {index>=data.length-2? <View style={{width:"100%",height:100}} ></View> : null} */}
        </View>
      );
    }
  };

  return (
    <View style={styles.view}>
      <TextInput placeholder='Search' placeholderTextColor={'rgba(6, 2, 38,.7)'} style={{color:'rgba(6, 2, 38,.7)',fontWeight:'bold',fontSize:30,backgroundColor:'rgba(225, 225, 225,.7)',width:300,height:60,borderRadius:40,textAlign:'center',position:'relative',top:100,left:tv?(DWH.DWidth/2)-150:55}} 
      onChangeText={value=>{
        setInput(value)
        inputRef.current.setNativeProps({
          top:10,
          zIndex:1
        })
      }}
      ref={inputRef}
      />
      {input === null ? <Text style={{color:'white',fontSize:40,textAlign:'center',marginTop:300}} >No search Founded</Text>:<FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => item.title}

        ref={flatlist}

      />}

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
    color: 'black',
    textAlign: "center",
    color: "white",
  },
  movie: {
    flex: 1,
    height: 350,
    flexDirection: 'column',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: -30,
  },
  view: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(6, 2, 38,1)',
    // justifyContent:'center',
    // alignItems:'center'
  },
  tooglebutton: {
    backgroundColor: 'rgba(6, 2, 38,.7)',
    padding: 10,
    borderRadius:100,
    width:100
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
