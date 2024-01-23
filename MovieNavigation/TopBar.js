import { View, Text, StatusBar, Image,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Home from '../Screens/Home'
import Telugu from '../Screens/Telugu'
import Hindi from '../Screens/Hindi'
import Tamil from '../Screens/Tamil'
import Malayalam from '../Screens/Malayalam'
import English from '../Screens/English'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'

import Search from '../Screens/Search'
import Test from '../Screens/Test'
import WishList from '../Screens/WishList'
import Cricket from '../Screens/Cricket'
import AllLanguage from '../Screens/AllLanguage'
import TVTelugu from '../Screens/TV/TVTelugu'
import TVHindi from '../Screens/TV/TVHindi'
import TVEnglish from '../Screens/TV/TVEnglish'
import TVMalayalam from '../Screens/TV/TVMalayalam'
import TVTamil from '../Screens/TV/TVTamil'
import TVSearch from '../Screens/TV/TVSearch'
import TVWishList from '../Screens/TV/TVWishList'
import TVHome from '../Screens/TV/TVHome'

export default function TopBar({navigation}) {
  const Tab = createMaterialTopTabNavigator()

  const [tv,setTv]=useState(false)
    useEffect(()=>{
      if(Dimensions.get('screen').width>500 && Dimensions.get('screen').height>500){
        setTv(true)
      }
    },[])

  return (
      <Tab.Navigator
        initialRouteName='Home'
        tabBarPosition='bottom'
        screenOptions={({ route }) => ({
          tabBarIcon:({focused,size,color})=>{
            let icon;
            if(route.name==='Home'){
            icon='home'
            color= focused ? 'blue' : 'white'
            size=focused ? 25 : 25
            }
            else if(route.name==='Tel'){
              return (
                <Text style={{color:focused ? 'blue':'white',fontSize:20,marginTop:1,zIndex:1,transform:[{scale:focused ? 2 :1}]}} >తె</Text>
                )
            }
            else if(route.name==='Hin'){
              return (
                <Text style={{color:focused ? 'blue':'white',fontSize:20,marginTop:1,zIndex:1,transform:[{scale:focused ? 2 :1}]}} >हि</Text>
                )
            }
            else if(route.name==='Tam'){
              return (
                <Text style={{color:focused ? 'blue':'white',fontSize:20,marginTop:1,zIndex:1,transform:[{scale:focused ? 2 :1}]}} >டி</Text>
                )
            }
            else if(route.name==='Mala'){
              return (
                <Text style={{color:focused ? 'blue':'white',fontSize:20,marginTop:1,zIndex:1,transform:[{scale:focused ? 2 :1}]}} >മാ</Text>
                )
            }
            else if(route.name==='Eng'){
              return (
                <Text style={{color:focused ? 'blue':'white',fontSize:20,marginTop:1,zIndex:1,transform:[{scale:focused ? 2 :1}]}} >E</Text>

                )
            }
            else if(route.name==="Cric"){
              return(
              <Text style={{color:focused ? 'orange':'orange',fontSize:20,marginTop:1,zIndex:1,transform:[{scale:focused ? 2 :1}]}} >L</Text>
              )
            }
            else if(route.name==='Search'){
              icon='search1'
            color= focused ? 'lightblue' : 'white'
            size=focused ? 25 : 25
            }
            else if(route.name==='Wish'){
              icon=focused?'clockcircle':'clockcircleo'
            color= focused ? 'red' : 'red'
            size=focused ? 22 : 22
            }
            
            return (
              
              <AntDesign name={icon}  style={{color:color,fontSize:size,transform:[{scale:focused ? 1.5 :1}]}}  />
            )
          }
          ,
          tabBarStyle: {
            backgroundColor: 'rgba(6, 2, 38,.9)',
            opacity: 1,
            // borderRadius: 10,
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            width: "100%",
            height: 60,
            position: 'absolute',
            bottom: "-0.5%",
            left: "0%"
          },
          tabBarShowLabel:false,
          tabBarActiveTintColor: 'green', // Change the active tab color here
        })}
        keyboardDismissMode={'on-drag'}
      >
        <Tab.Screen name='Home' component={tv?TVHome:Home} options={{tabBarActiveTintColor:'rgba(225,0,0,.3)'}} />
        <Tab.Screen name='Tel' component={tv? TVTelugu :Telugu} />
        <Tab.Screen name='Hin' component={tv? TVHindi :Hindi} />
        <Tab.Screen name='Tam' component={tv?TVTamil:Tamil} />
        <Tab.Screen name='Mala' component={tv?TVMalayalam:Malayalam} />
        <Tab.Screen name='Eng' component={tv?TVEnglish:English} />
        <Tab.Screen name='Search'  component={tv?TVSearch:Search} />       
        <Tab.Screen name='Cric'  component={Cricket} /> 
        <Tab.Screen name="Wish" component={tv?TVWishList:WishList} />

      </Tab.Navigator>
  )
}

