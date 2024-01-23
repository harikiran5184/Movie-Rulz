import { View, Text,ToastAndroid } from 'react-native'
import React,{useState} from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function SeedrAccountLoginDetails() {
    const [data,setData]=useState({email:null,password:null})

    async function save(){
        try{
            await AsyncStorage.setItem('seedrdata',JSON.stringify(data)).then(()=>{
                ToastAndroid.show("Seedr added , if password failes and re-enter here",1500)
            })
        }
        catch{
            ToastAndroid.show("failed",1500)
        }
    }
  return (
    <View style={{flex:1,backgroundColor:'rgba(0,0,40,.9)',justifyContent:'center',alignItems:'center'}} >
        <Text style={{color:'white',fontSize:50,marginBottom:40}} >Seedr Auth</Text>
      <TextInput style={{color:'white',fontSize:25,height:"auto",width:"60%",borderRadius:10,backgroundColor:'black',alignItems:'center',justifyContent:'center',marginVertical:5}} textAlign='center' placeholder='E-mail' placeholderTextColor={'white'} onChangeText={(e)=>{setData({email:e,password:data.password})}} />
      <TextInput style={{color:'white',fontSize:25,height:"auto",width:"60%",borderRadius:10,backgroundColor:'black',alignItems:'center',justifyContent:'center',marginVertical:5}} textAlign='center' placeholder='Password' placeholderTextColor={'white'} onChangeText={(e)=>{setData({email:data.email,password:e})}} />
        <TouchableOpacity style={{backgroundColor:'rgba(10,10,50,1)',borderRadius:5}} onPress={save} >
            <Text style={{color:'white',padding:10}} >Save</Text>
        </TouchableOpacity>
    </View>
  )
}