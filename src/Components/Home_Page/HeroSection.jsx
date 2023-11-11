import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Footer from './Footer';
import ImgCard from './ImgCard';
import Playback from './playBack'; 

import imge2 from '../../assets/image 2.svg';
import Soltitude from '../../assets/green-colors-green-art 1.png';
import Property from '../../assets/image 28.png';

import imge1 from '../../assets/Rectangle 8 (1).png';
import imge3 from '../../assets/Rectangle 8 (2).png';
import imge4 from '../../assets/Rectangle 8 (3).png';
import imge5 from '../../assets/Rectangle 8 (4).png';
import imge6 from '../../assets/Rectangle 8 (2).png';
import { useContext } from 'react';
import { playBackContext } from '../../App';

export default function HeroSection() {
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{setPlayBackData,setNavData,setHome}=useContext(playBackContext);
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
    { color: '#C76B98', title: 'The Havanna', img: imge2, style: styleBox },
    {
      color: '#4E6CB9',
      title: 'The Soltitude',
      img: Property,
      style: styleBox2,
    },
    {
      color: '#518C3D',
      title: 'The Wanderlust',
      img: Soltitude,
      style: styleBox3,
    },
  ]);

  const [songs, setSongs] = useState([]);
  const [showCard, setShowCard] = useState(cardInfo[0]);
  const [cardIndex, setCardIndex] = useState(0);

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);

  const handleImgCardClick = (song) => {
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
        const url = 'https://test-mkcw.onrender.com/api/allpublicsongs/';
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
  }, [selectedSong]);
  
  

  return (
    <div className="heroSection">
      <div className="slider" style={showCard.style}>
        <Card color={showCard.color} title={showCard.title} img={showCard.img} />
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

      <div className="imageCards">
        <div className="homeText">
          <div>FOR YOU</div>
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