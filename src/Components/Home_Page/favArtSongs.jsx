import "./landing.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Sidebar from "./Sidebar";
import Playback from "./playBack";
import { useContext } from 'react';
import { playBackContext } from '../../App';
import PopHeroSection from "./PopHeroSection";
import { useLocation } from "react-router-dom";

export default function FavArtSongs() {
    const{state}=useLocation()
   
  const{setPlayBackData,setNavData,setHome}=useContext(playBackContext);
  
    const menuItems1 = [
        {
          title: "MENU",
          onclick: "/menu",
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
          onclick: "/genre",
          activ:"false"
        },
        {
          title: "Pop",
          onclick: "/pop",
          activ:"true"
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
              title: "From Artist You Follow",
              onclick: "/#",
              activ:"false"
            },
            {
              title: "Neha Kakkar",
              onclick: "/neha",
              activ:"false"
            },
            {
                title: "Badshah",
                onclick: "/badshah",
                activ:"false"
              },
           
          ];

  return (
    <div className="landingPage">
     <Sidebar items={[menuItems1, menuItems2,menuItems3]} />
    <div className="mainContent">
      
      <div className="navBarPlaceholder"></div>
      <PopHeroSection name={state} />
      
      {/* <Playback/> */}
      <div className="playBackPlaceholder"></div>
    </div>
      
    </div>
  );
}
