
import Playback from "../playBack";
import Navbar from "../Navbar";
import LibraryHeroSection from "./LibraryHeroSection";
import Sidebar from "../Sidebar";
import UploaderArtistSection from "./uploaderArtistSection";
// import Playback from "../playBack";
import { useLocation } from "react-router-dom";
export default function UploaderArtist() {
    const{state}=useLocation()
   const menuItems1 = [
    {
      title: "MENU",
      onclick: "",
      activ:"false"
    },
    {
      title: "Liked Songs",
      onclick: "/liked",
      activ:"true"
    },
    {
      title: "Playlist",
      onclick: "/playlist",
      activ:"false"
    },
    {
      title: "ARTISTS YOU FOLLOW",
      onclick: "/favArt",
      activ:"false"
    },
  
  ];
  const menuItems2 = [
    {
      title: " Suggested",
      onclick: "",
      activ: "false"
    },
    {
      title: "Listen to more artists",
      onclick: "/moreArtist",
      activ:"true"
    },
  ];


  return (
    <div className="landingPage">
        <Sidebar items={[menuItems1,menuItems2]} />
      <div className="mainContent">
        
        <div className="navBarPlaceholder"></div>
        <UploaderArtistSection song={state} items={[menuItems1,menuItems2]} />
        
        <div className="playBackPlaceholder"></div>
      </div>
    </div>
  );
}
