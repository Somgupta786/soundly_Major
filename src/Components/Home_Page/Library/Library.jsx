
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
        
        <div className="navBarPlaceholder"></div>
        <LibraryHeroSection items={[menuItems1,menuItems2]} />
        
        <div className="playBackPlaceholder"></div>
      </div>
    </div>
  );
}
