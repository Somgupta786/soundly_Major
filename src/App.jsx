import React, { createContext, useState, useEffect } from "react";
// import './index.css'
import { ToastContainer } from "react-toastify";
import Playback from "./Components/Home_Page/playBack";
import Navbar from "./Components/Home_Page/Navbar";
import MediaPlayer from "./Components/Home_Page/Library/mediaPlayer";
import axios from "axios";
import HeroSection from "./Components/Home_Page/HeroSection";
import AppRouter from "./AppRouter";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const playBackContext = createContext();

function App() {
  const location = useLocation();
  const Navigation = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [audio, setAudio] = useState(new Audio());
  const [favArt, setFavArt] = useState([]);
  const [favLanguage, setFavLanguage] = useState([]);
  const [futureSongData, setfutureSongData] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [currentSongSection, setCurrentSongSection] = useState(null);
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [isLeftClicked, setIsLeftClicked] = useState(false);
  const [songData, setSongData] = useState(null);

  const [playBackData, setPlayBackData] = useState({});
  const [gamePlayBackData, setGamePlayBackData] = useState({});
  // const[mediaData,setMediaData]=useState({})
  const [isMedia, setMedia] = useState(false);
  const [navData, setNavData] = useState({
    home: "Home",
    library: "Library",
    game: "Game",
  });
  
  // useEffect(() => {
  //   const storedIsLogged = JSON.parse(localStorage.getItem("isLogged"));
  //   const storedAuthTok = JSON.parse(localStorage.getItem("authTok"));

  //   if (storedIsLogged === null) {
  //     localStorage.setItem("isLogged", JSON.stringify(false));
  //   }

  //   if (storedAuthTok === null) {
  //     localStorage.setItem("authTok", JSON.stringify(""));
  //   }
  // }, []);
  
  const token = JSON.parse(localStorage.getItem("authTok"));
  const [isHome, setHome] = useState(false);

  useEffect(() => {
    if (isMedia) {
      if (Object.keys(playBackData).length > 0) {
        setMedia(false);

        Navigation("/media");
      }
    }
  }, [playBackData, Navigation]);
  useEffect(() => {
    console.log("in app")
    if (isRightClicked) {
      
      const apiCaller = async () => {
        try {
          const url = `https://test-mkcw.onrender.com/api/getsong/${
            futureSongData[currentSongIndex + 1].id
          }/`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            setSongData(response.data.data);
          } else {
            console.error("Failed to fetch song data.");
          }
        } catch (error) {
          setIsRightClicked(false);
        }
      };
      apiCaller();
      
    }
    if (isLeftClicked) {
      
      const apiCaller = async () => {
        try {
          const url = `https://test-mkcw.onrender.com/api/getsong/${
            futureSongData[currentSongIndex - 1].id
          }/`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            setSongData(response.data.data);
          } else {
            console.error("Failed to fetch song data.");
          }
        } catch (error) {
          setIsLeftClicked(false);
        }
      };
      apiCaller();
      
    }
  }, [isRightClicked, isLeftClicked]);
useEffect(()=>{
  if(songData&&isRightClicked){setPlayBackData({
         
    url:songData.song_url,
    id:futureSongData[currentSongIndex+1].id,
    thumbnail: futureSongData[currentSongIndex+1].thumbnail_url,
    name: futureSongData[currentSongIndex+1].name,
    artist:futureSongData[currentSongIndex+1].artist,
    isLiked:songData.is_liked
    
  })
  setCurrentSongIndex(currentSongIndex+1)
  setIsRightClicked(false);
}
if(songData&&isLeftClicked){setPlayBackData({
         
  url:songData.song_url,
  id:futureSongData[currentSongIndex-1].id,
  thumbnail: futureSongData[currentSongIndex-1].thumbnail_url,
  name: futureSongData[currentSongIndex-1].name,
  artist:futureSongData[currentSongIndex-1].artist,
  isLiked:songData.is_liked
  
})
setCurrentSongIndex(currentSongIndex-1)
setIsLeftClicked(false);
}
},[songData])
useEffect(()=>{
if(isHome && location.pathname=="/game"&& gamePlayBackData){
  console.log(gamePlayBackData)
  setPlayBackData({
    
    url: gamePlayBackData.url,
   
    
    
  })
}
},[gamePlayBackData])
useEffect(()=>{
  localStorage.setItem('isLogged',JSON.stringify(false))
  localStorage.setItem('authTok',JSON.stringify(""))
 },[])   
  return (
    <playBackContext.Provider
      value={{
        gamePlayBackData,
         setGamePlayBackData,
        futureSongData,
        setfutureSongData,
        playBackData,
        isLeftClicked,
        setIsLeftClicked,
        isRightClicked,
        setIsRightClicked,
        setPlayBackData,
        setNavData,
        setHome,
        isPlaying,
        setMedia,
        isMedia,
        setIsPlaying,
        isLiked,
        setIsLiked,
        currentTime,
        setCurrentTime,
        totalDuration,
        setTotalDuration,
        audio,
        setAudio,
        favLanguage,
        setFavLanguage,
        favArt,
        setFavArt,
        currentSongIndex,
        setCurrentSongIndex,
        currentSongSection,
        setCurrentSongSection,
      }}
    >
      <ToastContainer />
      <AppRouter />
      {isHome ? location.pathname=="/game"?<Playback playBackData={gamePlayBackData} className="hidden" /> :<Playback playBackData={playBackData} />: null}
      {isHome ? <Navbar navData={navData} /> : null}
    </playBackContext.Provider>
  );
}

export default App;
