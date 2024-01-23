import { View, Text, Pressable,StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

export default function Cricket({navigation}) { 
  return (
    <View style={styles.container} >
      <Pressable style={styles.button}  onPress={() => { navigation.navigate('web', { url: "https://cricketworldcup2023.github.io/live/english/"})}} >
        <Text style={styles.text} >Click to Watch</Text>
      </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgba(6, 2, 38,1)'   
    },
    frame:{
        marginTop:0,
        height:"100%",
        width:"100%"
    },
    text:{
        color:'white',
        fontSize:35,
        padding:20,
        textAlign:"center"
    },
    image:{
        margin:110,
        marginTop:50,
        marginBottom:20
    },
    button:{
        backgroundColor:'rgba(225,225,225,.1)',
        color:'white',
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,

    },
    linkButton:{
        width:300,
        height:30,
        backgroundColor:'rgba(225,225,225,.1)',
        color:'white',
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        margin:2,
        marginLeft:50,
        borderRadius:10
    },
    linkview:{
        width:400,
        height:'max-content',
        marginBottom:100
    }
})