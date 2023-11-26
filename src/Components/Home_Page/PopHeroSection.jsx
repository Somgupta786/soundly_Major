import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Footer from './Footer';
import ImgCard from './ImgCard';
import Playback from './playBack'; 

import { useContext } from 'react';
import { playBackContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function PopHeroSection(props) {
  const token = JSON.parse(localStorage.getItem('authTok'));
const navigate = useNavigate();
  const{setHomeIcon,  setLibraryIcon,setPlayBackData,setfutureSongData,setCurrentSongSection,setHome,setMedia,isMedia,setMediaData,currentSongIndex,currentSongSection,setCurrentSongIndex}=useContext(playBackContext);
  setHomeIcon(true)
  setLibraryIcon(false)
setHome(true)
  

  const [songs, setSongs] = useState([]);
  
  const[isPhone,setIsPhone]=useState(false)
  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);

  
  const handleImgCardClick = (song,songIndex) => {
    console.log(songIndex)
    
      setCurrentSongIndex(songIndex)
      setCurrentSongSection("Query")
      setfutureSongData(songs)
      
    
   
    setSelectedSong(song); 
  
 
   
     
  
  };
  useEffect(() => {
    console.log(songData)
    if(songData&&currentSongIndex!=null){
      console.log(songData.is_liked)
    setPlayBackData({
      index:currentSongIndex,
      url: songData.song_url,
      id: songData.id,
      thumbnail: songData.thumbnail_url,
      name: songData.name,
      artist:selectedSong.artist,
      isLiked:songData.is_liked,
      lyrics_url:songData.lyrics_lyrics_json
      
    })
   
   
    
  }
  },[songData])

 

 

  useEffect(() => {
    const fetchSongs = async () => {
      if(props.name=="Recently Played"){
        try {
          const url = "https://test-mkcw.onrender.com/api/recentlyplayed/";
           const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          if (response.data.success) {
            const fetchedSongs = response.data.data;
            setSongs(fetchedSongs);
          } else {
            console.error('Failed to fetch songs.');
          }
        } catch (error) {
          setSongs([])
          console.error('An error occurred:', error);
        }
      }
      else
      {
        
        try {
        const url = `https://test-mkcw.onrender.com/api/songsearch/?query=${props.name}`;
         const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const fetchedSongs = response.data.data;
          setSongs(fetchedSongs);
        } else {
          console.error('Failed to fetch songs.');
        }
      } catch (error) {
        setSongs([])
        console.error('An error occurred:', error);
      }
    }
      
    };

    fetchSongs();
  }, [props]);
  useEffect(() => {
    const fetchSongData = async () => {
      if (selectedSong) {
        try {
          const url = `https://test-mkcw.onrender.com/api/getsong/${selectedSong.id}/`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          if (response.data.success) {
            setSongData(response.data.data);
            console.log(songData)
          } else {
            console.error('Failed to fetch song data.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    };
  
    fetchSongData();
  }, [selectedSong,isMedia]);
  
  useEffect(() => {
    const handleViewportChange = () => {
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      setIsPhone(viewportWidth <= 800);
    };

    const mediaQueryList = window.matchMedia("(max-width: 800px)");
    handleViewportChange(); // Initial check
    mediaQueryList.addEventListener("change", handleViewportChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleViewportChange);
    };
  }, []);
  const handleClick = (item) => {
    console.log(item)
    navigate(item.onclick,{
      state:item.title
    });
  };
  return (
    <div className="heroSection">
       {isPhone?<div className="sideList">
      {props.items.map((menu, index) => (
        <div className="sideMenu" key={index}>
          {menu.map((item, itemIndex) => (
            <div key={itemIndex} style={item.activ=="true"?{color:"var(--web-tertiary, #C76B98)"}:null} onClick={() => handleClick(item)}>
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>:null}

      <div className="imageCards">
        <div className="homeText">
          <div>{props.name}</div>
          <div>Show more</div>
        </div>
        <div className="homeFirstRow">
          {songs.slice(0, 5).map((song, songIndex) => (
            <ImgCard
              key={songIndex}
              index={songIndex}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song,songIndex)} 
              section="Query"
            />
          ))}
        </div>
        <div className="homeLastRow">
          {songs.slice(5,10).map((song, songIndex) => (
            <ImgCard
              key={songIndex}
              index={songIndex}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song,songIndex)} 
              section="Query"
            />
          ))}
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>

      {/* {songData ? (
  setPlayBackData({
    url: songData.song_url,
    id: songData.id,
    thumbnail: selectedSong.thumbnail_url,
    name: selectedSong.name
  })
) : (
  setPlayBackData({
    thumbnail: null,
    url: null,
    id: null,
    name: null
  })
)} */}

    </div>
  );
}