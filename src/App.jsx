
import React, { createContext, useState,useEffect} from 'react'
// import './index.css'
import { ToastContainer } from 'react-toastify';
import Playback from './Components/Home_Page/playBack';
import Navbar from "./Components/Home_Page/Navbar";
import MediaPlayer from './Components/Home_Page/Library/mediaPlayer';

import HeroSection from './Components/Home_Page/HeroSection';
import AppRouter from './AppRouter';
import { useNavigate } from 'react-router-dom';
export const playBackContext=createContext();


function App() {
  
  const Navigation=useNavigate()
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [audio, setAudio] = useState(new Audio());
  const [favArt,setFavArt]=useState([])
  const [favLanguage,setFavLanguage]=useState([])
  const [currentSongIndex,setCurrentSongIndex]=useState(null)
  const [currentSongSection,setCurrentSongSection]=useState(null)
  const [isRightClicked,setIsRightClicked]=useState(false)
  const [isLeftClicked,setIsLeftClicked]=useState(false)


 
  const[playBackData,setPlayBackData]=useState({})
  // const[mediaData,setMediaData]=useState({})
  const[isMedia,setMedia]=useState(false)
  const[navData,setNavData]=useState({
    home:"Home",
    library:"Library",
    game:"Game"

  })
  
  localStorage.setItem("authTok",JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxODA1MTczLCJpYXQiOjE2OTkyMTMxNzMsImp0aSI6IjYwOTdkYTkxNTJmMDQ1YzY4YmE1MTBjZWQyMDM4MzAxIiwidXNlcl9pZCI6ImFkbWluIn0.zhhXZrQzl4fls2jh26tGQ6KMuKojlFV8r-rE1LEWT_w"))
  const[isHome,setHome]=useState(false)
  
  useEffect(() => {
   
    if(isMedia){
    if (Object.keys(playBackData).length > 0) {
      setMedia(false);
     
      Navigation("/media");
    }
  }
  }, [playBackData, Navigation]);
  
  
  return(
    <playBackContext.Provider value={{playBackData,isLeftClicked,setIsLeftClicked,isRightClicked,setIsRightClicked,setPlayBackData,setNavData,setHome,isPlaying,setMedia,isMedia, setIsPlaying,isLiked, setIsLiked,currentTime, setCurrentTime,totalDuration, setTotalDuration,audio, setAudio,favLanguage,setFavLanguage,favArt,setFavArt,currentSongIndex,setCurrentSongIndex,currentSongSection,setCurrentSongSection}} >
    <ToastContainer/>
    <AppRouter />
    {isHome?<Playback playBackData={playBackData}/>: null}
    {isHome?<Navbar navData={navData}/>: null}
   
    

    </playBackContext.Provider>

  );

}

export default App