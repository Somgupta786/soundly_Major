import "../landing.css";
import "../query.css"

import GameSection from "./gameHeroSection";
import Sidebar from "../Sidebar";

import { useContext } from 'react';
import { playBackContext } from '../../../App';

export default function Game() {
  const{setPlayBackData,setNavData,setHome}=useContext(playBackContext);
  setHome(true);
    const menuItems1 = [
        {
          title: "MENU",
          onclick: "/menu",
          activ:"false"
        },
        {
          title: "Remember this song?",
          onclick: "",
          activ:"true"
        },
      
      ];
    
   

  return (
    <div className="landingPage">
     <Sidebar items={[menuItems1, ]} />
    <div className="mainContent">
      
      <div className="navBarPlaceholder"></div>
      <GameSection />
      
      {/* <Playback/> */}
      <div className="playBackPlaceholder"></div>
    </div>
      
    </div>
  );
}
