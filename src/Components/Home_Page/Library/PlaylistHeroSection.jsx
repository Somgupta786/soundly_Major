import React, { useEffect, useState } from 'react';
import axios from '../../../Api/auth';
import Card from '../Card';
import Footer from '../Footer';
import ImgCard from '../ImgCard';
import Playback from '../playBack'; 
import Group from "../../../assets/Group 9.svg";

import { useContext } from 'react';
import { playBackContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

export default function PlaylistHeroSection({ items }) {
  const Navigation=useNavigate();
 
  const token = JSON.parse(localStorage.getItem('authTok'));
  const {setHomeIcon, setLibraryIcon, setPlayBackData, setNavData, setHome } = useContext(playBackContext);

  const [playlists, setPlaylist] = useState([]);
  const [createPlaylist, setCreatePlaylist] = useState(false);

  const [selectedplaylist, setSelectedplaylist] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [createdPlaylistData, setCreatedPlaylistData] = useState(null);

  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  setHomeIcon(false)
  setHome(true)
  setLibraryIcon(true)
  const handleCreatePlaylist = () => {
    setNameInput("")
    setDescriptionInput("")
    setCreatePlaylist(!createPlaylist);
  };
  const handleCreatedPlaylist = async () => {
    try {
      const response = await axios.post("playlists/", {
        name: nameInput,
        description: descriptionInput
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.data.success) {
        setCreatedPlaylistData(response.data.data)
        console.log(response.data.data)
        Navigation("/addSongs", {
          state:
            response.data.data
          
        })
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleImgCardClick = (playlist) => {
    setSelectedplaylist(playlist);
  };

  const handleNameInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= 20) {
      setNameInput(value);
    }
  };

  const handleDescriptionInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= 50) {
      setDescriptionInput(value);
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('playlists/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const fetchedPlaylists = response.data.data;
          setPlaylist(fetchedPlaylists);
        } else {
          console.error('Failed to fetch playlists.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (selectedplaylist) {
        try {
          const response = await axios.get(`playlists/${selectedplaylist.id}/songs/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.data.success) {
            console.log(response)
            setPlaylistData(response.data.data);
            Navigation("/showPlaylist", {
              state: {
                playlistData:response.data.data
              }
            })
          } else {
            console.error('Failed to fetch playlist data.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    };

    fetchPlaylistData();
  }, [selectedplaylist]);
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
          <div>Liked playlists</div>
          <div>Show more</div>
        </div>
        {playlists.length>0?<><div className="homeFirstRow">
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
          {playlists.slice(5,10).map((playlist, playlistIndex) => (
            <ImgCard
              key={playlistIndex}
              id={playlist.id}
              img={playlist.thumbnail_url}
              name={playlist.name}
              description={playlist.description}
              onClick={() => handleImgCardClick(playlist)} 
             
            />
          ))}
        </div></>:null}
        
        <div className="homeLastRow">
          <ImgCard onClick={handleCreatePlaylist}  img={Group} name="Create Playlist" refer="false" />
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
      {createPlaylist ? (
        <div className='createPlaylist'>
          <div>Give name to your playlist</div>
          <div>
            <input 
              placeholder='Enter Name'
              value={nameInput}
              onChange={handleNameInputChange}
            />
            <div>{nameInput.length}/20</div>
          </div>
          <div>
            <textarea
              placeholder='Enter Description'
              value={descriptionInput}
              onChange={handleDescriptionInputChange}
            />
            <div>{descriptionInput.length}/50</div>
          </div>
          <div className='playlistButton '>
            <div className='btn'  onClick={handleCreatedPlaylist} >Next</div>
            <div className='btn' onClick={handleCreatePlaylist}>Cancel</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
