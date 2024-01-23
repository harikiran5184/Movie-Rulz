import 'react-native-gesture-handler';
import React, { useEffect,useState } from 'react';
import { View, Text, StatusBar,Platform,Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import TopBar from './MovieNavigation/TopBar';
import Search from './Screens/Search';
import TextInputBar from './componets/TextInputBar';
import Movie from './Screens/Movie';
import MovierulzScreen from './Screens/MovierulzScreen';
import Web from './Screens/Web';
import Test from './Screens/Test';
import { RefreshProvider } from './componets/MovieContext';
import Vlc from './Screens/Vlc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SeedrAccountLoginDetails from './Screens/SeedrAccountLoginDetails';
import TestVlc from './Screens/TestVlc';
const Stack = createNativeStackNavigator();

export default function App() {
    
    const [tv,setTv]=useState(false)
    useEffect(()=>{
      if(Dimensions.get('screen').width>500 && Dimensions.get('screen').height>500){
        setTv(true)
      }
    },[])
    function Main(){
      return (
        <GestureHandlerRootView style={{flex:1,}} >
        <NavigationContainer>
      <StatusBar hidden={true} backgroundColor={"rgba(6, 2, 38,1)"} translucent={true} />
      {/* <View style={{backgroundColor:'rgba(6, 2, 38,1)'}} ><Text style={{textAlign:'center',width:200,color:"white",marginLeft:"25%",marginTop:3,fontSize:25,backgroundColor:"rgba(225,225,225,.5)",borderRadius:20}} >MovieRulz</Text></View> */}
      <Stack.Navigator screenOptions={{ header: () => null }} initialRouteName='intro' >
        <Stack.Screen name='intro' component={MovierulzScreen} />
        <Stack.Screen name="topbar" component={TopBar} />
        <Stack.Screen name="movie" component={Movie} />
        <Stack.Screen name='web' component={Web} />
        <Stack.Screen name='test' component={Test} />
        <Stack.Screen name='seedr' component={SeedrAccountLoginDetails} />
        <Stack.Screen name='vlc' component={Vlc} />
        <Stack.Screen name='testvlc' component={TestVlc} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
      )
    }
  return (
    <RefreshProvider>
      <Main />
    </RefreshProvider>

  );
}
