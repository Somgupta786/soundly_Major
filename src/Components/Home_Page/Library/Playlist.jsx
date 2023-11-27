
import Playback from "../playBack";
import Navbar from "../Navbar";
import PlaylistHeroSection from "./PlaylistHeroSection";
import Sidebar from "../Sidebar";
// import Playback from "../playBack";

export default function Playlist() {
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
        <PlaylistHeroSection items={[menuItems1,menuItems2]} />
       
        <div className="playBackPlaceholder" ></div>
      </div>
    </div>
  );
}
