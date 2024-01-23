import { View, Text, SafeAreaView } from 'react-native'
import React,{useEffect} from 'react'
import WebView from 'react-native-webview'
export default function Web({navigation,route}) {
    const {url}=route.params
    if (url !== null){
    return ( 

        <WebView
   source={{uri:`${url}` /* html:`
   <meta name="viewport" content=" width=device - width, initial-scale=1.0 ">
        <frameset>
        <frame name="top" src="https://anits.edu.in" />
        </frameset>
   ` */ }}
        allowsFullscreenVideo
        javaScriptEnabled={true}
        originWhitelist={['*']}
        startInLoadingState
        style={{width:"100%",flex:1  }}
        mediaPlaybackRequiresUserAction={true} 
        /> 

    )
}
else{
    return (
        <Text>No Page to load</Text>
    )
}
}