import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function Prev() {
  return (
    <View style={{ position: 'absolute', bottom: 80,width:'100%',left:5 }}>
            <TouchableOpacity onPress={() => {setPageno(pageno + 1);flatlist.current?.scrollToOffset({ offset: 0, animated: true });}} style={[styles.tooglebutton,]} >
              {/* <Text style={[{color:'white',fontSize:20,textAlign:'center'}]}>back</Text> */}
              <Icon name='arrow-back-ios-new' style={[{color:'white',fontSize:20,textAlign:'center'}]} />
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