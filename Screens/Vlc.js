import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Pressable, Animated, Dimensions, FlatList, BackHandler, StatusBar } from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import KeepAwake from 'react-native-keep-awake';
export default function Vlc({navigation,route}) {
  const {allVideoLinks}=route.params
  const vlcPlayerRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [ORE, setORE] = useState(false);
  const [popStatus, setPopStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration,setDuration]=useState(0)
  const [muteStatus,setMuteStatus]=useState(false)
  const [audioData,setAudioData]=useState(null)
  const [audioTrack,setAudioTrack]=useState(0)
  const [subTrack,setSubTrack]=useState(0)
  const [subData,setSubData]=useState(null)
  const [timmingStat,setTimmingStat]=useState(true)
  const [BufferRate,setBufferRate]=useState(0)
  const [isTv,setIsTv]=useState(false)
  const [count,setCount]=useState(0)
  const [title,setTitle]=useState(null)
  const [videoDataStatus,setVideoDataStatus]=useState(false)
  useEffect(()=>{
    if(Dimensions.get('screen').width>500 && Dimensions.get('screen').height>500){
      setIsTv(true)
    }
    console.log(allVideoLinks)
    setTitle(allVideoLinks[count].name)
  },[])
  const handlePlay = () => {
    setPlay(!play);
    
  };
  useEffect(()=>{
    if(play){
      KeepAwake.deactivate()
    }
    else{
      KeepAwake.activate();

    }
  },[play])
  function videoChange(){
    console.log(allVideoLinks[count].name)
  }

  const backAction = () => {
    KeepAwake.deactivate()
    setPlay(true);
    if(!isTv){
    setORE(false);
    }
  };
  useEffect(()=>{
    KeepAwake.activate();
  },[])
  // Add event listener for hardware back press
  BackHandler.addEventListener('hardwareBackPress', backAction);
  const popUp = new Animated.Value(0);

  function PopHandle(value) {
    Animated.timing(popUp, {
      toValue: value,
      useNativeDriver: true,
      duration: 500,
    }).start(() => {
      console.log('pop animation started');
      if (value === 0) {
        setPopStatus(false);
      } else {
        setPopStatus(true);
      }
    });
  }

  function PopRe() {
    Animated.timing(popUp, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start(() => {
      console.log('pop animation started back');
    });
  }

  const handleSeek = (value) => {
      setSeekValue(value);
    
  };

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
  
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);
  
    const formattedTime = `${hours > 0 ? hours.toString.length>1?hours:"0"+hours  : '00'}:${minutes > 0 ? minutes.toString().length >1? minutes:"0"+minutes : '00'}:${remainingSeconds > 0 ? remainingSeconds.toString().length >1? remainingSeconds:"0"+remainingSeconds : '00'}`;
  
    return formattedTime.trim(); // Trim to remove any trailing space
  }
  function AudioTracks({data}){
    useEffect(()=>{
      setPlay(true)
    },[])
    return(
      <FlatList
      style={{height:"90%",borderRadius:20}}
      data={data}
      renderItem={({item})=>{
        return (
          <Pressable style={{width:"auto",height:"auto",zIndex:1,marginTop:10,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(225,225,225,.3)",borderRadius:10}}
           onPress={()=>{
            setPopStatus(false)
            setAudioTrack(item.id)
            console.log(item.id)
            setPlay(false)
            }} >
          <Text style={{color:"white",padding:5}} 
          
          onPress={()=>{
            setPopStatus(false)
            setAudioTrack(item.id)
            console.log(item.id)
            setPlay(false)
            }}
          
          >{`${item.name}`}</Text>
          </Pressable>
        );
      }
    }
      
      />
    )
  }
  function SubTracks({data}){
    return(
      <FlatList
      style={{height:"90%",borderRadius:20}}
      data={data}
      renderItem={({item})=>{
        return (
          <Pressable style={{width:"auto",height:"auto",marginTop:10,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(225,225,225,.3)",borderRadius:10}} 
          onPress={()=>{
            setPopStatus(false)
            setSubTrack(item.id)
            console.log(item.id)
            setPlay(false)
            }} >
          <Text style={{color:"white",padding:5}} 
          
          onPress={()=>{
            setPopStatus(false)
            setSubTrack(item.id)
            console.log(item.id)
            setPlay(false)
            }}

          >{`${item.name}`}</Text>
          </Pressable>
        );
      }
    }
      
      />
    )
  }
  function VideosData(){
    return(
      <FlatList
      style={{height:"90%",borderRadius:20,marginLeft:"5%"}}
      data={allVideoLinks}
      renderItem={({item})=>{
        return (
          <Pressable style={{width:"auto",height:"auto",marginTop:10,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(225,225,225,.3)",borderRadius:10}} 
          onPress={()=>{
            setVideoDataStatus(false)
            setCount(item.id)
            console.log(item.id+"item")
            setTitle(item.name)
            setPlay(false)
            }} 
            >
          <Text style={{color:"white",padding:5}} 
          
          // onPress={()=>{
          //   setPopStatus(false)
          //   setSubTrack(item.id)
          //   console.log(item.id)
          //   setPlay(false)
          //   }}

          >{`${item.name}`}</Text>
          </Pressable>
        );
      }
    }
      
      />
    )
  }
  useEffect(()=>{
    if(BufferRate==100){
      setTimmingStat(false)
    }
    else{
      setTimmingStat(true)
    }
  },[BufferRate])
  return (
    <View style={{ flex: 1,width:"100%",height:"100%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}  >
      {/* <StatusBar hidden={true} showHideTransition={'fade'} translucent={true} animated={true} barStyle={'dark-content'}  /> */}
      <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center",}}
      
      onTouchEnd={()=>{
        setTimmingStat(!timmingStat)
        clearTimeout(timeout)
        const timeout=setTimeout(()=>{
          if(timmingStat)
          setTimmingStat(!timmingStat)
        },5000)
      }}
      
      >
      <VLCPlayer
        paused={play}
        style={{ width: '100%', height: isTv?"100%":ORE ? '100%' : '30%',zIndex:-1 }}
        source={{
          uri:
          allVideoLinks[count].url
          // "https://thepaciellogroup.github.io/AT-browser-tests/video/ElephantsDream.mp4"
           
        }}
        onLoad={(e) => {
          console.log(e);
          setDuration(e.duration)
          console.log(duration)
          setAudioData(e.audioTracks)
          setSubData(e.textTracks)
        }}
        repeat={true}
        Orientation={isTv?Orientation.lockToLandscape():ORE ? Orientation.lockToLandscape() : Orientation.lockToPortrait()}
        autoAspectRatio={true}
        muted={muteStatus}
        onProgress={(e)=>{
          setCurrentTime(e.currentTime)
          setPosition(e.position)
        }}
        seek={seekValue}
        audioTrack={audioTrack}
        textTrack={subTrack}
        
        onBuffering={(e)=>{
          setBufferRate(e.bufferRate)
        }}

      />
      </View>
      {timmingStat?<View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0%',
          left: '0%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{position:"absolute",width:"100%",height:"auto",top:"3%",justifyContent:"center",alignItems:"center"}} >
            <Pressable style={{backgroundColor: 'rgba(150,30,30,.4)', height: 'auto', width: 'auto', borderRadius: 100,position:"absolute",left:"3%"}}
            onPress={()=>{
              setPlay(true)
              setVideoDataStatus(!videoDataStatus)
            }}
            >
              <Text style={{color:"white",padding:10}} >
              <MaterialCommunityIcons name="format-list-bulleted-square" style={{color:"white",fontSize:20}} />
              </Text>
              </Pressable>
          <Text style={{color:"white",width:"40%",backgroundColor:"rgba(150,30,30,.4)",textAlign:"center",borderRadius:10}} >{title}</Text>
            <Pressable onPress={()=>{
              setMuteStatus(!muteStatus)
            }}
            style={{ backgroundColor: 'rgba(150,30,30,.4)', height: 'auto', width: 'auto', borderRadius: 100,position:"absolute",right:"3%"}}
            >
              <Text style={{color:"white",padding:10}} >{!muteStatus?
              <Octicons name="unmute" style={{color:"white",fontSize:20}} />
              :
              <Octicons name="mute" style={{color:"white",fontSize:20}} />
              }</Text>
            </Pressable>

          </View>
          {BufferRate==100?null:<Text style={{color:"white",backgroundColor:"rgba(150,30,30,.4)",padding:5,borderRadius:10}} >{Math.floor(BufferRate)}%</Text>}
          {Math.floor(((currentTime))/1000)>9?
          <Pressable style={{ backgroundColor: 'rgba(150,30,30,.4)', height: 'auto', width: 'auto', borderRadius: 100,position:"absolute",top:"47.5%",left:"20%" }}
          
              onPress={()=>{
                // setSeekValue(currentTime-10)
                setSeekValue(Math.floor(((currentTime))/1000)-10)
              }}

          >
          <Text style={{color:"white",padding:10}} >-10</Text>
        </Pressable>:null}
        <Pressable onPress={handlePlay} style={{ backgroundColor: 'rgba(150,30,30,.4)', height: 'auto', width: 'auto', borderRadius: 100 }}>
          <Text style={{ color: 'white', padding: 10 }}>{!play ? <Feather name={'pause'} style={{ color: 'white', fontSize: 30 }} /> : <Feather name={'play'} style={{ color: 'white', fontSize: 30 }} />}</Text>
        </Pressable>
        {Math.floor(((currentTime))/1000)<Math.floor(((duration))/1000)-10?
        <Pressable style={{ backgroundColor: 'rgba(150,30,30,.4)', height: 'auto', width: 'auto', borderRadius: 100,position:"absolute",top:"47.5%",right:"20%" }}
        onPress={()=>{
          // setSeekValue(currentTime-10)
          setSeekValue(Math.floor(((currentTime))/1000)+10)
        }}

        >
          <Text style={{color:"white",padding:10}} >+10</Text>
        </Pressable>:null}
        <Pressable
          style={{
            position: 'absolute',
            bottom: '1%',
            right: '3%',
            backgroundColor: 'rgba(150,30,30,.4)',
            borderRadius: 100,
          }}
          onPress={() => {
            setORE(!ORE);
          }}>
          <Text>
            <MaterialCommunityIcons name={'autorenew'} style={{ color: 'white', fontSize: 30 }} />
          </Text>
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            bottom: '1%',
            left: '3%',
            backgroundColor: 'rgba(150,30,30,.4)',
            borderRadius: 100,
          }}
          onPress={()=>{
            setPopStatus(!popStatus)
          }}
          >
          <Text style={{padding:5}} >
            <MaterialCommunityIcons name={"subtitles-outline"} style={{color:'white',fontSize:20, }} />
          </Text>
        </Pressable>
        <View style={{width:"100%",height:"100%",position:"absolute",top:isTv?"76%":ORE?"76%":"90%"}}>
        <Text style={{color:"white",position:"absolute",left:"5%"}} >{formatTime(Math.floor(currentTime))}</Text>
          <Text style={{color:"white",position:"absolute",right:"5%"}} >{formatTime(Math.floor(duration))}</Text>
          <Slider
          style={{width: "100%", height: 50,}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#961e1e"
          maximumTrackTintColor="#961e1e"
          thumbTintColor="#961e1e"
          onValueChange={(e)=>{
            console.log(Math.floor((e * duration)/1000))
            setSeekValue(Math.floor((e*duration))/1000)
          }}
          value={position}
          />
        </View>
      </View>:null}
      {popStatus?<Animated.View
        style={[
          {
            width: ORE?"60%":'90%',
            height: '50%',
            backgroundColor: '"rgba(150,30,30,.7)"',
            position: 'absolute',
            borderRadius: 20,
            zIndex:1,
          },
        ]}
        >
          
          <Pressable style={{width:"auto",height:"auto",backgroundColor:"rgba(0,0,0,.2)",position:"absolute",right:".5%",top:".5%",borderRadius:100}} onPress={()=>{
            setPopStatus(false)
            setPlay(false)
            }} >
            <Text style={{color:"white"}} >
              <MaterialCommunityIcons name="close-circle-outline" style={{color:"white",fontSize:30}} />
            </Text>
          </Pressable>
          <View style={{width:"100%",height:"90%",position:"absolute",bottom:"0%",borderRadius:20,justifyContent:"center",alignItems:"center"}} >
            <View style={{width:ORE?"30%":"50%",height:"90%",position:"absolute",left:ORE?"10%":"3%",justifyContent:"center",alignItems:"center"}} >
          <Text style={{color:"white"}} >Audio</Text>
          <AudioTracks data={audioData} />
          </View>
          <View style={{width:ORE?"30%":"50%",height:"90%",position:"absolute",right:ORE?"10%":"3%",justifyContent:"center",alignItems:"center"}} >
          <Text style={{color:"white"}} >subtitles</Text>
          <SubTracks data={subData} />
          </View>
          </View>
        </Animated.View>:null}
        {videoDataStatus?<View 
        style={[
          {
            width: ORE?"30%":'90%',
            height: '50%',
            backgroundColor: '"rgba(150,30,30,.7)"',
            position: 'absolute',
            borderRadius: 20,
            zIndex:1,}]}
        >
<Pressable style={{width:"auto",height:"auto",backgroundColor:"rgba(0,0,0,.2)",position:"absolute",right:".5%",top:".5%",borderRadius:100}} onPress={()=>{
            setVideoDataStatus(false)
            setPlay(false)
            }} >
            <Text style={{color:"white"}} >
              <MaterialCommunityIcons name="close-circle-outline" style={{color:"white",fontSize:30}} />
            </Text>
          </Pressable>
          <View style={{width:"90%",height:"90%",position:"absolute",bottom:"0%",borderRadius:20,justifyContent:"center",alignItems:"center"}} >
            <Text style={{color:"white"}} >Videos</Text>
          <VideosData />
          </View>
        </View>:null}
    </View>
  );
}
