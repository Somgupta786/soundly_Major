import React, { useEffect, useState } from 'react';
import axios from '../../../Api/auth';
import Card from '../Card';
import Footer from '../Footer';
import ImgCard from '../ImgCard';
import Playback from '../playBack'; 

import { useContext } from 'react';
import { playBackContext } from '../../../App';

export default function LibraryHeroSection() {
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{setPlayBackData,isLiked,setNavData,setfutureSongData,setHome,setMedia,isMedia,setMediaData,currentSongIndex,setCurrentSongIndex}=useContext(playBackContext);


  setHome(true)

  const [songs, setSongs] = useState([]);
  

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleImgCardClick = (song,songIndex) => {
    console.log(songIndex)
    setCurrentSongIndex(songIndex)
      
      setfutureSongData(songs)
      
    setSelectedSong(song); 
   
   
     
  
  };
  useEffect(() => {
   
    if(songData&&currentSongIndex!=null){
      console.log(songData.is_liked)
    setPlayBackData({
      index:currentSongIndex,
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
      try {
        ;
         const response = await axios.get('favourite/songs/', {
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
    };

    fetchSongs();
  }, [isLiked]);
  useEffect(() => {
    const fetchSongData = async () => {
      if (selectedSong) {
        try {
          const url = `https://test-mkcw.onrender.com/api/getsong/${selectedSong.id}/`;
          const response = await axios.get(url,{
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
          <div>Liked Songs</div>
          <div onClick={()=>setShowMore(!showMore)}>{showMore?"Show less":"Show more"}</div>
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
              section="Liked Songs"
            />
          ))}
        </div>
        <div className="homeLastRow">
  {songs.slice(5, 10).map((song, songIndex) => (
    <ImgCard
      key={songIndex + 5}
      index={songIndex + 5}
      id={song.id}
      img={song.thumbnail_url}
      name={song.name}
      onClick={() => handleImgCardClick(song, songIndex + 5)}
      section="Liked Songs"
    />
  ))}
</div>

        {showMore?<div className="homeLastRow">
          {songs.slice(10,15).map((song, songIndex) => (
            <ImgCard
              key={songIndex + 10}
              index={songIndex + 10}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song,songIndex + 10)} 
              section="Liked Songs" 
            />
          ))}
        </div> 
        
        
       :null}
       {showMore?<div className="homeLastRow">
          {songs.slice(15,20).map((song, songIndex) => (
            <ImgCard
             key={songIndex + 15}
            index={songIndex + 15}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song,songIndex + 15)} 
              section="Liked Songs"
            />
          ))}
        </div> 
        
        
       :null}
       {showMore?<div className="homeLastRow">
          {songs.slice(20,25).map((song, songIndex) => (
            <ImgCard
              key={songIndex + 20}
              index={songIndex + 20}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song,songIndex + 20)} 
              section="Liked Songs"
            />
          ))}
        </div> 
        
        
       :null}
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