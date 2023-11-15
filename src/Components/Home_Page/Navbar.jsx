import React, { useState,useContext,useEffect } from "react";
import Library from "../../assets/Library.svg";
import Game from "../../assets/Game.svg";
import Home from "../../assets/Home.svg";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/auth";
import Pause from "../../assets/Continue.svg";
import Not from "../../assets/notFound.svg"
import { playBackContext } from '../../App';


export default function Navbar(props) {
  const token = JSON.parse(localStorage.getItem("authTok"));
  const{setPlayBackData,setNavData,setHome,setMedia,setMediaData}=useContext(playBackContext);
  const [searchValue, setSearchValue] = useState("");
  
  

  const [selectedSong, setSelectedSong] = useState(null);
  const [songData, setSongData] = useState(null);
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const handleLibraryClick = () => {
    navigate("/library");
  };
  const searchHandler = async (e) => {
    setSearchValue(e.target.value);
    try {
      const response = await axios.get(
        `songsearch/?query=${e.target.value}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
        setSongs(response.data.data);
      } else {
        setSongs([]);
        console.log("nhi");
      }
    } catch (error) {
      setSongs([]);
      console.log("n");
    }
  };
  const handleImgCardClick = (song) => {
    setSelectedSong(song); 
   setMedia(true)
   
     
  
  };
  useEffect(() => {
    if(songData){
      console.log(songData.is_liked)
    setPlayBackData({
      
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
  }, [selectedSong]);

  return (
    <div className="homeNav">
      <div className="menu">
        <div>
          <img src={Home} />
          <div>{props.navData.home}</div>
        </div>
        <div>
          <img src={Library} />
          <div onClick={handleLibraryClick}>{props.navData.library}</div>
        </div>
        <div>
          <img src={Game} />
          <div>{props.navData.game}</div>
        </div>
      </div>
      <div className="searchBox">
        <input
          placeholder="     Search"
          value={searchValue}
          onChange={searchHandler}
        />
        {searchValue && (
          <div className="searchContent">
            {songs.length!==0 ? (
              songs.map((item, index) => (
                <div key={index} className="searchMain">
                  <div className="searchData">
                    <div>
                      <img src={item.thumbnail_url} alt={item.name} />
                    </div>
                    <div>
                      <div>
                        {item.name.length > 12
                          ? `${item.name.substring(0, 12)}...`
                          : item.name}
                      </div>
                      <div>
                        {item.artist.length > 12
                          ? `${item.artist.substring(0, 12)}...`
                          : item.artist}
                      </div>
                    </div>
                  </div>
                  <div className="SearchTime">2:03</div>
                  <div className="SearchControl">
                    <img onClick={() => handleImgCardClick(item)} src={Pause} alt="Pause" />
                  </div>
                </div>
              ))
            ) : (
              <div className="searchNotFound">
                <div>
                  <img src={Not}></img>
                </div>
                <div>
                  <div>Couldn’t find ’{searchValue}’</div>
                  <div>Try searching again using a different spelling or keyword.</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="profile">
        <div></div>
      </div>
    </div>
  );
}
