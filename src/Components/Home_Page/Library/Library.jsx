
import Playback from "../playBack";
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import Sidebar from "../Sidebar";
// import Playback from "../playBack";

export default function Library() {
  return (
    <div className="landingPage">
      <Sidebar
        items={[
          {
            heading: "Menu"
          },
          {
            title: "Liked Songs",
            onclick: "/liked"
          },
          {
            title: "PlayList",
            onclick: "/playlist"
          },
          {
            title: "From Favorite Artist",
            onclick: "/favArt"
          }
        ]}
      />
      <div className="mainContent">
        <Navbar />
        <div className="navBarPlaceholder"></div>
        <HeroSection />
        <Playback />
        <div className="playBackPlaceholder"></div>
      </div>
    </div>
  );
}
