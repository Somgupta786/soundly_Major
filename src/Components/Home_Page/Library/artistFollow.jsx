
import Playback from "../playBack";
import Navbar from "../Navbar";
import PlaybackHeroSection from "./PlaylistHeroSection";
import Sidebar from "../Sidebar";
import ArtistHeroSection from "./artistHeroSection";
// import Playback from "../playBack";
import { playBackContext } from "../../../App";
import { useContext } from "react";
export default function ArtistFollow() {
  const{setHome,isHome}=useContext(playBackContext)
  setHome(!isHome)
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
      activ:"false"
    },
    {
      title: "From Your Favourite Artist",
      onclick: "/favArt",
      activ:"true"
    },

  ];
  return (
    <div className="landingPage">
    <Sidebar items={[menuItems1]} />
  <div className="mainContent">
    
    <div className="navBarPlaceholder" ></div>
    <ArtistHeroSection items={[menuItems1]} />
   
    <div className="playBackPlaceholder" ></div>
  </div>
</div>
  );
}
