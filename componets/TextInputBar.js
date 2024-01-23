import { View, Text ,TextInput } from 'react-native'
import React from 'react'

export default function TextInputBar({navigation}) {
    function search(){
        navigation.replace('search')
    }
  return (
    <View>
      <TextInput placeholder='search' onChangeText={()=>{search()}} />
    </View>
  )
}