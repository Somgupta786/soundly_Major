import React, { useEffect, useState } from 'react';
import axios from '../../../Api/auth';
import Card from '../Card';
import Footer from '../Footer';
import ImgCard from '../ImgCard';
import Playback from '../playBack'; 
import Group from "../../../assets/Group 9.svg";

import { useContext } from 'react';
import { playBackContext } from '../../../App';

export default function PlaylistHeroSection() {
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{setPlayBackData,setNavData,setHome}=useContext(playBackContext);


  

  const [playlists, setPlaylist] = useState([]);
  const [createPlaylist, setCreatePlaylist] = useState("false");
  

  const [selectedplaylist, setSelectedplaylist] = useState(null);
  const [playlistData, setplaylistData] = useState(null);
  const handleCreatePlaylist= () =>{
    setCreatePlaylist("true");
  }
  const handleImgCardClick = (playlist) => {
    setSelectedplaylist(playlist); 
    if(playlistData){
    ({
      url: playlistData.playlist_url,
      id: playlist.id,
      thumbnail: playlist.thumbnail_url,
      name: playlist.name,
      description: playlist.description
    });
  }
  };

 

 

  useEffect(() => {
    const fetchplaylists = async () => {
      try {
        ;
         const response = await axios.get('playlists/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const fetchedplaylists = response.data.data;
          setPlaylist(fetchedplaylists);
        } else {
          console.error('Failed to fetch playlists.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchplaylists();
  }, []);
  useEffect(() => {
    const fetchplaylistData = async () => {
      if (selectedplaylist) {
        try {
          
          const response = await axios.get(`playlists/${selectedplaylist.id}/songs`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          );
  
          if (response.data.success) {
            setplaylistData(response.data.data);
            console.log(playlistData)
          } else {
            console.error('Failed to fetch playlist data.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    };
  
    fetchplaylistData();
  }, [selectedplaylist]);
  
  

  return (
    <div className="heroSection">
      

      <div className="imageCards">
        <div className="homeText">
          <div>Liked playlists</div>
          <div>Show more</div>
        </div>
        <div className="homeFirstRow">
          {playlists.slice(0, 5).map((playlist, playlistIndex) => (
            <ImgCard
              key={playlistIndex}
              id={playlist.id}
              img={playlist.thumbnail_url}
              name={playlist.name}
              description={playlist.description}
              onClick={() => handleImgCardClick(playlist)} 
            />
          ))}
        </div>
        <div className="homeLastRow">
        <ImgCard onClick={handleCreatePlaylist}  img ={Group} name ="Create Playlist"/>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
      {createPlaylist=="true"?<div className='createPlaylist'>
        <div>Give name to your playlist</div>
        <div><input placeholder='Enter Name'></input></div>
        <div><textarea placeholder='Enter Description'></textarea></div>
        <div className='playlistButton'>
          <div >Next</div>
          <div>Cancel</div>
        </div>
      </div>:null}
      

   

    </div>
  );
}