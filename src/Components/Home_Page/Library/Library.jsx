
import Playback from "../playBack";
import Navbar from "../Navbar";
import LibraryHeroSection from "./LibraryHeroSection";
import Sidebar from "../Sidebar";
// import Playback from "../playBack";

export default function Library() {
   const menuItems1 = [
    {
      title: "MENU",
      onclick: "/menu",
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
        
        <div className="navBarPlaceholder"></div>
        <LibraryHeroSection />
        
        <div className="playBackPlaceholder"></div>
      </div>
    </div>
  );
}
