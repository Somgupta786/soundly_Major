import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Footer from './Footer';
import ImgCard from './ImgCard';
import Playback from './playBack'; 

import { useContext } from 'react';
import { playBackContext } from '../../App';

export default function likedPlaylist(props) {
    console.log(props.state)
  const token = JSON.parse(localStorage.getItem('authTok'));

  const{setHomeIcon, setLibraryIcon,setPlayBackData,setfutureSongData,setCurrentSongSection,setHome,setMedia,isMedia,setMediaData,currentSongIndex,currentSongSection,setCurrentSongIndex}=useContext(playBackContext);
  setHomeIcon(false)
  setLibraryIcon(true)
setHome(true)
  

  const [songs, setSongs] = useState([]);
  

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
      lyrics_url:songData.lyrics_url
      
    })
   
   
    
  }
  },[songData])

 

 

  useEffect(() => {
    const fetchSongs = async () => {
     
        try {
          const url = `https://test-mkcw.onrender.com/api/allpublicplaylists/${props.state.index}`;
           const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          if (response.data.success) {
            const fetchedSongs = response.data.data.songs;
            setSongs(fetchedSongs);
          } else {
            console.error('Failed to fetch songs.');
          }
        } catch (error) {
          setSongs([])
          console.error('An error occurred:', error);
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
  
  

  return (
    <div className="heroSection">
      

      <div className="imageCards">
        <div className="homeText">
          <div>Listen to ‘{props.state.title}’</div>
          <div></div>
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