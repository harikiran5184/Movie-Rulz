import { View, Text,FlatList,Image,StyleSheet,Pressable,Linking,TouchableOpacity,ToastAndroid,ImageBackground,Dimensions, } from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-controls'
import Orientation from 'react-native-orientation-locker'
import axios from 'axios'
import WebView from 'react-native-webview'
import Player from './Player'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated from 'react-native-reanimated'
// import { useRefresh,RefreshContext } from '../componets/MovieContext'
import { useRefresh } from '../componets/MovieContext';
export default function Movie({route,navigation}) {
    const { forRefresh, setRefresh } = useRefresh();
    const data=route.params
    const [fetchData,setFecthdata]=useState(null)
    const [type,setType]=useState('Unknown')
    const [Language,setLanguage]=useState('Unknown')
    const [seedr,setSeedr]=useState(null)
    const [tv,setTv]=useState(false)
    const [WH,setWH]=useState({Dwidth:0,Dheight:0})
    const [image,setImage]=useState('https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80')
    const [videoSrc,setVideoSrc]=useState('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4')
    const [videoBool,setVideoBool]=useState(false)
    const [hideButton,setHideButton]=useState(false)
    const [currentTime, setCurrentTime] = useState(new Date());
    const [seconds,setSeconds]=useState(null)
    const [playSelect,setPlaySelect]=useState(false)
    const [allowDld,setAllowDld]=useState(false)
    useEffect(()=>{

        
        decryptSeedr()
        fetch()
        if(Dimensions.get('screen').width>500 && Dimensions.get('screen').height>500){
        setTv(true)
        setWH({Dwidth:Dimensions.get('screen').width,Dheight:Dimensions.get('screen').height})
        console.log("Movie",tv)
    }
    },[])
async function videoSrcApiFetch(magnet){
    await axios.post('https://seedr-stream-apis.vercel.app/del',{auth:seedr}).then(async (res)=>{
        if(res.data.len){
            await axios.post('https://seedr-stream-apis.vercel.app/',{magnet:magnet,auth:seedr}).then((res)=>{
            if(res.data){
                ToastAndroid.show("Movie Added,please click on play",1500)
                setPlaySelect(true)
            }
            else{
                ToastAndroid.show("Failed to Add the movie",1500)
            }
    }).catch((err)=>{
        console.log("error occured at videoSrcFetch")
    })
        }
        else{
            console.log(res.data.len)
        }
    })
    
}
    function lan(title){
        try{
                if (title.includes('[')){
                    setLanguage(title.slice(title.indexOf('[')+1,title.indexOf(']')))
                }
                else if(title.includes('Telugu')){
                    setLanguage('Telugu')
                }
                else if(title.includes('Malayalam')){
                    setLanguage('Malayalam')
                }
                else if(title.includes('Hindi')){
                    setLanguage('Hindi')
                }
                else if(title.includes('Tamil')){
                    setLanguage('Tamil')
                }
                else if(title.includes('Kannada')){
                    setLanguage('Kannada')
                }
                else if(! title.includes('English')){
                    setLanguage('English')
                }
            }
            catch{
                setLanguage('UnKnown')
            }
    }
    async function fetch(){
        try{
            await axios.get(`https://movierulzapi-4njb.vercel.app/get?url=${data.title}`).then(res=>{
                console.log(res.data.title)
                setFecthdata(Array(res.data))
                // videoSrcApiFetch(res.data.torrent[res.data.torrent.length-1].magnet)
                setImage(res.data.image)
                try{
                if(res.data.title.includes('Season')){
                    setType(res.data.title.slice(res.data.title.indexOf('Season'),res.data.title.indexOf('Season')+9))
                    setLanguage(res.data.title.slice(res.data.title.indexOf('[')+1,res.data.title.indexOf(']')))
                }
                
                else if(res.data.title.includes("DVDScr")){
                    setType('DVDScr')
                    lan(res.data.title)
                }
                else if(res.data.title.includes("HDRip")){
                    setType('HDRip')
                    lan(res.data.title)
                }
                else if(res.data.title.includes("HQ Line")){
                    setType('HQ Line')
                    lan(res.data.title)
                }
                else if(res.data.title.includes("Song")){
                    setType('Song')
                    lan()
                }
            }
            catch{
                setType('unknown')
            }
            // try{
            //     if(res.data.title.includes('Telugu')){
            //         setLanguage('Telugu')
            //     }
            //     else if(res.data.title.includes('Malayalam')){
            //         setLanguage('Malayalam')
            //     }
            // }
            // catch{
            //     setLanguage('UnKnown')
            // }
            }).catch(err=>{
                console.log("movie doesnot exists")
                ToastAndroid.show('There is error with Movie ',1500)
                navigation.pop(1)
            })
        }
        catch{
            console.log("fetching failed")
        }
    }
    const [wishTitle,setWishTitle]=useState(false)
    const [wishurl,setWishurl]=useState(null)
    const [fullScreenMode,setFullscreenMode]=useState(true)
    async function decryptSeedr(){
        try{
            await AsyncStorage.getItem("seedrdata",async(err,result)=>{
                if(result!=null){
                   setSeedr(result)
                }
                else{
                    ToastAndroid.show('failed to login seedr',1500)
                }
            }).then(()=>{
                
            })
            
        }
        catch{
            ToastAndroid.show('failed to login seedr',1500)
        }
    }
    async function wishR(){
        try{
            await AsyncStorage.getItem("movierulzWhish",async(err,result)=>{
                if(result!=null){
                    let s=0
                    let retriveData=JSON.parse(result)
                    retriveData.data.forEach(element => {
                        if(data.title==element.link){
                            setWishTitle(false)
                            s=1
                        }
                    });
                    if(s==0){
                        setWishTitle(true)
                    }
                }
                else{
                    await AsyncStorage.setItem("movierulzWhish",JSON.stringify({data:[],status:200}))
                }
            })
        }catch{
            console.log("e")
        }
    }

    async function unWish(url){
        await AsyncStorage.getItem('movierulzWhish',async(err,res)=>{
            if(res!=null){
                let retriveData=JSON.parse(res)
                let newData={data:[],status:200}
                retriveData.data.forEach(async element => {
                    if(element.link!=url){
                        console.log(element)
                        newData.data.push(element)
                    }
                    await AsyncStorage.setItem('movierulzWhish',JSON.stringify(newData),(err)=>{
                        if(!err){
                            setRefresh(forRefresh+1)
                        }
                    })
                });
            }
        })
      }
      const [fullscreen,setFullscreen]=useState(false)
      const [url,seturl]=useState('https://nw11.seedr.cc/ff_get/1682254712/www.5MovieRulz.sh%20-%20Dada%20(2023)%20720p%20Tamil%20HQ%20HDRip%20-%20x264%20-%20(DD5.1%20-%20192Kbps%20%20AAC)%20-%201.4GB%20-%20ESub.mkv?st=evIhi1aV_LkvuwFBK9qSBA&e=1703821201')
      async function videoRefresh(){
        console.log("pressed")
        await axios.post('https://seedr-stream-apis.vercel.app/fetchVideoget',{auth:seedr}).then((res)=>{
            console.log(res.data)
            try{
            if(res.data[0].url.length>0)
            {
            // setVideoSrc(res.data.url)
            if(tv || !fullScreenMode){
                navigation.navigate('vlc',{allVideoLinks:res.data})
            }
            else
            navigation.navigate('testvlc',{allVideoLinks:res.data})
            // setVideoBool(true)
            // setHideButton(true)
        }
            else
            ToastAndroid.show("takes some more time,please don't left",1500)
            }
            catch{
                ToastAndroid.show("takes some more time,please don't left",1500)
            }
        })
      }
const [visi,setVisi]=useState(true)
  return (
    <View  style={styles.container} >
        <ImageBackground source={{uri: image}} style={[{backgroundColor:'rgba(0,0,0,.4)'}]} blurRadius={.8} >
      <View style={[styles.frame,{opacity:1,backgroundColor:'rgba(0,0,0,.4)'}]} >

        <FlatList data={fetchData} renderItem={({item})=>{
            wishR()
            return (
                <View>
                    <Text style={[styles.text,{marginTop:50}]} >{
                     item.title.includes("DVDScr") ||   item.title.includes("HDRip")  ?
                    item.title.slice(0,item.title.indexOf('(')) :
                     item.title.includes("Season") ? item.title.slice(0,item.title.indexOf('(')) + item.title.slice(item.title.indexOf('[')+1,item.title.indexOf(']'))
                        : item.title
                } 
              </Text>
              
                    <Image sharedTransitionTag={`image`} source={{uri:item.image}} style={[styles.image,{width:200,height:300,borderRadius:10,marginLeft:tv?(WH.Dwidth/2)-100:110},]} />
                    {wishTitle?<Pressable style={[styles.button,{width:150,marginLeft:tv?(WH.Dwidth/2)-75:120}]}
                        onPress={async ()=>{
                            let wishData={link:item.url,image:item.image,title:item.title}
                            let retriveData
                            try{
                            await AsyncStorage.getItem("movierulzWhish",async(err,result)=>{
                                if(result!=null){
                                    retriveData=JSON.parse(result)
                                }
                                else{
                                    await AsyncStorage.setItem("movierulzWhish",JSON.stringify({data:[],status:200}))
                                }
                            })
                        }catch{
                            console.log("e")
                        }
                        retriveData.data.push(wishData)
                        await AsyncStorage.setItem("movierulzWhish",JSON.stringify(retriveData),(err)=>{if(!err){
                            setWishTitle(false)
                            setRefresh(forRefresh+1)
                        }})
                        }}>
                    <Text style={{color:'white',fontWeight:'bold'}} >Add to Watch</Text></Pressable>:
                    <Pressable focusable={true} style={[styles.button,{width:150,marginLeft:tv?(WH.Dwidth/2)-75:120}]} onPress={()=>{unWish(item.url)}} >
                        <Text style={{color:'white',fontWeight:'bold'}} >Un-Watch</Text>
                    </Pressable>
                    }
                    {/* <Video source={{uri:'blob:https://streamwish.to/70d2737e-5d41-4417-b970-a2bac7c40e5c'}} style={{height:200,width:400}} /> */}

                    {/* <Text>Link:{item.torrent.length}</Text> */}
                    <Text style={{color:'white',fontStyle:'italic',padding:5,textAlign:'center'}} ><Text style={{fontWeight:"bold"}} >Type:</Text>{type}</Text>
                    {/* <Text style={{color:'white',fontStyle:'italic',textAlign:'center'}} ><Text style={{fontWeight:"bold"}} >Starring by:</Text>{item.cast.slice(item.cast.indexOf('Starring by:')+12,item.cast.indexOf('Genres'))}</Text>
                    <Text style={{color:'white',fontStyle:'italic',textAlign:'center'}} ><Text style={{fontWeight:"bold"}} >Directed by:</Text>{item.cast.slice(item.cast.indexOf(':')+1,item.cast.indexOf('Written by'))}</Text>
                    <Text style={{color:'white',fontStyle:'italic',textAlign:'center'}} ><Text style={{fontWeight:"bold"}} >Written by:</Text>{item.cast.slice(item.cast.indexOf('Written by:')+11,item.cast.indexOf('Starring by'))}</Text> */}
                    <Text style={{color:'white',fontStyle:'italic',padding:5,textAlign:'center',fontWeight:"bold"}} ><Text style={{fontWeight:"bold"}} ></Text>{item.cast.slice(0,item.cast.indexOf("Country"))}</Text>

                    <Text style={{color:'white',fontStyle:'italic',textAlign:'center'}} ><Text style={{fontWeight:"bold"}} >Language:</Text>{Language}</Text>
                    
                    <Text style={{color:'white',fontStyle:'italic',padding:20,textAlign:'center'}} ><Text style={{fontWeight:"bold"}} >Description:</Text>{item.description}</Text>
                        {playSelect?visi?<View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',columnGap:3}} >
                            <TouchableOpacity 
                                style={{backgroundColor:'rgba(225,225,225,.1)',borderRadius:10}}

                            onPress={()=>{
                                videoRefresh()
                                setVisi(false)
                                setTimeout(()=>{
                                    setVisi(true)
                                },10000)
                            }} >
                                <Text style={{color:'white',padding:5,paddingHorizontal:15,fontSize:20}} >Play</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{backgroundColor:'rgba(225,225,225,.1)',borderRadius:10}}
                            onPress={()=>{
                                setFullscreenMode(!fullScreenMode)
                            }}
                            >
                                <Text style={{color:'white',padding:5,paddingHorizontal:15,fontSize:20}}>{fullScreenMode?"Normal Mode":"FullScreen Mode"}</Text>
                            </TouchableOpacity>
                            {videoBool?<TouchableOpacity 
                                style={{backgroundColor:'rgba(225,225,225,.1)',borderRadius:10}}

                            onPress={()=>{setVideoBool(false)}} >
                                <Text style={{color:'white',padding:5,paddingHorizontal:15,fontSize:20}} >Hide video</Text>
                            </TouchableOpacity>:null}
                        </View>:
                        <View style={{justifyContent:'center',alignItems:'center'}} >
                        <Text style={{color:'white',alignItems:'center',justifyContent:'center'}} >please wait</Text>
                        </View>
                        :
                        <View style={{width:"100%",height:"auto",justifyContent:"center",alignItems:"center"}} >
                        <Text style={{color:"white",textAlign:"center",backgroundColor:"rgba(225,225,225,.2)",padding:5,borderRadius:8}} >Select the Quality from Torrent</Text>
                        </View>
                        }
                    <Text style={styles.text} >Torrent Files</Text>
                    <TouchableOpacity
              style={{backgroundColor:"rgba(225,225,225,.2)",width:90,height:"auto",justifyContent:"center",alignItems:"center",borderRadius:10,position:"relative",top:"-2.3%",left:"76%"}}
              onPress={()=>{
                setAllowDld(!allowDld)
              }}

              >
                <Text style={{color:"white",fontSize:20}} >{allowDld?"Un-Allow":"Allow"}</Text>
              </TouchableOpacity>
                    {item.torrent?
                <FlatList data={item.torrent} renderItem={({item:innerItem})=>{

                    return(
                    <View>
                        <Pressable focusable={true} style={[styles.button,{marginLeft:tv?(WH.Dwidth/2)-150:50}]} onPress={()=>{
                            try{
                                {allowDld?Linking.canOpenURL(innerItem.magnet)?Linking.openURL(innerItem.magnet): ToastAndroid.show('cannot open url',1500):null}
                            }
                            catch{
                                console.log('error')
                            }
                            finally{
                                {allowDld?null:innerItem.size.includes("mb") || parseFloat(innerItem.size)<2 ?videoSrcApiFetch(innerItem.magnet):ToastAndroid.show("max size should be less then 2 GB",1500)}
                            }
                        }}>
                        <Text style={{color:'white'}} >Magenet-{innerItem.quality}{innerItem.size}</Text>
                        </Pressable>
                    </View>
                    )
                }} 
                keyExtractor={(innerItem)=>innerItem.magnet}
                />:<Text>No Torrent Files</Text>
            }
                <Text style={[styles.text,{transform:[{scale:.9}]}]} >Links of Hosted files</Text>
                <View style={styles.linkview} >
                  {  item.other_links  ?
                <  FlatList
                            data={item.other_links}
                            renderItem={({ item: innerItem }) => (
                                <View  >
                                {/* <Text>Type: {innerItem.type}</Text> */}
                                {/* <Text>URL: {innerItem.url}</Text> */}

                                {
                                 innerItem.type===   " Streamtape"? 
                                <Pressable focusable={true} onPress={() => { navigation.navigate('web', { url: innerItem.url }) }} style={[styles.linkButton, { backgroundColor: 'rgba(0,225,0,.4)',marginLeft:tv?(WH.Dwidth/2)-150:50 }]}>
                                    <Text style={{ color: 'rgba(225,225,225,1)' }}> {innerItem.type}<Text style={{ fontSize: 11, color: 'rgba(100,200,200,1)' }}>(Recomended to watch)</Text></Text>
                                </Pressable>
                                 :
                                <Pressable focusable={true} onPress={()=>{navigation.navigate('web',{url:innerItem.url})}} style={[styles.linkButton,{marginLeft:tv?(WH.Dwidth/2)-150:50}]} ><Text style={{color:'white'}} > {innerItem.type}</Text></Pressable>
                            }
                                </View>
                            )}
                            keyExtractor={(innerItem) => innerItem.url} 
                />
                  : <Text>No Hosted Links</Text>      }
                </View>
                
                
                </View>
            )
        }}
        keyExtractor={(item)=> item.description}
        />
       {videoBool?
       <View style={{width:fullscreen? tv?Math.floor(Dimensions.get('screen').width):Math.floor(Dimensions.get('screen').height):350,height:fullscreen?tv?Math.ceil(Dimensions.get('screen').height):Math.ceil(Dimensions.get('screen').width):150,backgroundColor:'red',borderRadius:50,justifyContent:'center',alignItems:'center',left:fullscreen?0:15,bottom:fullscreen?0:10}} >
        <VideoPlayer
                    
        source={{uri:videoSrc}}
        videoStyle={{width:"100%",height:"100%",borderRadius:10}}
        style={{borderRadius:10}}
        disableBack={true}
        onEnterFullscreen={()=>{
        setFullscreen(true)
        tv?Orientation.lockToLandscape():Orientation.lockToLandscape()
        setHideButton(false)
        console.log("full")
        }}

        onExitFullscreen={()=>{
            console.log("not full")
            setHideButton(true)
            setFullscreen(false)
            tv?Orientation.unlockAllOrientations():Orientation.lockToPortrait()
            
        }}
        
        seekColor={"#0000ff"}
        />
        </View>
        : null    
    }
        </View>
        
        </ImageBackground>
     </View> 
  )
}


// function Uvlc({url}){
//     return(
        
//     )
// }

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
        padding:2,
        textAlign:"center"
    },
    image:{
        margin:110,
        marginTop:50,
        marginBottom:20
    },
    button:{
        width:300,
        height:30,
        backgroundColor:'rgba(225,225,225,.1)',
        color:'white',
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        margin:2,
        marginLeft:50,
        borderRadius:10,
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
    },
    video:{
        width:"100%",
        height:'100%',

    }
})