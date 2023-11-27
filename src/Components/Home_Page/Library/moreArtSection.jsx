import React, { useEffect, useState } from 'react';
import axios from '../../../Api/auth';
import Card from '../Card';
import Footer from '../Footer';
import ImgCard from '../ImgCard';
import Playback from '../playBack'; 

import { useContext } from 'react';
import { playBackContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

export default function MoreArtistSection({ items }) {
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

  
 
  const handleImgCardClick = (song) => {
   navigate("/uploaderArtist",{
    state:song
   })
  };
   

 

 

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        ;
         const response = await axios.get('allartists/', {
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
//   useEffect(() => {
//     const fetchSongData = async () => {
//       if (selectedSong) {
//         try {
//           const url = `https://test-mkcw.onrender.com/api/getsong/${selectedSong.id}/`;
//           const response = await axios.get(url,{
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
  
//           if (response.data.success) {
//             setSongData(response.data.data);
//             console.log(songData)
//           } else {
//             console.error('Failed to fetch song data.');
//           }
//         } catch (error) {
//           console.error('An error occurred:', error);
//         }
//       }
//     };
  
//     fetchSongData();
//   }, [selectedSong,isMedia]);
  
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
      {items.map((menu, index) => (
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
          <div>Listen to more artists</div>
          <div className='btn' onClick={()=>setShowMore(!showMore)}>{showMore?"Show less":"Show more"}</div>
        </div>
        <div className="homeFirstRow">
          {songs.slice(0, 5).map((song, songIndex) => (
            <ImgCard
              key={songIndex}
              
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song)} 
              refer="false"
              
            />
          ))}
        </div>
        <div className="homeLastRow">
  {songs.slice(5, 10).map((song, songIndex) => (
    <ImgCard
      key={songIndex}
              
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song)} 
              refer="false"
    />
  ))}
</div>

        {showMore?<div className="homeLastRow">
          {songs.slice(10,15).map((song, songIndex) => (
            <ImgCard
              key={songIndex}
              
              id={song.id}
              img={song.thumbnail_url}
              name={song.name}
              onClick={() => handleImgCardClick(song)} 
              refer="false"
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