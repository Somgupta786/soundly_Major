import "./landing.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Sidebar from "./Sidebar";
import Playback from "./playBack";

export default function Landing() {
  return (
    <div className="landingPage">
    <Sidebar />
    <div className="mainContent">
      <Navbar />
      <div className="navBarPlaceholder"></div>
      <HeroSection />
      
      <Playback/>
      <div className="playBackPlaceholder"></div>
    </div>
      
    </div>
  );
}
