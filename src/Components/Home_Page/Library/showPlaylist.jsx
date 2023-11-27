
import Playback from "../playBack";
import Navbar from "../Navbar";
import ShowPlaylistHeroSection from "./showPlaylistHeroSection";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";
// import Playback from "../playBack";

export default function ShowPlaylist() {
    const {state}=useLocation();
  const menuItems1 = [
    {
      title: "MENU",
      onclick: "/menu",
      activ:"false"
    
    },
    {
      title: "Liked Songs",
      onclick: "/liked",
      activ:"false"
    },
    {
      title: "Playlist",
      onclick: "/playlist",
      activ:"true"
    },
    {
      title: "From Your Favourite Artist",
      onclick: "/favArt",
      activ:"false"
    },
    // ... other menu items
  ];
  const menuItems2 = [
    {
      title: " Suggested",
      onclick: "/#",
      activ: "false"
    },
    {
      title: "Listen to more artists",
      onclick: "/moreArtist",
      activ:"false"
    },
  ];
  return (
    <div className="landingPage">
        <Sidebar items={[menuItems1,menuItems2]} />
      <div className="mainContent">
        
        <div className="navBarPlaceholder" ></div>
        <ShowPlaylistHeroSection state={state}/>
       
        <div className="playBackPlaceholder" ></div>
      </div>
    </div>
  );
}
