
import Playback from "../playBack";
import Navbar from "../Navbar";
import LibraryHeroSection from "./LibraryHeroSection";
import Sidebar from "../Sidebar";
// import Playback from "../playBack";

export default function Library() {
   const menuItems1 = [
    {
      title: "MENU",
      onclick: "/menu"
    },
    {
      title: "Playlist",
      onclick: "/playlist"
    },
    {
      title: "From Your Favourite Artist",
      onclick: "/favArt"
    },
    // ... other menu items
  ];

  const menuItems2 = [
    {
      title: "GENRE",
      onclick: "/menu"
    },
    {
      title: "Liked Songs",
      onclick: "/liked"
    },
    
  ];
  return (
    <div className="landingPage">
        <Sidebar items={[menuItems1, menuItems2]} />
      <div className="mainContent">
        
        <div className="navBarPlaceholder"></div>
        <LibraryHeroSection />
        
        <div className="playBackPlaceholder"></div>
      </div>
    </div>
  );
}
