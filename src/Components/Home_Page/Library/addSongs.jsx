import React, { useEffect, useState } from 'react';
import axios from '../../../Api/auth';
import Card from '../Card';
import Footer from '../Footer';
import ImgCard from '../ImgCard';
import Playback from '../playBack'; 
import Continue from "../../../assets/Continue.svg";
import Rectangle from "../../../assets/Rectangle 8 (3).png";
import Tick from "../../../assets/Tick.svg";
import Add from "../../../assets/Add_Plus.svg";

import { useContext } from 'react';
import { playBackContext } from '../../../App';

export default function AddSongs(props) {
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{setPlayBackData,setNavData,setHome}=useContext(playBackContext);
setHome("true")

  

  const [songs, setSongs] = useState([]);
  

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);

  const handleImgCardClick = (song) => {
    console.log("ram")
    setSelectedSong(song); 
  
    if(songData){
    setPlayBackData({
      url: songData.song_url,
      id: song.id,
      thumbnail: song.thumbnail_url,
      name: song.name
    });
  }
  };
const AddSongHandler =async (song) => {
    
    // console.log("hurray")
      try {
        
        const response = await axios.post(`playlists/${props.state.createdPlaylistDta.id}/songs/${song.id}/`);

        if (response.data.success) {
          
         
          console.log("hurray")
        } else {
          console.error('Failed to fetch songs.');
        }
      } catch (error) {
        
      }
    };
 

 

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const url = 'https://test-mkcw.onrender.com/api/allpublicsongs/';
        const response = await axios.get(url);

        if (response.data.success) {
          const fetchedSongs = response.data.data;
          setSongs(fetchedSongs);
          console.log(songs)
        } else {
          console.error('Failed to fetch songs.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchSongs();
  }, []);
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
  }, [selectedSong]);
  


return (
    <div className="addSongsSection">
      <div className='addSongsUpper' >
        <div className='addText'>
          <div>Add songs to your ‘Default name’</div>
          <div>DONE</div>
        </div>
        {songs.map((song) => (
          <div className='showSongs' key={song.id}>
            <div>
              <img src={song.thumbnail_url} alt="Thumbnail" />
              <div className='songDetails'>
                <div>{song.name}</div>
                <div>{song.artist}</div>
              </div>
            </div>
            <div>2:54</div>
            <div onClick={() => handleImgCardClick(song)} ><img src={Continue} alt="Continue" /></div>
            <div onClick={() =>AddSongHandler(song)}><img src={Add} alt="Add" /> Add</div>
          </div>
        ))}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
  
}