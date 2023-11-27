import "./landing.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Sidebar from "./Sidebar";
import Playback from "./playBack";
import { useContext,useEffect } from 'react';
import { playBackContext } from '../../App';
import LikedPlaylist from "./likedPLaylistSection";
import axios from "../../Api/auth";
import { useLocation } from "react-router-dom";


export default function likedPlay() {
    const{state}=useLocation()
  const token = JSON.parse(localStorage.getItem('authTok'));
  const { setPlayBackData, setNavData, setHome, favArt,setFavArt } = useContext(playBackContext);
    
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
       }
      }
      catch(error){
 console.log(error)
      }
  }
  menuHandler()
 },[])
    const menuItems1 = [
        {
          title: "MENU",
          onclick: "",
          activ:"false"
        },
        {
          title: "For You",
          onclick: "/forYou",
          activ:"false"
        },
        {
            title: "Recently Played",
            onclick: "/recent",
            activ:"false"
          },
       
      ];
    
      const menuItems2 = [
        {
          title: "GENRE",
          onclick: "",
          activ:"false"
        },
        {
          title: "Pop",
          onclick: "/pop",
          activ:"false"
        },
        {
            title: "Rock",
            onclick: "/rock",
            activ:"false"
          },
        
          {
            title: "Hip-Hop",
            onclick: "/Hip-Hop",
            activ:"false"
          },
        
          {
            title: "Rap",
            onclick: "/Rap",
            activ:"false"
          },
        
          {
            title: "R&B",
            onclick: "/R&B",
            activ:"false"
            
          }];
          const menuItems3 = [
            {
              title: "ARTISTS YOU FOLLOW",
              onclick: "/#",
              activ: "false"
            },
            ...favArt.map((name) => ({
              title: name.name,
              onclick: "/favouriteArtistSongs",
              activ: "false"
            }))
          ];

  return (
    <div className="landingPage">
     <Sidebar items={[menuItems1, menuItems2,menuItems3]} />
    <div className="mainContent">
      
      <div className="navBarPlaceholder"></div>
      <LikedPlaylist state={state} />
      
      {/* <Playback/> */}
      <div className="playBackPlaceholder"></div>
    </div>
      
    </div>
  );
}
