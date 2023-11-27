
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
      onclick: "",
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
  const menuItems2 = [
    {
      title: " Suggested",
      onclick: "",
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
    <ArtistHeroSection items={[menuItems1,menuItems2]} />
   
    <div className="playBackPlaceholder" ></div>
  </div>
</div>
  );
}
