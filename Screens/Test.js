import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Animated,{useAnimatedGestureHandler,useSharedValue,useAnimatedStyle,withSpring} from 'react-native-reanimated'
import { PanGestureHandler,PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

export default function Test() {

    const translateX=useSharedValue(0)
    const translateY=useSharedValue(0)
    
    const panGestureEvent=useAnimatedGestureHandler({
        onStart:(event,context)=>{
            context.translateX=translateX.value
            context.translateY=translateY.value
        },
        onActive:(event,context)=>{
            translateX.value=event.translationX+context.translateX
            translateY.value=event.translationY+context.translateY
        },
        onEnd:()=>{
            const distance=Math.sqrt(translateX.value**2+translateY.value**2)
            if(distance<150){
            translateX.value=withSpring(0)
            translateY.value=withSpring(0)
            }
        }
    })

    const rStyle=useAnimatedStyle(()=>{
        return {
            transform:[{
                translateX:translateX.value,
            },{
                translateY:translateY.value
            }]
        }
    })

  return (
    <View style={styles.container} >
        <View style={{width:300,height:300,borderRadius:300,borderWidth:1,borderColor:'rgba(100,50,225,.8)',justifyContent:"center",alignItems:"center"}} >
    <PanGestureHandler onGestureEvent={panGestureEvent} >
    <Animated.View style={[styles.view,rStyle]} />
    </PanGestureHandler>
    </View>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    view:{
        width:100,
        height:100,
        borderRadius:25,
        backgroundColor:'rgba(100,40,225,.8)'
    }
})