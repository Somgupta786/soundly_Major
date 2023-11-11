
import Playback from "../playBack";
import Navbar from "../Navbar";
import AddSongs from "./addSongs";
import Sidebar from "../Sidebar";
// import Playback from "../playBack";

export default function PlaylistAddSongs() {
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
  return (
    <div className="landingPage">
        <Sidebar items={[menuItems1]} />
      <div className="mainContent">
        
        <div className="navBarPlaceholder" ></div>
        <AddSongs />
       
        <div className="playBackPlaceholder" ></div>
      </div>
    </div>
  );
}
