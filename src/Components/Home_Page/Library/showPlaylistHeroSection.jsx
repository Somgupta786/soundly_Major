import React, { useEffect, useState } from "react";
import axios from "../../../Api/auth";
import Card from "../Card";
import Footer from "../Footer";
import ImgCard from "../ImgCard";
import Playback from "../playBack";
import Lion from "../../../assets/Lion.svg"
import Dot from "../../../assets/dot.svg"

import { useContext } from "react";
import { playBackContext } from "../../../App";

export default function ShowPlaylistHeroSection(props) {


  const token = JSON.parse(localStorage.getItem("authTok"));
  const{setPlayBackData,setfutureSongData,setCurrentSongSection,setHome,setMedia,isMedia,setMediaData,currentSongIndex,currentSongSection,setCurrentSongIndex}=useContext(playBackContext);

  setHome(true);

  const [songs, setSongs] = useState(props.state.playlistData.songs);

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);

  
  const handleImgCardClick = (song,songIndex) => {
    console.log(songIndex)
    
      setCurrentSongIndex(songIndex)
      setCurrentSongSection("PlayList")
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
   
   
    
  }
  },[songData])

 
  useEffect(() => {
    const fetchSongData = async () => {
      if (selectedSong) {
        try {
          const url = `https://test-mkcw.onrender.com/api/getsong/${selectedSong.id}/`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            setSongData(response.data.data);
            console.log(songData);
          } else {
            console.error("Failed to fetch song data.");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    fetchSongData();
  }, [selectedSong, isMedia]);

  return (
    <div className="heroSection">
      <div className="imageCards">
        <div className="playlistInfo">
          <div>
            <img src={Lion}></img>
          </div>
          <div>
            <div>Listen to ‘{props.state.playlistData.playlist.name}’</div>
            <div>
            {props.state.playlistData.playlist.description}.
            </div>
             <div>
            <div className="songDetail">
              <div>
                <img src={Dot}  />
              </div>
              <div>{props.state.playlistData.songs.length} songs</div>
            </div>
            <div className="songDetail">
              <div >
                <img src={Dot} />
              </div>
              <div>10 min</div>
            </div>
            </div>
          </div>
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
              section={props.state.playlistData.playlist.name}
            />
          ))}
        </div>
        <div className="homeLastRow">
          {songs.slice(5, 10).map((song, songIndex) => (
            <ImgCard
              key={songIndex}
              index={songIndex}
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song,songIndex)} 
              section={props.state.playlistData.playlist.name}
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
