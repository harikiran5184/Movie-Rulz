import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity,Pressable,RefreshControl } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function AllLanguage({navigation,lang}) {
  const [data,setData]=useState([])
  const [pageno, setPageno] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  const flatlist=useRef(null);
  async function fetchData() {
    setRefreshing(true);
    try {
      const response = await axios.get(`https://movierulz.vercel.app/${lang}/${pageno}`);
      if (response.status === 200) {
        setData(response.data.data)
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
  function h(index) {
    if (index === data.length - 2) {
      if (pageno === 1) {
        return (
          <View style={{ position: 'absolute', bottom: 80,width:'100%',left:5 }}>
            <TouchableOpacity onPress={() => {setPageno(pageno + 1);flatlist.current?.scrollToOffset({ offset: 0, animated: true });}} style={[styles.tooglebutton,]} >
              {/* <Text style={[{color:'white',fontSize:20,textAlign:'center'}]}>back</Text> */}
              <Icon name='arrow-back-ios-new' style={[{color:'white',fontSize:20,textAlign:'center'}]} />
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={{ position: 'absolute', bottom: 70,width:'100%',left:5 }}>
            <TouchableOpacity onPress={() => {setPageno(pageno + 1);flatlist.current?.scrollToOffset({ offset: 0, animated: true });}} style={[styles.tooglebutton,{backgroundColor:'rgba(225, 225, 225,.3)'}]} >
              {/* <Text style={[{color:'white',fontSize:20,textAlign:'center'}]}>prev</Text> */}
              <Icon name='arrow-back-ios-new' style={[{color:'white',fontSize:20,textAlign:'center'}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setPageno(pageno - 1);flatlist.current?.scrollToOffset({ offset: 0, animated: true });}} style={[styles.tooglebutton,{position:'absolute',bottom:0,right:15}]} >
              {/* <Text style={[{color:'white',fontSize:20,textAlign:'center'}]}>New</Text> */}
              <Icon name='navigate-next' style={[{color:'white',fontSize:20,textAlign:'center'}]} />
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      return null;
    }
  }
  
  
  useEffect(() => {
    fetchData();
  }, [pageno]);

  const renderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <View>
        <View style={styles.row}>
          <View style={[styles.movie, { marginRight:"2%",marginLeft:"1%" }]}>
          <Pressable onPress={()=>{navigation.navigate('movie',{title:item.link})}} >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.title.slice(0, item.title.indexOf("("))}</Text>
            </Pressable>
          </View>
          {index + 1 < data.length && (
            <View style={[styles.movie]}>
              <Pressable onPress={()=>{navigation.navigate('movie',{title:data[index + 1].link})}} >
              <Image source={{ uri: data[index + 1].image }} style={styles.image} />
              <Text style={styles.text}>{data[index + 1].title.slice(0, data[index + 1].title.indexOf("("))}</Text>
              </Pressable>
            </View>
          )}
          
        </View>
        {index>=data.length-2? <View style={{width:"100%",height:100}} ></View> : null}
          {h(index)}
        </View>
      );
    }
  };

  return (
    <View style={styles.view}>
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => item.image}

        ref={flatlist}
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
  },
  tooglebutton: {
    backgroundColor:'rgba(225, 225, 225,.3)',
    padding: 7,
    borderRadius:40,
    width:40,
    height:40
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

