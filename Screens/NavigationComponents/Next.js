import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Next() {
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
  )
}

const styles = StyleSheet.create({
    tooglebutton: {
        backgroundColor:'rgba(225, 225, 225,.3)',
        padding: 7,
        borderRadius:40,
        width:40,
        height:40
      },
})