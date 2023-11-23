
import Footer from "../Footer";

import ImgCard from "../ImgCard";

import { playBackContext } from "../../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "../../../Api/auth";
export default function ArtistHeroSection() {
  const token = JSON.parse(localStorage.getItem('authTok'));
  const{setPlayBackData,isLiked,setfutureSongData,setCurrentSongSection,setHome,setMedia,isMedia,setMediaData,currentSongIndex,currentSongSection,setCurrentSongIndex,favArt,setFavArt}=useContext(playBackContext);
  setHome(true)
  
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
      isLiked:songData.is_liked
      
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
  return (
    <div className="heroSection">
     
      
      <div className="imageCards">
      <div className="homeText">
        <div>From artist you follow </div> 
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
        <div>Listen to your favorite artist </div> 
        <div> Show more</div>
      </div>
      <div className="homeFirstRow">
      {favArt.map((name)=> <ImgCard  onClick={() => Navigation("/favouriteArtistSongs",{state:name.name})}   img ={name.thumbnail_url} name ={name.name}/>)}
      
   
      </div>
      
      </div>
     
     <div className="footer"><Footer/> </div>
     

    
     
      
    </div>
  );
}
