
import Playback from "../playBack";
import Navbar from "../Navbar";
import PlaybackHeroSection from "./PlaylistHeroSection";
import Sidebar from "../Sidebar";
import ArtistHeroSection from "./artistHeroSection";
// import Playback from "../playBack";

export default function ArtistFollow() {
   const menuItems1 = [
    {
      title: "MENU",
      onclick: "/menu"
    },
    {
      title: "Liked Songs",
      onclick: "/liked"
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
        <Navbar />
        <div className="navBarPlaceholder"></div>
        <ArtistHeroSection />
        <Playback />
        <div className="playBackPlaceholder"></div>
      </div>
    </div>
  );
}
