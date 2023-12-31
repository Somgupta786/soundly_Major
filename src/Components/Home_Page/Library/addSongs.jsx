import React, { useEffect, useState } from 'react';
import axios from '../../../Api/auth';
import Footer from '../Footer';
import Pause from "../../../assets/Continue.svg";
import Continue from "../../../assets/pause.svg";
import Add from "../../../assets/Add_Plus.svg";
import Add1 from "../../../assets/addd2.svg"
import Add2 from "../../../assets/addd1.svg"
import { useContext } from 'react';
import { playBackContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

export default function AddSongs(props) {
    const Navigation=useNavigate()
  const token = JSON.parse(localStorage.getItem('authTok'));
  const {setHomeIcon, setLibraryIcon, setPlayBackData,setCurrentSongSection,setfutureSongData, playBackData, isPlaying, setNavData, setHome, setMedia,currentSongIndex,currentSongSection,setCurrentSongIndex } = useContext(playBackContext);
  setHome("true");
  setHomeIcon(false)
  setLibraryIcon(true)
  const [songs, setSongs] = useState([]);
  const [addedSong, setAddedSong] = useState([]);

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);

const handleImgCardClick = (song,songIndex) => {
    console.log(songIndex)
    
      setCurrentSongIndex(songIndex)
      setCurrentSongSection("For You")
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
      lyrics_url:songData.lyrics_json
      
    })
   
   
    
  }
  },[songData])

  const AddSongHandler = async (song) => {

    if(!addedSong.includes(song.id)){
     try {
      const response = await axios.post(`playlists/${props.state.id}/songs/${song.id}/`, null,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setAddedSong((prevArray) => [...prevArray, song.id]);
      } else {
        console.error('Failed to add songs to the playlist.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  else{
    try {
        const response = await axios.delete(`playlists/${props.state.id}/songs/${song.id}/`,  {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.data.success) {
            setAddedSong((prevArray) => prevArray.filter(id => id !== song.id));
        } else {
          console.error(response);
          setAddedSong((prevArray) => prevArray.filter(id => id !== song.id));
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }
  

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const url = 'https://test-mkcw.onrender.com/api/allpublicsongs/';
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
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            setSongData(response.data.data);
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
  const navigate = useNavigate();
  const[isPhone,setIsPhone]=useState(false)
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
  
 
  
  return (
    <div className="addSongsSection">
      <div className='addSongsUpper' >
        <div className='addText'>
          <div>Add songs {!isPhone?" to your ‘Default name’":null}</div>
          <div className='btn' onClick={()=>Navigation("/playlist")}>DONE</div>
        </div>
        {songs.map((song,songIndex) => (
          <div className='showSongs' key={song.id}>
            <div>
              <img src={song.thumbnail_url} alt="Thumbnail" />
              <div className='songDetails'>
                <div>{song.name}</div>
                <div>{song.artist}</div>
              </div>
            </div>
            <div>{song.song_duration}</div>
            <div className='btn' onClick={() => handleImgCardClick(song,songIndex)} >
              <img src={isPlaying && playBackData.id === song.id ? Continue : Pause} />
            </div>
            {!isPhone?<div className='btn'
              style={addedSong.includes(song.id) ? { background: "#2C9A3E" } : null}
              onClick={() => AddSongHandler(song)}
            >
              <img className='btn' src={Add} alt="Add" />{addedSong.includes(song.id)?"Added":"Add"}
            </div>:<img  onClick={() => AddSongHandler(song)} src={addedSong.includes(song.id)?Add2:Add1}/>
            }
          </div>
        ))}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
