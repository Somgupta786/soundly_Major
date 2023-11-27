import React, { useEffect, useState } from 'react';
import axios from '../../../Api/auth';
import Card from '../Card';
import Footer from '../Footer';
import ImgCard from '../ImgCard';
import Playback from '../playBack'; 

import { useContext } from 'react';
import { playBackContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

export default function UploaderArtistSection(props) {
    console.log(props)
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{ setHomeIcon,setLibraryIcon,setPlayBackData,isLiked,setNavData,setfutureSongData,setHome,setMedia,isMedia,setMediaData,currentSongIndex,setCurrentSongIndex,favArt,setFavArt}=useContext(playBackContext);
  setHomeIcon(false)
  setLibraryIcon(true)
  const navigate = useNavigate();
  setHome(true)

  const [songs, setSongs] = useState([]);
  
  const[isPhone,setIsPhone]=useState(false)
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
      isLiked:songData.is_liked,
      lyrics_url:songData.lyrics_json
      
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
         const response = await axios.get(`artist/${props.song.id}/`, {
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
      {isPhone?<div style={{height:"50px"}} className="sideList">
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
          <div>{props.song.name}</div>
          <div className='btn' onClick={()=>setShowMore(!showMore)}>{showMore?"Show less":"Show more"}</div>
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
              section="Artist section"
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
      section="Artist section"
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
              section="Artist section"
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
              section="Artist section"
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