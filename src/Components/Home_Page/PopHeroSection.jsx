import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Footer from './Footer';
import ImgCard from './ImgCard';
import Playback from './playBack'; 

import { useContext } from 'react';
import { playBackContext } from '../../App';

export default function PopHeroSection(props) {
  const token = JSON.parse(localStorage.getItem('authTok'));

  const{setPlayBackData,setNavData,setHome,isMedia}=useContext(playBackContext);

setHome(true)
  

  const [songs, setSongs] = useState([]);
  

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);

  const handleImgCardClick = (song) => {
  
    setSelectedSong(song); 
   
   
     
  
  };
  useEffect(() => {
    
    if(songData){
     
    setPlayBackData({
      
      url: songData.song_url,
      id: songData.id,
      thumbnail: songData.thumbnail_url,
      name: songData.name,
      artist:selectedSong.artist,
      isLiked:songData.is_liked
    })
   
    // setMediaData({
    //   url: songData.song_url,
    //   id: songData.id,
    //   thumbnail: songData.thumbnail_url,
    //   name: songData.name
    // })
    
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
          console.error('An error occurred:', error);
        }
      }
      else
      {
        try {
        const url = `https://test-mkcw.onrender.com/api/songsearch/?query=${props.name}`;
         const response = await axios.get(url);

        if (response.data.success) {
          const fetchedSongs = response.data.data;
          setSongs(fetchedSongs);
        } else {
          console.error('Failed to fetch songs.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
      
    };

    fetchSongs();
  }, []);
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
          <div>{props.name}</div>
          <div>Show more</div>
        </div>
        <div className="homeFirstRow">
          {songs.slice(0, 5).map((song, songIndex) => (
            <ImgCard
              key={songIndex}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song)} 
            />
          ))}
        </div>
        <div className="homeLastRow">
          {songs.slice(5,10).map((song, songIndex) => (
            <ImgCard
              key={songIndex}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song)} 
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