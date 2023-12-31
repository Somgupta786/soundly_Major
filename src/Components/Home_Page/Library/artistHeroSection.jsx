
import Footer from "../Footer";

import ImgCard from "../ImgCard";

import { playBackContext } from "../../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "../../../Api/auth";
export default function ArtistHeroSection({items}) {
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{setLibraryIcon, setHomeIcon,setPlayBackData,isLiked,setfutureSongData,setCurrentSongSection,setHome,setMedia,isMedia,setMediaData,currentSongIndex,currentSongSection,setCurrentSongIndex,favArt,setFavArt}=useContext(playBackContext);
  setHome(true)
  setHomeIcon(false)
  setLibraryIcon(true)
  const [songs, setSongs] = useState([]);
  

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
   
    
  }
  },[songData])
  const Navigation=useNavigate()
  useEffect(()=>{
    const menuHandler = async()=>{
        try{
         const response = await axios.get("favourite/artist/",{
   
           headers: {
             Authorization: `Bearer ${token}`
           }
         })
         if(response.data.success){
           setFavArt(response.data.data)
           console.log(response.data.data)
         }
        }
        catch(error){
   console.log(error)
        }
    }
    menuHandler()
   },[])
   useEffect(() => {
    const fetchSongs = async () => {
      try {
        ;
         const response = await axios.get('mixedfavartistsongs/', {
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
  }, [isLiked]);
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
        <div>{!isPhone?"From Artist you follow":"From Your Artist"} </div> 
        <div> Show more</div>
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
              section="Liked Songs"
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
      section="Liked Songs"
    />
  ))}
</div>
      </div>
      <div className="imageCards">
      <div className="homeText">
        <div>{!isPhone?"Listen to your Favorite artist":"Favourite Artist"}</div> 
        <div className="btn"> Show more</div>
      </div>
      <div className="homeFirstRow">
      {favArt.map((name)=> <ImgCard  onClick={() => Navigation("/favouriteArtistSongs",{state:name.name})}   img ={name.thumbnail_url} name ={name.name} refer="false"/>)}
      
   
      </div>
      
      </div>
     
     <div className="footer"><Footer/> </div>
     

    
     
      
    </div>
  );
}
