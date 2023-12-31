import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Footer from './Footer';
import ImgCard from './ImgCard';
import Playback from './playBack'; 

import imge2 from '../../assets/slidenew.svg';
import Soltitude from '../../assets/green-colors-green-art 1.png';
import Property from '../../assets/image 28.png';

import imge1 from '../../assets/Rectangle 8 (1).png';
import imge3 from '../../assets/Rectangle 8 (2).png';
import imge4 from '../../assets/Rectangle 8 (3).png';
import imge5 from '../../assets/Rectangle 8 (4).png';
import imge6 from '../../assets/Rectangle 8 (2).png';
import { useContext } from 'react';
import { playBackContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function HeroSection({ items }) {
  
  const token = JSON.parse(localStorage.getItem('authTok'));

  const{setHomeIcon,setLibraryIcon,setPlayBackData,setfutureSongData,setCurrentSongSection,setHome,setMedia,isMedia,setMediaData,currentSongIndex,currentSongSection,setCurrentSongIndex}=useContext(playBackContext);
  setHomeIcon(true)
  setLibraryIcon(false)
  const styleBox = {
    background:
      'linear-gradient(180deg, rgba(255, 243, 249, 0.97) 0%, #F39AC6 137.12%)',
  };
  const styleBox2 = {
    background:
      'linear-gradient(180deg, rgba(243, 244, 255, 0.97) 0%, #9A9EF3 137.12%)',
  };
  const styleBox3 = {
    background:
      'linear-gradient(180deg, rgba(243, 255, 244, 0.97) 0%, #9AF3A3 137.12%)',
  };

  const [cardInfo, setCardInfo] = useState([
    { color: '#C76B98', title: 'The Havanna', img: imge2, style: styleBox,index:"51"},
    {
      color: '#4E6CB9',
      title: 'The Soltitude',
      img: Property,
      style: styleBox2,
      index:"52"
    },
    {
      color: '#518C3D',
      title: 'The Wanderlust',
      img: Soltitude,
      style: styleBox3,
      index:"53"
    },
  ]);
  const navigate = useNavigate();
  const[isPhone,setIsPhone]=useState(false)
  const [songs, setSongs] = useState([]);
  const [showCard, setShowCard] = useState(cardInfo[0]);
  const [cardIndex, setCardIndex] = useState(0);

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);
  const [showMore, setShowMore] = useState(false);
 

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

  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCardIndex((prevIndex) => (prevIndex + 1) % cardInfo.length);
    }, 1800);

    return () => clearInterval(cardInterval);
  }, [cardInfo]);

  useEffect(() => {
    setShowCard(cardInfo[cardIndex]);
  }, [cardIndex, cardInfo]);

  useEffect(() => {
    
    const fetchSongs = async () => {
      try {
        const url = 'https://test-mkcw.onrender.com/api/foryou/';
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
            // console.log(response.data)
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
      <div className="slider" style={showCard.style}>
        <Card color={showCard.color} title={showCard.title} img={showCard.img} index={showCard.index} />
        <div className="dots">
          {cardInfo.map((card, index) => (
            <div
              key={index}
              style={
                cardIndex === index
                  ? { background: showCard.color }
                  : { background: 'grey' }
              }
            ></div>
          ))}
        </div>
      </div>
      {isPhone?<div className="sideList">
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
          <div>For You</div>
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
              artist={song.artist}
              onClick={() => handleImgCardClick(song,songIndex)} 
              section="For You"
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
      artist={song.artist}
      onClick={() => handleImgCardClick(song, songIndex + 5)}
      section="For You"
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
              artist={song.artist}
              onClick={() => handleImgCardClick(song,songIndex + 10)} 
              section="For You" 
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
              artist={song.artist}
              onClick={() => handleImgCardClick(song,songIndex + 15)} 
              section="For You"
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
              artist={song.artist}
              onClick={() => handleImgCardClick(song,songIndex + 20)} 
              section="For You"
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